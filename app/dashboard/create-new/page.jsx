"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoContext } from "@/app/_context/VideoContext";
import { db } from "@/configs/db";
import { useUser } from "@clerk/nextjs";
import { VideoData } from "@/configs/schema";
import PlayerDialog from "../_components/PlayerDialog";
// import Image from "next/image";

const CreateNew = () => {
  const [formData, setFormData] = useState([]);
  const { videoData, setVideoData } = useContext(VideoContext);
  const [loading, setLoading] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState(5);
  const { user } = useUser();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  // get the text
  const generateAudioFile = async (data) => {
    console.log(data);
    let script = "";
    const id = uuidv4();
    data.forEach((video) => {
      script += `${video.contentText} `;
    });
    await axios
      .post("/api/generate-audio", {
        text: script,
        id: id,
      })
      .then((res) => {
        setVideoData((prev) => ({
          ...prev,
          audioUrl: res?.data?.downloadUrl,
        }));
        res?.data?.downloadUrl && generateCaption(res.data.downloadUrl, data);
      });
  };

  // get the prompt
  const getPrompt = async () => {
    setLoading(true);
    const prompt = `Write a script to generate ${formData.duration} seconds video on topic : ${formData.topic} along with AI Image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and content text as held`;
    await axios
      .post("/api/get-video-script", {
        prompt,
      })
      .then((res) => {
        setVideoData((prev) => ({
          ...prev,
          videoScript: res?.data?.result.slice(0, 3),
        }));
        generateAudioFile(res?.data?.result.slice(0, 3));
      });
  };

  // NOTE: Generate Img
  const generateImg = async (videoScript) => {
    console.log(videoScript);
    let imgs = [];
    for (const element of videoScript) {
      try {
        const resp = await axios.post("/api/generate-img", {
          prompt: element?.imagePrompt,
        });
        console.log(resp.data.imgUrl);
        imgs.push(resp?.data?.imgUrl);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    setVideoData((prev) => ({ ...prev, imgList: imgs }));
    setLoading(false);
  };

  //NOTE: generate captions
  const generateCaption = async (fileUrl, videoScriptData) => {
    await axios
      .post("/api/generate-caption", {
        audioUrl: fileUrl,
      })
      .then((res) => {
        setVideoData((prev) => ({ ...prev, captions: res?.data?.subtitles }));
        res.data.subtitles && generateImg(videoScriptData);
      });
  };

  // NOTE: to check if there are all fields present in data
  useEffect(() => {
    console.log(videoData);
    if (Object.keys(videoData).length == 4) {
      saveVideoData(videoData);
    }
  }, [videoData]);

  const saveVideoData = async (videoData) => {
    setLoading(true);
    const result = await db
      .insert(VideoData)
      .values({
        script: videoData?.videoScript,
        audioUrl: videoData?.audioUrl,
        captions: videoData?.captions,
        imageList: videoData?.imgList,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ id: VideoData?.id });
    setLoading(false);
  };

  return (
    <div className="lg:px-10">
      <h2 className="font-bold text-4xl text-center text-primary ">
        Create New
      </h2>
      <div className="mt-10 w-full shadow-md p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* Create Button */}
        <Button onClick={getPrompt} className="mt-10 w-full py-6">
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
      <PlayerDialog playVideo={playVideo} videoId={videoId} />
    </div>
  );
};

export default CreateNew;

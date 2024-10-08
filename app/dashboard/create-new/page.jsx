"use client";
import React, { useContext, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { Thasadith } from "next/font/google";
import { VideoContext } from "@/app/_context/VideoContext";
// import Image from "next/image";

const CreateNew = () => {
  const [formData, setFormData] = useState([]);
  const [videoScript, setVideoScript] = useState(null);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [captions, setCaptions] = useState([]);
  const [images, setImages] = useState([]);

  const { videoData, setVideoData } = useContext(VideoContext);
  console.log(videoData);
  // console.log(images);

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  // get the text
  const generateAudioFile = async (data) => {
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
          audioUrl: res.data.downloadUrl,
        }));
        res.data.downloadUrl && generateCaption(res.data.downloadUrl, data);
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
        setVideoData((prev) => ({ ...prev, videoScript: res.data.result }));
        generateAudioFile(res.data.result);
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
        imgs.push(resp.data.imgUrl);
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
    </div>
  );
};

export default CreateNew;

"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";

const CreateNew = () => {
  const [formData, setFormData] = useState([]);
  const [videoScript, setVideoScript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  // get the text
  const generateAudioFile = async (data) => {
    let script = "";
    const id = uuidv4();
    // const result = await axios.post("/api/generate-audio", {
    //   text: "Hello world from deepgra, this is abhishek choudhary with nothing to say much, but still lets see how this all will work out in the end",
    //   id: 1,
    // });
    // console.log(result);
    data.forEach((video) => {
      script += `${video.contentText} `;
    });
    // console.log(script);
    await axios
      .post("/api/generate-audio", {
        text: script,
        id: id,
      })
      .then((res) => setAudioUrl(res.data.downloadUrl));
  };
  console.log(audioUrl);

  // get the prompt
  const getPrompt = async () => {
    setLoading(true);
    const prompt = `Write a script to generate ${formData.duration} seconds video on topic : ${formData.topic} along with AI Image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and content text as held`;
    const result = await axios
      .post("/api/get-video-script", {
        prompt,
      })
      .then((res) => {
        setVideoScript(res.data.result);
        generateAudioFile(res.data.result);
      });
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
    </div>
  );
};

export default CreateNew;

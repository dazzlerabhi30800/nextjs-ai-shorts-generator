import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const RemotionVideo = ({
  script,
  audioUrl,
  captions,
  imageList,
  setDurationFrame,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const getDurationFrame = () => {
    setDurationFrame((captions[captions.length - 1]?.end / 1000) * fps);
    return (captions[captions.length - 1]?.end / 1000) * fps;
  };
  const getCurrentCaptions = () => {
    const currentTime = (frame / 30) * 1000; // convert frame number to milliseconds becoz fps is 30
    const currentCaption = captions?.find(
      (word) => currentTime >= word?.start && currentTime <= word?.end
    );
    return currentCaption ? currentCaption.text : "";
  };
  return (
    <AbsoluteFill className="bg-red-200">
      {imageList?.map((img, index) => (
        <Sequence
          key={index}
          from={(index * getDurationFrame()) / imageList?.length}
          durationInFrames={getDurationFrame()}
        >
          <AbsoluteFill
            style={{
              justifyContent: "Center",
              alignItems: "Center",
            }}
          >
            <Img
              src={img}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <AbsoluteFill
              style={{
                color: "white",
                justifyContent: "center",
                alignItems: "center",
                top: undefined,
                bottom: 50,
                height: 150,
                textAlign: "center",
                width: "100%",
              }}
            >
              <h2 className="text-2xl bg-black/40 w-fit px-2 backdrop-blur-md">
                {getCurrentCaptions()}
              </h2>
            </AbsoluteFill>
          </AbsoluteFill>
        </Sequence>
      ))}
      {audioUrl !== undefined && <Audio src={audioUrl} />}
    </AbsoluteFill>
  );
};

export default RemotionVideo;

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
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
  // State

  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const getDurationFrame = () => {
    setTimeout(() => {
      setDurationFrame((captions[captions.length - 1]?.end / 1000) * fps);
    }, 100);
    return (captions[captions.length - 1]?.end / 1000) * fps;
  };
  const getCurrentCaptions = () => {
    const currentTime = (frame / 30) * 1000; // convert frame number to milliseconds becoz fps is 30
    const currentCaption = captions?.find(
      (word) => currentTime >= word?.start && currentTime <= word?.end
    );
    return currentCaption ? currentCaption.text : "";
  };
  if (!audioUrl) return;
  return (
    <AbsoluteFill className="bg-red-200">
      {imageList?.map((img, index) => {
        const startTime = (index * getDurationFrame()) / imageList?.length;
        const duration = getDurationFrame();
        const scale = interpolate(
          frame,
          [startTime, startTime + duration / 2, startTime + duration],
          [1, 1.8, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <Sequence key={index} from={startTime} durationInFrames={duration}>
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
                  transform: `scale(${scale})`,
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
        );
      })}
      {audioUrl !== undefined && <Audio src={audioUrl} />}
    </AbsoluteFill>
  );
};

export default RemotionVideo;

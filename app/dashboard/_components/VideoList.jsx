import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";

const VideoList = ({ videoList }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoId, setVideoId] = useState(false);
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {videoList?.map((video, index) => (
        <div
          key={index}
          className="cursor-pointer w-full h-auto flex hover:scale-105 transition-all"
          onClick={() => {
            setOpenDialog(Date.now());
            setVideoId(video?.id);
          }}
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={280}
            compositionHeight={350}
            frameToDisplay={30}
            durationInFrames={120}
            style={{
              borderRadius: "20px",
              width: "100%",
            }}
            className="border shadow-lg border-zinc-500"
            fps={30}
            inputProps={{
              ...video,
              setDurationFrame: (v) => v,
            }}
          />
        </div>
      ))}
      <PlayerDialog playVideo={openDialog} videoId={videoId} />
    </div>
  );
};

export default VideoList;

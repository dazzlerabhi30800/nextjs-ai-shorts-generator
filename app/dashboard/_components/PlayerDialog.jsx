import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";

const PlayerDialog = ({ playVideo, videoId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [durationFrame, setDurationFrame] = useState(100);

  useEffect(() => {
    setOpenDialog(playVideo);
    videoId && getVideoData();
  }, [playVideo]);

  // Get Video data
  const getVideoData = async () => {
    const data = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData?.id, videoId));
    console.log(data);
    setVideoData(data[0]);
  };

  return (
    <Dialog open={true}>
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your video is ready
          </DialogTitle>
          <Player
            component={RemotionVideo}
            durationInFrames={Number(durationFrame.toFixed(0))}
            compositionWidth={300}
            compositionHeight={450}
            fps={30}
            inputProps={{
              ...videoData,
              setDurationFrame,
            }}
            controls={true}
          />
          <div
            style={{ margin: "20px 0 0 0" }}
            className="flex justify-center gap-10"
          >
            <Button variant="ghost">Cancel</Button>
            <Button>Export</Button>
          </div>
          <DialogDescription className="hidden">Hello</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;

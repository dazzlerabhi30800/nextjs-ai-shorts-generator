import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PlayerDialog = ({ playVideo, videoId }) => {
  const [openDialog, setOpenDialog] = useState(true);
  const [videoData, setVideoData] = useState([]);
  const [durationFrame, setDurationFrame] = useState(100);
  const router = useRouter();

  useEffect(() => {
    setOpenDialog(!openDialog);
    videoId && getVideoData();
  }, [playVideo]);

  // Get Video data
  const getVideoData = async () => {
    const data = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData?.id, videoId));
    setVideoData(data[0]);
  };
  return (
    <Dialog open={openDialog}>
      <DialogContent className="flex flex-col items-center group-[.ring-offset-background]:hidden">
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
        </DialogHeader>
        <DialogDescription className="hidden">Hello</DialogDescription>
        <DialogFooter>
          <div
            style={{ margin: "20px 0 0 0" }}
            className="flex justify-center gap-10"
          >
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setOpenDialog(false);
                  router.replace("/dashboard");
                }}
                variant="ghost"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button>Export</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;

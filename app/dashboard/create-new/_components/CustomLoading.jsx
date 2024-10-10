import React, { useContext } from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { VideoContext } from "@/app/_context/VideoContext";

export function CustomLoading({ loading }) {
  const { videoData } = useContext(VideoContext);
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-transparent w-[90%] rounded-lg border-gray-400 text-center text-xl h-max shadow-none text-white">
        <AlertDialogTitle className="text-base sm:text-lg md:text-xl ">
          {videoData && Object.keys(videoData).length > 0
            ? `${videoData?.videoScript ? "Video Script is Generated" : ""} ${
                videoData?.audioUrl ? ", Audio is generated" : ""
              } ${videoData?.captions ? ", captions are generated" : ""} ${
                videoData?.captions
                  ? videoData?.imageList
                    ? ", Images are generated"
                    : ", Images are being generated..."
                  : ""
              }`
            : "Wait, It can take time upto a minute or so, Please Be Patient!!"}
        </AlertDialogTitle>
        <div className="bg-transparent h-36 sm:h-44 w-fit mx-auto">
          <DotLottieReact
            src="https://lottie.host/427c7f09-66fc-4ef6-af74-25971d91435d/VzboCyw2B7.json"
            loop
            autoplay
          />
        </div>
        <AlertDialogDescription className="hidden">
          This is very good
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;

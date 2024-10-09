import React from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";

export function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-transparent border-gray-400 text-center text-xl h-max shadow-none text-white">
        <AlertDialogTitle>
          Wait, It can take time upto a minute or so, Please Be Patient!!
        </AlertDialogTitle>
        <div className="bg-transparent h-44 w-fit mx-auto">
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

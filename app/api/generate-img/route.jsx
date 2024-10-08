import { storage } from "@/configs/firebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const height = 1280;
    const width = 1024;
    const seed = 540651; // Each seed generates a new image variation
    const model = "flux"; // Using 'flux' as default if model is not provided

    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(
      prompt
    )}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

    // // save the file to firebase;
    const convertedImg = await convertImg(imageUrl);
    const base64Img = "data:image/png;base64," + convertedImg;
    const fileName = "ai-short-video-files/" + Date.now() + ".png";
    const storageRef = ref(storage, fileName);

    // save to cloud firebase;
    await uploadString(storageRef, base64Img, "data_url");

    // get the download url
    const downloadUrl = await getDownloadURL(storageRef);
    // console.log(downloadUrl);

    // return NextResponse.json({ imgUrl: imageUrl });
    return NextResponse.json({ imgUrl: downloadUrl });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}

const convertImg = async (imgUrl) => {
  try {
    const response = await axios.get(imgUrl, { responseType: "arraybuffer" });
    const base64Img = Buffer.from(response.data).toString("base64");
    return base64Img;
  } catch (e) {
    console.log("error: ", e);
  }
};

import { createClient } from "@deepgram/sdk";
import { NextResponse } from "next/server";
// import { pipeline } from "stream/promises";
import fs from "fs";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";

const key = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
const deepgram = createClient(key);
const text2 = "hello world";
const outputFile = "audio.mp3";

export async function POST(req) {
  const { text, id } = await req.json();

  const response = await deepgram.speak.request(
    { text },
    // {
    //   model: "aura-helios-en",
    //   encoding: "linear16",
    //   container: "wav",
    // }
    {
      //   model: "aura-asteria-en",
      model: "aura-arcas-en",
    }
  );
  const storageRef = ref(storage, "ai-short-video-files/" + id + ".mp3");
  const stream = await response.getStream();
  if (stream) {
    const file = fs.createWriteStream(outputFile);
    try {
      const audioBuffer = await getAudioBuffer(stream);
      await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });
      const downloadUrl = await getDownloadURL(storageRef);
      // await pipeline(stream, file);
      // console.log(`Audio file written to ${outputFile}`);
      return NextResponse.json({ downloadUrl: downloadUrl });
      // return NextResponse.json({ success: "it's done" });
    } catch (e) {
      console.error("Error writing audio to file:", e);
      return NextResponse.json({ error: e });
    }
  } else {
    console.error("Error generating audio:", stream);
    return NextResponse.json({ error: "Error generating audio stream" });
  }
  //   const headers = await response.getHeaders();
  //   return NextResponse.json({ result: stream });
  //   return NextResponse.json({ result: result });
}

const getAudioBuffer = async (response) => {
  const reader = response.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    chunks.push(value);
  }

  const dataArray = chunks.reduce(
    (acc, chunk) => Uint8Array.from([...acc, ...chunk]),
    new Uint8Array(0)
  );

  return Buffer.from(dataArray.buffer);
};

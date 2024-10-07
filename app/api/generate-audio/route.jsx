import { createClient } from "@deepgram/sdk";
import { NextResponse } from "next/server";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";

const key = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
const deepgram = createClient(key);

export async function POST(req) {
  const { text, id } = await req.json();

  const response = await deepgram.speak.request(
    { text },
    {
      model: "aura-arcas-en",
    }
  );
  const storageRef = ref(storage, "ai-short-video-files/" + id + ".mp3");
  const stream = await response.getStream();
  if (stream) {
    try {
      const audioBuffer = await getAudioBuffer(stream);
      await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });
      const downloadUrl = await getDownloadURL(storageRef);
      return NextResponse.json({ downloadUrl: downloadUrl });
    } catch (e) {
      console.error("Error writing audio to file:", e);
      return NextResponse.json({ error: e });
    }
  } else {
    console.error("Error generating audio:", stream);
    return NextResponse.json({ error: "Error generating audio stream" });
  }
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

import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_AI_KEY,
});

export async function POST(req) {
  try {
    const { audioUrl } = await req.json();
    const FILE_URL = audioUrl;
    const data = {
      audio: FILE_URL,
    };
    const transcript = await client.transcripts.transcribe(data);
    // console.log(transcript.text);
    return NextResponse.json({ subtitles: transcript.text });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

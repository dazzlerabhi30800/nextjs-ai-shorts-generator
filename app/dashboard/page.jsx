"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import VideoList from "./_components/VideoList";
import { Thasadith } from "next/font/google";

const Dashboard = () => {
  const { user } = useUser();
  const [videoList, setVideoList] = useState([]);
  const getVideoList = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress));
    setVideoList(result);
  };
  useEffect(() => {
    getVideoList();
  }, [user]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-primary text-xl md:text-2xl">
          Dashboard
        </h2>
        <Link href={"/dashboard/create-new"}>
          <Button className="text-sm p-2 sm:text-base">+ Create New</Button>
        </Link>
      </div>
      {/* Empty List */}
      {videoList.length === 0 && <EmptyState />}
      {/* Video List */}
      <VideoList videoList={videoList} />
    </div>
  );
};

export default Dashboard;

"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import SideNavbar from "./_components/SideNavbar";
import { VideoContext } from "../_context/VideoContext";
import { UserDetailContext } from "../_context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";

const DashboardLayout = ({ children }) => {
  const [videoData, setVideoData] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && getUserDetail();
  }, [user]);
  const getUserDetail = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
    setUserDetail(result[0]);
  };
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <VideoContext.Provider value={{ videoData, setVideoData }}>
        <div className="h-full">
          <div className="hidden flex md:block min-h-screen h-full bg-white fixed pt-[72px]">
            <SideNavbar />
          </div>
          <div>
            <Header />
            <div className="md:ml-64 p-5 sm:p-8 md:p-10">{children}</div>
          </div>
        </div>
      </VideoContext.Provider>
    </UserDetailContext.Provider>
  );
};

export default DashboardLayout;

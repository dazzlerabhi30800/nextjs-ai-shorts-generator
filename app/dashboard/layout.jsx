"use client";
import React, { useState } from "react";
import Header from "./_components/Header";
import SideNavbar from "./_components/SideNavbar";
import { VideoContext } from "../_context/VideoContext";

const DashboardLayout = ({ children }) => {
  const [videoData, setVideoData] = useState([]);
  return (
    <VideoContext.Provider value={{ videoData, setVideoData }}>
      <div>
        <div className="hidden md:block h-screen bg-white fixed mt-[65px]">
          <SideNavbar />
        </div>
        <div>
          <Header />
          <div className="md:ml-64 p-10">{children}</div>
        </div>
      </div>
    </VideoContext.Provider>
  );
};

export default DashboardLayout;

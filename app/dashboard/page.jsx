"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";

const Dashboard = () => {
  const [videoList, setVideoList] = useState([]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-primary text-2xl">Dashboard</h2>
        <Link href={"/dashboard/create-new"}>
          <Button>+ Create New</Button>
        </Link>
      </div>
      {/* Empty List */}
      {videoList.length === 0 && <EmptyState />}
    </div>
  );
};

export default Dashboard;

"use client";
import React from "react";
import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNavbar = () => {
  const path = usePathname();
  const sideOptions = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: PanelsTopLeft,
    },
    {
      id: 2,
      name: "Creat New",
      path: "/dashboard/create-new",
      icon: FileVideo,
    },
    // {
    //   id: 3,
    //   name: "Upgrade",
    //   path: "/upgrade",
    //   icon: ShieldPlus,
    // },
    // {
    //   id: 4,
    //   name: "Account",
    //   path: "/account",
    //   icon: CircleUser,
    // },
  ];
  return (
    <nav className="w-64 shadow-md h-full p-5">
      <div className="flex flex-col gap-5">
        {sideOptions.map((option) => (
          <Link key={option.id} href={option.path}>
            <div
              className={`flex items-center p-3 gap-3 hover:bg-primary hover:text-white rounded-md transition-all ${
                path === option.path && "bg-primary text-white"
              }`}
            >
              <option.icon />
              <h2>{option.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default SideNavbar;

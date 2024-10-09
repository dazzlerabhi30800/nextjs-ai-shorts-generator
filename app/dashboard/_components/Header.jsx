import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="py-3 px-5 flex justify-between shadow-md">
      <div className="flex gap-3 items-center">
        <Image
          src="/logo.svg"
          alt="Dazzly"
          width={80}
          height={80}
          className="object-cover"
        />
        <h2 className="font-bold hidden sm:block">Ai Short Video</h2>
      </div>
      <div className="flex gap-3 items-center">
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;

import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React, { useContext } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Header = () => {
  const { userDetail } = useContext(UserDetailContext);
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
        <div className="flex mr-5 items-center justify-center">
          <div className="h-12 w-12">
            <DotLottieReact
              src="https://lottie.host/a6cff22f-61b9-4872-b8ef-e824a2dc02c1/0zVqWjVugV.json"
              loop
              autoplay
            />
          </div>
          <h2 className="text-yellow-400 font-bold text-2xl">
            {userDetail?.credits}
          </h2>
        </div>
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;

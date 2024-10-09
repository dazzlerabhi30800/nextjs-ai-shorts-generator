import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React, { useContext } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

const Header = () => {
  const { userDetail } = useContext(UserDetailContext);
  return (
    <header className="py-3 px-5 flex justify-between shadow-md">
      <div className="flex relative z-30 gap-3 items-center">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            alt="Dazzly"
            width={80}
            height={80}
            className="w-inherit h-inherit object-cover"
          />
        </Link>
        <h2 className="font-bold hidden sm:block">Ai Short Video</h2>
      </div>
      <div className="flex gap-2 md:gap-3 items-center">
        <div className="flex mr-2 md:mr-5 items-center justify-center">
          <div className="h-10 w-10 sm:h-12 sm:w-12">
            <DotLottieReact
              src="https://lottie.host/a6cff22f-61b9-4872-b8ef-e824a2dc02c1/0zVqWjVugV.json"
              loop
              autoplay
            />
          </div>
          <h2 className="text-yellow-400 font-bold text-xl sm:text-2xl">
            {userDetail?.credits}
          </h2>
        </div>
        <Link href={"/dashboard"}>
          <Button>Dashboard</Button>
        </Link>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;

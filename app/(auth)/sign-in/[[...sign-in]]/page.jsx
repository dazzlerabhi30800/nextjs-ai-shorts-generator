import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block h-screen">
        <Image
          className="w-full h-full object-cover"
          src="/login.jpg"
          alt="Clerk Logo"
          width={200}
          height={200}
          priority={true}
          quality={100}
        />
      </div>
      <div className="flex items-center justify-center h-screen">
        <SignIn forceRedirectUrl="/dashboard" />
      </div>
    </div>
  );
}

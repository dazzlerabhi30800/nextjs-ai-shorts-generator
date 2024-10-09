import { Button } from "@/components/ui/button";
import Styles from "@/styles/Styles";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";


export default function Home() {
  const { style } = Styles();
  return (
    <div
      className={`${style.flexColCenter} gap-10 text-primary text-3xl font-bold min-h-screen`}
    >
      Hello, Go to Dashboard to Generate Shorts
      <Link href={"/dashboard"} className="bg-primary text-white py-3 px-10 rounded-md shadow-md font-bold text-xl">Click Me to take you to dashboard!</Link>
      <UserButton />
    </div>
  );
}

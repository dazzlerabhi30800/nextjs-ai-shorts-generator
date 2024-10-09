import { Button } from "@/components/ui/button";
import Styles from "@/styles/Styles";
import Link from "next/link";


export default function Home() {
  const { style } = Styles();
  return (
    <div
      className={`${style.flexColCenter} text-center gap-10 text-zinc-700 text-3xl font-bold min-h-screen`}
    >
      Hello, Go to Dashboard to Generate Shorts
      <Link href={"/dashboard"}>
        <Button>
          Click Me to take you to dashboard!
        </Button>
      </Link>
    </div>
  );
}

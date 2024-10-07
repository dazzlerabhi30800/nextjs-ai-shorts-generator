import { Button } from "@/components/ui/button";
import Styles from "@/styles/Styles";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  const { style } = Styles();
  return (
    <div
      className={`${style.flexColCenter} gap-10 text-rose-700 text-3xl font-bold min-h-screen`}
    >
      Hello World
      <Button variant="destructive">Click Me!</Button>
      <UserButton />
    </div>
  );
}

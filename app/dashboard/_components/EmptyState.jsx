import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const EmptyState = () => {
  return (
    <div className="py-24 px-5 flex flex-col text-center gap-6 items-center border-2 border-dashed mt-10">
      <h2 className="font-bold text-3xl">
        You don't have any short videos yet!
      </h2>
      <Link href={"/dashboard/create-new"}>
        <Button>Create New Short</Button>
      </Link>
    </div>
  );
};

export default EmptyState;

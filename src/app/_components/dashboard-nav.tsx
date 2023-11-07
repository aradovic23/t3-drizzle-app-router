"use client";

import { UserButton } from "@clerk/nextjs";
import { useSelectedLayoutSegment } from "next/navigation";

function getPageName(layoutSegment: string): string {
  return layoutSegment.split("-").join(" ");
}

export default function DashboardNav() {
  const layoutSegment = useSelectedLayoutSegment() ?? "Home";

  const name = getPageName(layoutSegment);

  return (
    <header className="flex items-center justify-between border-b bg-white bg-opacity-50 px-10 py-4 dark:bg-gray-800">
      <h2 className="text-lg font-semibold capitalize text-zinc-800 dark:text-white">
        {name}
      </h2>
      <div className="flex items-center space-x-2">
        <UserButton />
      </div>
    </header>
  );
}

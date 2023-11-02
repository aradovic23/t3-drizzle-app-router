import { Ghost } from "lucide-react";
import { buttonVariants } from "./_components/ui/button";
import Link from "next/link";

export default function notFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <Ghost size={32} className="text-blue-600" />
        <p className="text-6xl font-bold">404 not found</p>
        <p className="text-slate-700">uuuups. this one is on us!</p>
        <Link
          href="/"
          className={buttonVariants({
            variant: "link",
            className: "text-blue-600",
          })}
        >
          take me home
        </Link>
      </div>
    </div>
  );
}

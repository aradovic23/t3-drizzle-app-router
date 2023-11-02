import Link from "next/link";
import { buttonVariants } from "./_components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-4xl font-bold">
          Multi Tenant <span className="text-blue-600">App</span>
        </h1>
        <p className="lowercase text-slate-400">
          test with Next 13, drizzle, clerk
        </p>
      </div>
      <Link href="/tenants" className={buttonVariants({ variant: "link" })}>
        All stores
      </Link>
    </main>
  );
}

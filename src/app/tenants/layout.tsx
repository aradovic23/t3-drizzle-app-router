import Link from "next/link";
import { cn } from "~/lib/utils";

export default function TenantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <nav className="bg-slate-50 shadow-sm">
        <div
          className={cn({
            "bg-slate-50 text-black": true, // colors
            "flex items-center": true, // layout
            "container sticky top-0 z-10 mx-auto mb-2 h-12 w-screen px-4 md:w-full":
              true, //positioning & styling
          })}
        >
          <Link href="/">
            <p className="font-bold">
              multi tenant <span className="text-blue-600">app</span>.
            </p>
          </Link>
        </div>
      </nav>
      <section className="container mx-auto max-w-5xl px-3">{children}</section>
    </main>
  );
}

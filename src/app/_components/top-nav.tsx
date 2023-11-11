import { buttonVariants } from "@/components/ui/button";
import { UserButton, currentUser } from "@clerk/nextjs";
import { Home, LockKeyhole, LogIn } from "lucide-react";
import Link from "next/link";

export default async function TopNav() {
  const user = await currentUser();

  return (
    <header className="flex h-16 items-center justify-between px-4 md:px-6">
      <Link href="/">
        <Home />
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link
          className="text-xs text-zinc-500 dark:text-zinc-400 md:text-sm"
          href="/tenants"
        >
          Tenants
        </Link>
        <Link
          className="text-xs text-zinc-500 dark:text-zinc-400 md:text-sm"
          href="#"
        >
          Services
        </Link>
        <Link
          className="text-xs text-zinc-500 dark:text-zinc-400 md:text-sm"
          href="#"
        >
          Contact
        </Link>
      </nav>
      {user ? (
        <div className="flex items-center gap-4">
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href="/dashboard"
          >
            Admin Dashboard
            <LockKeyhole className="ml-2 h-4 w-4" />
          </Link>
          <UserButton afterSignOutUrl="/tenants" />
        </div>
      ) : (
        <Link className={buttonVariants({ variant: "ghost" })} href="/sign-in">
          Log in <LogIn className="ml-2 h-4 w-4" />
        </Link>
      )}
    </header>
  );
}

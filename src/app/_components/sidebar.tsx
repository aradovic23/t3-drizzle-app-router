"use client";
import { useUser } from "@clerk/nextjs";
import { Group, Home, IceCream, PieChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { buttonVariants } from "./ui/button";
import { api } from "~/trpc/react";
import { Badge } from "./ui/badge";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export default function Sidebar() {
  const menuItems: NavItem[] = [
    {
      label: "Home",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: "My Tenants",
      href: "/dashboard/my-tenants",
      icon: <Group className="h-5 w-5" />,
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: <PieChart className="h-5 w-5" />,
    },
  ];

  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  const { user } = useUser();

  const { data: dbUser } = api.auth.dbUser.useQuery();

  return (
    <div className="flex w-64 flex-col bg-white  px-4 py-8 shadow-md dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-zinc-800 p-1.5">
          <IceCream className="text-white" />
        </div>
        <h1 className="text-lg font-medium">Ice Cream & Co.</h1>
      </div>
      <nav className="mt-6 flex-grow">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full hover:bg-slate-200 hover:text-zinc-900",
                  {
                    "bg-slate-200 text-zinc-900": isActive(item.href),
                  },
                )}
                href={item.href}
              >
                <div className="flex w-full items-center justify-between">
                  <span>{item.label}</span>
                  {item.icon}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col items-center justify-end gap-2 rounded-md bg-gray-100 p-4 shadow-sm dark:bg-gray-900">
        <Avatar className="h-16 w-16">
          <AvatarImage alt="User name" src={user?.imageUrl} />
          <AvatarFallback>{user?.firstName?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-sm font-medium">{user?.fullName}</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
        <Badge>{dbUser?.role}</Badge>
      </div>
    </div>
  );
}

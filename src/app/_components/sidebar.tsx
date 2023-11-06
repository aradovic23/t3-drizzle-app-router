"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Group, PieChart, IceCream } from "lucide-react";
import { cn } from "~/lib/utils";
import { auth, currentUser, useAuth, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { buttonVariants } from "./ui/button";

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

  return (
    <div className="flex w-64 flex-col bg-white  px-4 py-8 shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white">
          Dashboard
        </h2>
        <div className="rounded-full bg-zinc-800 p-1.5">
          <IceCream className="text-white" />
        </div>
      </div>
      <nav className="mt-6 flex-grow">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full hover:bg-blue-100 hover:text-blue-600",
                  {
                    "bg-blue-100 text-blue-600": isActive(item.href),
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
      <div className="mt-4 rounded-md bg-gray-100 px-2 py-2 dark:bg-gray-700">
        <div className="mt-1 flex items-center space-x-1">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>{user?.fullName?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              {user?.fullName}
            </p>
            <p className="w-sm truncate text-xs text-gray-500 dark:text-gray-300">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

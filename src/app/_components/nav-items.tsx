// components/defaultNavItems.tsx
import { Home, Group, Folder, Calendar } from "lucide-react";

// define a NavItem prop
export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
export const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <Home />,
  },
  {
    label: "Team",
    href: "/team",
    icon: <Group />,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: <Folder />,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: <Calendar />,
  },
];

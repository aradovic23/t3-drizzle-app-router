// components/Navbar.tsx
import { Menu } from "lucide-react";
import { cn } from "~/lib/utils";
type Props = {
  /**
   * Allows the parent component to modify the state when the
   * menu button is clicked.
   */
  onMenuButtonClick(): void;
};
const Navbar = ({ onMenuButtonClick }: Props) => {
  return (
    <nav
      className={cn({
        "bg-white text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "sticky top-0 z-10 h-[73px] w-screen px-4 shadow-sm md:w-full ": true, //positioning & styling
      })}
    >
      <div className="text-lg font-bold">Admin Panel</div>
      <div className="flex-grow"></div>
      <button className="md:hidden" onClick={onMenuButtonClick}>
        <Menu />
      </button>
    </nav>
  );
};
export default Navbar;

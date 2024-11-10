import {
  BriefcaseIcon,
  DashboardIcon,
  HandCoins,
  LotusIcon,
  MoneyIcon,
  ProfileIcon,
  StorefrontIcon,
} from "@/icons";
import { cn } from "rizzui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useState } from "react";

const navItems = [
  {
    icon: DashboardIcon,
    label: "Dashboard",
    path: "/dashboard/farmer",
  },
  {
    icon: LotusIcon,
    label: "Farms",
    path: "/dashboard/farmer/farms",
  },
  {
    icon: BriefcaseIcon,
    label: "Vendors",
    path: "/dashboard/farmer/vendors",
  },
  {
    icon: MoneyIcon,
    label: "Funding",
    path: "/dashboard/farmer/funding",
  },
  {
    label: "Cooperative",
    icon: HandCoins,
    path: "/dashboard/farmer/cooperative",
  },
  {
    label: "Events",
    icon: StorefrontIcon,
    path: "/dashboard/farmer/events",
  },
  {
    label: "Profile",
    icon: ProfileIcon,
    path: "/dashboard/farmer/profile",
  },
];

interface NavItemProps {
  icon?: string; // icon is optional since some items don't have an icon
  label: string;
  // onClick: () => void;
  pathname: string;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  // onClick,
  pathname,
  path,
}) => {
  const baseClasses = "flex gap-1 items-end cursor-pointer"; // Added cursor-pointer for better UX

  const isActive = () => {
    if (path === "/dashboard/farmer") {
      return pathname === path; // Only match exactly for "/dashboard"
    }
    return pathname?.startsWith(path);
  };

  const activeClasses = isActive()
    ? "px-3 py-2.5 font-bold text-white bg-[#197A53] rounded-[60px]"
    : "my-auto text-black";

  const Icon: any = icon;

  return (
    <div className={cn(baseClasses, activeClasses)}>
      <Icon
        className={cn(
          "w-5 h-5",
          isActive() ? "fill-[#0BCE6B]" : "fill-[#343330]"
        )}
      />
      <div>{label}</div>
    </div>
  );
};

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState<string>("Dashboard");

  return (
    <nav className="flex flex-wrap gap-5 justify-between w-full text-sm leading-tight bg-white px-8 py-4">
      <div className="flex flex-wrap gap-10 max-md:max-w-full">
        <div className="flex gap-9 whitespace-nowrap">
          {navItems.slice().map((item, index) => (
            <Fragment key={index}>
              <Link
                href={item.path}
                passHref
                scroll={false}
                className="inline-flex"
              >
                <NavItem
                  key={index}
                  {...item}
                  pathname={pathname}
                  path={item.path}
                />
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

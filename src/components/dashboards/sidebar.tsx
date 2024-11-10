"use client";
import React from "react";
import { usePathname } from "next/navigation";
import useScreenSize from "@/hooks/use-screen-size";
import { cn } from "rizzui";
import Link from "next/link";
import { Badge } from "rizzui";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";
import {
  BriefcaseIcon,
  ChartIcon,
  DashboardIcon,
  GridIcon,
  HandCoins,
  LotusIcon,
  ProfileIcon,
  SealIcon,
  StorefrontIcon,
  TreeIcon,
  UsersListIcon,
} from "@/icons";

interface MenuItem {
  icon: string;
  label: string;
  href: string;
  addons?: string;
}

const basePath = "/dashboard/cooperative";
const adminBasePath = "/admin";

// Admin Menu
const adminMenuItems: MenuItem[] = [
  {
    icon: DashboardIcon,
    label: "Dashboard",
    href: `${adminBasePath}/dashboard`,
  },
  { icon: LotusIcon, label: "Farmers", href: `${adminBasePath}/farmers` },
  {
    icon: HandCoins,
    label: "Cooperatives",
    href: `${adminBasePath}/cooperatives`,
  },
  {
    icon: TreeIcon,
    label: "Requests",
    href: `${adminBasePath}/requests`,
  },
  {
    icon: ChartIcon,
    label: "Insights",
    href: `${adminBasePath}/insight`,
  },
  {
    icon: GridIcon,
    label: "Tools",
    href: `${adminBasePath}/tools`,
  },
  {
    icon: SealIcon,
    label: "Certificates",
    href: `${adminBasePath}/certificates`,
  },
  {
    icon: ProfileIcon,
    label: "Profile",
    href: `${adminBasePath}/profile`,
  },
];

// Regular User Menu
const menuItems: MenuItem[] = [
  {
    icon: DashboardIcon,
    label: "Dashboard",
    href: basePath,
  },
  {
    icon: UsersListIcon,
    label: "Members",
    href: `${basePath}/members`,
  },
  // {
  //   icon: DashboardIcon,
  //   label: "Events",
  //   href: `${basePath}/events`,
  // },
  {
    icon: BriefcaseIcon,
    label: "Opportunities",
    href: `${basePath}/opportunities`,
  },
  {
    icon: DashboardIcon,
    label: "Funding",
    href: `${basePath}/funding`,
  },
  {
    icon: StorefrontIcon,
    label: "Vendors",
    href: `${basePath}/vendors`,
  },
  {
    icon: ProfileIcon,
    label: "Profile",
    href: `${basePath}/profile`,
  },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { width } = useScreenSize();

  // Determine if the current route is for admin or regular user
  const isAdminRoute = pathname.startsWith(adminBasePath);

  // Choose the correct menu items based on the current route
  const itemsToRender = isAdminRoute ? adminMenuItems : menuItems;

  if (width < 992) return null; // Hide sidebar on smaller screens

  return (
    <aside
      className={cn(
        "flex flex-col w-[254px] max-md:ml-0 max-md:w-full pr- min-h-screen border-r-[.4px] h-full fixed bg-white",
        isAdminRoute,
        "border-[#33354354]"
      )}
    >
      <nav className="flex overflow-hidden flex-col items-start px-6 pt-5 pb-64 mx-auto w-full leading-tight bg-white border-r-0 border-zinc-700 border-opacity-30 max-md:px-5 max-md:pb-24 max-md:mt-10">
        <div className="flex gap-2 text-sm font-bold whitespace-nowrap text-zinc-700 w-[81px]">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="object-contain shrink-0 aspect-[0.97] w-[39px]"
          />
          <div className="my-auto">KADA</div>
        </div>

        <h2 className="mt-10 mb-5 text-sm font- text-neutral-700 max-md:mt-10">
          MENU
        </h2>

        {itemsToRender.map((item, index) => {
          // const isActive = pathname === item.href;
          const isActive = pathname.startsWith(item.href);
          const Icon: any = item.icon;

          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-2 my-3 px-5 w-full rounded-full",
                isActive ? "text-white bg-[#197A53] py-2.5" : "text-zinc-700",
                "max-md:ml-2.5"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  isActive ? "fill-white" : "fill-[#343330]"
                )}
              />

              <div className="flex gap-3 items-center w-full">
                <div>{item.label}</div>
                {item.addons && (
                  <Badge variant="outline" color="success" className="-0">
                    {item.addons}
                  </Badge>
                )}
              </div>
            </Link>
          );
        })}

        <div className="mt-16">
          <Link
            href={"/portal"}
            className="flex items-center gap-2 my-3 px-5 w-full rounded-full"
          >
            <ArrowLeftEndOnRectangleIcon className="w-4 text-zinc-700" />

            <div>Logout</div>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

"use client";
import React from "react";
import { usePathname } from "next/navigation";
import useScreenSize from "@/hooks/use-screen-size";
import cn from "@/utils/class_names";
import Link from "next/link";
import { Badge } from "rizzui";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";

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
  { icon: "/images/home-icon.svg", label: "Dashboard", href: adminBasePath },
  { icon: "/images/home-icon.svg", label: "Farmers", href: `${adminBasePath}/members` },
  { icon: "/images/home-icon.svg", label: "Cooperative", href: `${adminBasePath}/cooperative` },
  { icon: "/images/home-icon.svg", label: "Requests", href: `${adminBasePath}/requests`, addons: '3' },
  { icon: "/images/home-icon.svg", label: "Insight", href: `${adminBasePath}/insight` },
];

// Regular User Menu
const menuItems: MenuItem[] = [
  { icon: "/images/home-icon.svg", label: "Dashboard", href: basePath },
  { icon: "/images/home-icon.svg", label: "Members", href: `${basePath}/members` },
  { icon: "/images/home-icon.svg", label: "Events", href: `${basePath}/events` },
  { icon: "/images/home-icon.svg", label: "Opportunities", href: `${basePath}/opportunities` },
  { icon: "/images/home-icon.svg", label: "Funding", href: `${basePath}/funding` },
  { icon: "/images/home-icon.svg", label: "Vendors", href: `${basePath}/vendors` },
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
    <aside className={cn("flex flex-col w-[19%] max-md:ml-0 max-md:w-full pr- min-h-screen border-r h-full fixed bg-white", isAdminRoute, "border-green-300")}>
      <nav className="flex overflow-hidden flex-col items-start px-6 pt-5 pb-64 mx-auto w-full leading-tight bg-white border-r-0 border-zinc-700 border-opacity-30 max-md:px-5 max-md:pb-24 max-md:mt-10">
        <div className="flex gap-2 self-center text-sm font-bold whitespace-nowrap text-zinc-700 w-[81px]">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="object-contain shrink-0 aspect-[0.97] w-[39px]"
          />
          <div className="my-auto">KADA</div>
        </div>
        <div className="flex gap-4 items-start self-stretch py-2.5 pr-8 px-2 mt-11 rounded-2xl bg-neutral-100 max-md:p- max-md:mt-10">
          <img
            src="/images/coop-dp.png"
            alt="User Avatar"
            className="object-contain shrink-0 rounded-full aspect-square w-[39px]"
          />
          <div className="flex flex-col mt-1.5">
            <div className="self-start text-sm font-semibold text-black">FACESIIWO</div>
            <div className="text-xs text-zinc-500">Cooperative Society</div>
          </div>
        </div>
        <h2 className="mt-16 mb-5 text-sm font- text-neutral-700 max-md:mt-10">MENU</h2>

        {itemsToRender.map((item, index) => {
          const isActive = pathname === item.href; // Check if the current path matches the item's href.

          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-2 my-3 ml- text- font- px-5 w-full",
                isActive ? "text-white bg-green-600 py-2.5" : "text-zinc-700",
                "max-md:ml-2.5",
                isAdminRoute ? "rounded-full" : "rounded-xl"
              )}
            >
              <img
                src={item.icon}
                alt={`${item.label}`}
                className="object-contain shrink-0 self-center aspect-square w-[18px] fill-re-800"
              />
              <div className="flex gap-3 items-center w-full">
                <div>{item.label}</div>
                {item.addons && (
                  <Badge variant="outline" color="success" className="-0">{item.addons}</Badge>
                )}
              </div>
            </Link>
          );
        })}

        <div className="flex gap-4 items-center self-stretch py-2.5 pr-8 px-2 mt-52  max-md:mt-10">
          <Link href={'/portal'} className="flex gap-2 items-center w-full hover:underline text-zinc-700">

            <ArrowLeftEndOnRectangleIcon className="w-4 text-zinc-700" />

            <div>Logout</div>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

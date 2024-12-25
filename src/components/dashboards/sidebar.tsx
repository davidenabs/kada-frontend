"use client";
import React, { startTransition } from "react";
import { usePathname } from "next/navigation";
import useScreenSize from "@/hooks/use-screen-size";
import { cn } from "rizzui";
import Link from "next/link";
import { Badge } from "rizzui";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";
import {
  BriefcaseIcon,
  ChartIcon,
  CloseIcon,
  DashboardIcon,
  GridIcon,
  HandCoins,
  LotusIcon,
  ProfileIcon,
  StorefrontIcon,
  TreeIcon,
  UsersListIcon,
} from "@/icons";
import { toast } from "sonner";
import { defaultUser, userAtom } from "@/stores/user";
import { useAtom, useSetAtom } from "jotai";
import { appAtom } from "@/stores/app";

interface MenuItem {
  icon: string;
  label: string;
  href: string;
  addons?: string;
  matchSubPath?: boolean;
}

const cooperativePath = "/dashboard/cooperative";
const vendorPath = "/dashboard/vendor";
const adminBasePath = "/admin";
const enumeratorPath = "/dashboard/enumerator";

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
    label: "Vendors",
    href: `${adminBasePath}/requests`,
  },
  {
    icon: ChartIcon,
    label: "Markets",
    href: `${adminBasePath}/markets`,
  },
  {
    icon: GridIcon,
    label: "Tools",
    href: `${adminBasePath}/tools`,
    matchSubPath: true,
  },
  {
    icon: BriefcaseIcon,
    label: "Opportunities",
    href: `${adminBasePath}/opportunities`,
  },
  {
    icon: ProfileIcon,
    label: "Profile",
    href: `${adminBasePath}/profile`,
  },
];

// Regular User Menu
const cooperativeItems: MenuItem[] = [
  {
    icon: DashboardIcon,
    label: "Dashboard",
    href: cooperativePath,
  },
  {
    icon: UsersListIcon,
    label: "Members",
    href: `${cooperativePath}/members`,
  },
  {
    icon: BriefcaseIcon,
    label: "Opportunities",
    href: `${cooperativePath}/opportunities`,
  },
  // {
  //   icon: DashboardIcon,
  //   label: "Funding",
  //   href: `${cooperativePath}/funding`,
  // },
  {
    icon: StorefrontIcon,
    label: "Vendors",
    href: `${cooperativePath}/vendors`,
  },
  {
    icon: ProfileIcon,
    label: "Profile",
    href: `${cooperativePath}/profile`,
  },
];

const vendorItems: MenuItem[] = [
  {
    icon: DashboardIcon,
    label: "Dashboard",
    href: vendorPath,
  },
  {
    icon: UsersListIcon,
    label: "Product/Service",
    href: `${vendorPath}/product-service`,
  },
  {
    icon: BriefcaseIcon,
    label: "Opportunities",
    href: `${vendorPath}/opportunities`,
  },
  {
    icon: ProfileIcon,
    label: "Profile",
    href: `${vendorPath}/profile`,
  },
];

const enumeratorItems: MenuItem[] = [
  {
    icon: DashboardIcon,
    label: "Dashboard",
    href: enumeratorPath,
  },
  {
    icon: ProfileIcon,
    label: "Profile",
    href: `${enumeratorPath}/profile`,
  },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { width } = useScreenSize();
  const setUser = useSetAtom(userAtom);
  const [app, setApp] = useAtom(appAtom);

  const isLargeScreen = React.useMemo(() => width > 992, [width]);

  const handleLogout = () => {
    toast.success("Logging out...");
    startTransition(() => {
      setUser(defaultUser);
    });
  };

  const handleSidebarClose = () => {
    setApp((prev) => ({ ...prev, isSidebarOpen: false }));
  };

  const isAdminRoute = pathname.startsWith(adminBasePath);
  const isCooperativeRoute = pathname.startsWith(cooperativePath);
  const isVendorRoute = pathname.startsWith(vendorPath);
  const isEnumeratorRoute = pathname.startsWith(enumeratorPath);

  let itemsToRender: MenuItem[] = [];

  if (isAdminRoute) {
    itemsToRender = adminMenuItems;
  } else if (isCooperativeRoute) {
    itemsToRender = cooperativeItems;
  } else if (isVendorRoute) {
    itemsToRender = vendorItems;
  } else if (isEnumeratorRoute) {
    itemsToRender = enumeratorItems;
  } else {
    itemsToRender = [];
  }

  React.useEffect(() => {
    if (!isLargeScreen) {
      handleSidebarClose();
    }
  }, [isLargeScreen]);

  return (
    <aside
      className={cn(
        "flex flex-col w-[254px] min-h-screen border-r-[.4px] h-full fixed bg-white border-[#33354354] transition-all duration-300 ease-in-out z-50",
        !isLargeScreen && !app.isSidebarOpen ? "-translate-x-[254px]" : ""
      )}
    >
      <nav className="flex overflow-hidden flex-col items-start px-6 pt-5 pb-64 mx-auto w-full leading-tight bg-white border-r-0 border-zinc-700 border-opacity-30 max-md:px-5 max-md:pb-24 max-md:mt-10">
        <div className="flex justify-between w-full">
          <div className="flex gap-2 text-sm font-bold whitespace-nowrap text-zinc-700 w-[81px]">
            <img
              src="/images/logo.svg"
              alt="Logo"
              className="object-contain shrink-0 aspect-[0.97] w-[39px]"
            />
            <div className="my-auto">KADA</div>
          </div>

          <button className="block lg:hidden" onClick={handleSidebarClose}>
            <CloseIcon className="w-3 h-3 text-zinc-700" />
          </button>
        </div>

        <h2 className="mt-10 mb-5 text-sm font- text-neutral-700 max-md:mt-10">
          MENU
        </h2>

        {itemsToRender.map((item, index) => {
          let isActive;
          // const isActive =
          //   pathname.startsWith(item.href) && pathname == item.href;
          if (item.matchSubPath) {
            isActive = pathname.startsWith(item.href);
          } else {
            isActive = pathname == item.href;
          }
          const Icon: any = item.icon;

          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-2 my-1 px-5 w-full rounded-full py-2.5",
                isActive ? "text-white bg-[#197A53]" : "text-zinc-700",
                "max-md:ml-2.5"
              )}
              onClick={() => {
                if (!isLargeScreen) {
                  handleSidebarClose();
                }
              }}
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
          <button
            className="flex items-center gap-2 my-3 px-5 w-full rounded-full"
            onClick={handleLogout}
          >
            <ArrowLeftEndOnRectangleIcon className="w-4 text-zinc-700" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

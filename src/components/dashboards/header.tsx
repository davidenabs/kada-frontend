"use client";
import useScreenSize from "@/hooks/use-screen-size";
import { Hamburger } from "@/icons";
import { appAtom } from "@/stores/app";
import { defaultUser, userAtom } from "@/stores/user";
import { useAtom } from "jotai";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { startTransition } from "react";
import { Avatar, Dropdown, Text } from "rizzui";
import { toast } from "sonner";

const Header: React.FC = () => {
  const { width } = useScreenSize();
  const [app, setApp] = useAtom(appAtom);
  const [user, setUser] = useAtom(userAtom);
  const pathname = usePathname();

  const handleLogout = () => {
    toast.success("Logging out...");
    startTransition(() => {
      setUser(defaultUser);
    });
  };

  const handleSidebarToggle = () => {
    setApp((prev) => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }));
  };

  return (
    <header className="flex flex-wrap gap-5 justify-between items-center w-full leading-tight bg-white py-4 px-10 max-md:px-5 border-b transition-all duration-300 ease-in-out">
      <div className="hidden lg:flex">
        {app.dashboardTitle && (
          <h1 className="text-base font-bold text-[#333543]">
            {app.dashboardTitle}
          </h1>
        )}
      </div>

      <div className="flex gap-[14px] lg:hidden">
        <button onClick={handleSidebarToggle}>
          <Hamburger className="fill-[#344054]" />
        </button>

        <Image src="/images/logo.svg" alt="logo" width={30} height={30} />
      </div>

      <div className="flex gap-1 justify-center items-center self-stretch">
        <Dropdown placement="bottom-end">
          <Dropdown.Trigger>
            <div className="flex gap-1 items-start my-auto">
              <Avatar
                name={`${user.user?.firstName} ${user.user?.lastName}`}
                src={user.user?.imagePath ?? "/images/avatar.png"}
                className="cursor-pointer"
              />
              <div className="flex flex-col h-[29px]">
                <div className="flex gap-1 items-end text-xs font-bold text-green-800">
                  <div>
                    {user.user?.firstName} {user.user?.lastName}
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a372f2dd9322a139bfecb23005028dcb756c8893933af728ae33b2b858380cfc?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3"
                    alt=""
                    className="object-contain shrink-0 w-3.5 aspect-square"
                  />
                </div>
                <div className="text-start">
                  <span className="text-xs font-light text-zinc-700 capitalize">
                    {user.user?.userType}
                  </span>
                </div>
              </div>
            </div>
          </Dropdown.Trigger>
          <Dropdown.Menu className="w-56 divide-y text-gray-600 bg-white">
            <div className="mb-2">
              <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">
                Account Settings
              </Dropdown.Item>
              <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">
                Support
              </Dropdown.Item>
              <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">
                License
              </Dropdown.Item>
            </div>
            <div className="mt-2 pt-2">
              <Dropdown.Item
                className="hover:bg-gray-900 hover:text-gray-50"
                as="button"
                onClick={handleLogout}
              >
                Sign Out
              </Dropdown.Item>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;

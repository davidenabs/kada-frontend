"use client";
import { Hamburger } from "@/icons";
import { UserType } from "@/interface/user";
import { appAtom } from "@/stores/app";
import { defaultUser, userAtom } from "@/stores/user";
import { useAtom } from "jotai";
import Image from "next/image";
import React, { startTransition } from "react";
import { Avatar, cn, Dropdown, Text } from "rizzui";
import { toast } from "sonner";

const Header: React.FC = () => {
  const [app, setApp] = useAtom(appAtom);
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    toast.success("Logging out...");
    startTransition(() => {
      setUser(defaultUser);
    });
  };

  const isFarmer = React.useMemo(
    () => user?.user?.userType === UserType.FARMER,
    [user]
  );

  const displayName = React.useMemo(() => {
    switch (user?.user?.userType) {
      case UserType.FARMER:
        return user.user?.firstName + " " + user.user?.lastName;
      case UserType.COOPERATIVE:
        return user?.user?.cooperativeProfile?.cooperativeName;
      case UserType.VENDOR:
        return user.user?.vendorProfile?.vendorName;
      default:
        return "User";
    }
  }, [user]);

  const handleSidebarToggle = () => {
    setApp((prev) => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }));
  };

  return (
    <header className="flex overflow-hidden flex-col w-full bg-white max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between px-11 py-2.5 w-full leading-tight bg-white border-b border-zinc-100 max-md:px-5 max-md:max-w-full">
        <div
          className={cn(
            "flex gap-10 font-bold whitespace-nowrap text-zinc-700",
            isFarmer ? "" : "hidden lg:flex"
          )}
        >
          {isFarmer && (
            <div className="flex gap-1 text-sm">
              <img
                loading="lazy"
                src="/images/logo.svg"
                alt=""
                className="object-contain shrink-0 aspect-square w-[39px]"
              />
              <div className="my-auto">KADA</div>
            </div>
          )}
          {app.dashboardTitle && (
            <div className="my-auto text-base">{app.dashboardTitle}</div>
          )}
        </div>

        {!isFarmer && (
          <div className="flex gap-[14px] lg:hidden">
            <button onClick={handleSidebarToggle}>
              <Hamburger className="fill-[#344054]" />
            </button>

            <Image src="/images/logo.svg" alt="logo" width={30} height={30} />
          </div>
        )}

        <div className="">
          <Dropdown placement="bottom-end">
            <Dropdown.Trigger>
              <div className="flex gap-1 items-start my-auto">
                <Avatar
                  name={displayName ?? "User"}
                  src={user.user?.imagePath ?? "/images/avatar.png"}
                  className="cursor-pointer"
                />
                <div className="flex flex-col h-[29px]">
                  <div className="flex gap-1 items-end text-xs font-bold text-green-800">
                    <div className="w-[70px] whitespace-nowrap truncate">
                      {displayName}
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
              <Dropdown.Item className="hover:bg-transparentx">
                <Avatar
                  name={`${user.user?.firstName} ${user.user?.lastName}`}
                  src={user.user?.imagePath ?? "/images/avatar.png"}
                />
                <div className="ml-2 text-start w-full truncate">
                  <span className="text-gray-900 font-medium leading-tight">
                    {displayName}
                  </span>

                  <div className="">
                    <span className=" text-gray-500 whitespace-nowrap text-ellipsis">
                      {user.user?.email || user.user?.phoneNumber || "N/A"}
                    </span>
                  </div>
                </div>
              </Dropdown.Item>
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
      </div>
    </header>
  );
};

export default Header;

"use client";
import { appAtom } from "@/stores/app";
import { userAtom } from "@/stores/user";
import { useAtom } from "jotai";
import React from "react";
import { Avatar, Dropdown, Text } from "rizzui";
import { toast } from "sonner";

const Header: React.FC = () => {
  const [app] = useAtom(appAtom);
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    toast.success("Logging out...");
    setUser({ ...user, user: null, token: null, authenticated: false });
  };

  return (
    <header className="flex overflow-hidden flex-col w-full bg-white max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between px-11 py-2.5 w-full leading-tight bg-white border-b border-zinc-100 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-10 font-bold whitespace-nowrap text-zinc-700">
          <div className="flex gap-1 text-sm">
            <img
              loading="lazy"
              src="/images/logo.svg"
              alt=""
              className="object-contain shrink-0 aspect-square w-[39px]"
            />
            <div className="my-auto">KADA</div>
          </div>
          {app.dashboardTitle && (
            <div className="my-auto text-base">{app.dashboardTitle}</div>
          )}
        </div>

        <div className="">
          <Dropdown placement="bottom-end">
            <Dropdown.Trigger>
              <div className="flex gap-1 items-start my-auto">
                {/* <img
                  loading="lazy"
                  src={user.user?.imagePath ?? "/images/avatar.png"}
                  alt="User avatar"
                  className="object-contain shrink-0 w-7 rounded-md aspect-square"
                /> */}
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
            <Dropdown.Menu className="w-56 divide-y text-gray-600">
              <div className="mt-3 mb-2 pt-2">
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

"use client"
import useScreenSize from '@/hooks/use-screen-size';
import { appAtom } from '@/stores/app';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Avatar, Dropdown, Text } from 'rizzui';

const Header: React.FC = () => {

    const { width } = useScreenSize()
    const [app,] = useAtom(appAtom);
    const pathname = usePathname();
  
    // Determine if the current route is for admin or regular user
    const isAdminRoute = pathname.startsWith('/admin');



    if (width < 992)
        return (
            <header className="flex flex-col px-5 pt-5 w-full leading-tight border-b">
                <div className="flex gap-5 justify-between items-start w-full">
                    <div className="flex gap-1 text-xs font-bold whitespace-nowrap text-zinc-700">
                        <img loading="lazy" src="/images/logo.svg" />
                        <div className="my-auto">KADA</div>
                    </div>
                    <div className="flex gap-1 items-start mt-4">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/beab14d80f6f6239470e3266db0abd931492827a1799773b0f091fbdc21b309c?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" alt="User avatar" className="object-contain shrink-0 w-7 rounded-md aspect-square" />
                        <div className="flex flex-col h-[29px]">
                            <div className="flex gap-1 items-end text-xs font-bold text-green-800">
                                <div>John Emmanuel</div>
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a372f2dd9322a139bfecb23005028dcb756c8893933af728ae33b2b858380cfc?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" alt="" className="object-contain shrink-0 w-3.5 aspect-square" />
                            </div>
                            <div className="text-xs font-light text-zinc-700">Admin</div>
                        </div>
                    </div>
                </div>

                {app.dashboardTitle && (
                    <h1 className="self-start text-xl font-bold text-zinc-700">{app.dashboardTitle}</h1>
                )}


            </header>
        );
    else

        return (
            <header className="flex flex-wrap gap-5 justify-between items-start pr-16 pt-3.5 pb-7 w-full leading-tight bg-white max-md:px-5 max-md:max-w-full">
                {/* <h1 className="mt-3.5 text-base font-bold text-zinc-700">Dashboard</h1> */}
                {app.dashboardTitle && (
                    <h1 className="mt-3.5 text-base font-bold text-zinc-700">{app.dashboardTitle}</h1>
                )}
                <div className="flex gap-1 justify-center items-center self-stretch">
                    <Dropdown placement="bottom-end">
                        <Dropdown.Trigger>
                            <Avatar
                                name="John Doe"
                                src="/images/moses.png"
                                className="cursor-pointer"
                                rounded="sm"
                            />
                        </Dropdown.Trigger>
                        <Dropdown.Menu className="w-56 divide-y text-gray-600">
                            <Dropdown.Item className="hover:bg-transparent">
                                <Avatar
                                    name="John Doe"
                                    src="/images/moses.png"
                                    rounded="sm"
                                />
                                <span className="ml-2 text-start">
                                    <Text className="text-gray-900 font-medium leading-tight">Mary Hoops</Text>
                                    <Text>maryhe@demo.io</Text>
                                </span>
                            </Dropdown.Item>
                            <div className="mt-3 mb-2 pt-2">
                                <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">
                                    Account Settings
                                </Dropdown.Item>
                                <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">Support</Dropdown.Item>
                                <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">License</Dropdown.Item>
                            </div>
                            <div className="mt-2 pt-2">
                                <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">Sign Out</Dropdown.Item>
                            </div>
                        </Dropdown.Menu>

                    </Dropdown>

                    <div className="flex flex-col text-sm text-green-800">
                        <div className="flex gap-1 items-end font-bold text-green-800">
                            <span>John Emmanuel</span>
                        </div>
                        <div className="font-light text-zinc-700">Admin</div>
                    </div>

                </div>
            </header >
        );
};

export default Header;
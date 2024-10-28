"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import useScreenSize from '@/hooks/use-screen-size';

// interface MenuItem {
//     icon: string;
//     label: string;
//     href: string;
// }

// const basePath = '/dashboard/cooperative';

// const menuItems: MenuItem[] = [
//     { icon: "/images/home-icon.svg", label: "Dashboard", href: basePath },
//     { icon: "/images/home-icon.svg", label: "Members", href: `${basePath}/members` },
//     { icon: "/images/home-icon.svg", label: "Events", href: `${basePath}/events` },
//     { icon: "/images/home-icon.svg", label: "Opportunities", href: `${basePath}/opportunities` },
//     { icon: "/images/home-icon.svg", label: "Funding", href: `${basePath}/funding` },
//     { icon: "/images/home-icon.svg", label: "Vendors", href: `${basePath}/vendors` },
// ];


interface MenuItem {
    icon: string;
    label: string;
    href: string;
}

const menuItems: MenuItem[] = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4702c1400c5d5ab6f2bae3ecd8872ea541562121101db41c6ea588f5d0efed1f?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3", label: "Dashboard", href: "/dashboard" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b20ba2b14fec54923b7f15419fe1a58822a22ee262296c967e920985d1ef01f7?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3", label: "Members", href: "/members" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e0ca8985065533fa9dfd00321981310836bf1460d66a292b17ea394b994f9134?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3", label: "Events", href: "/events" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2371b46d57233a496c5172c75a8e52c124a1c836a8043738fb9055ce7843dea2?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3", label: "Opportunities", href: "/opportunities" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2f88c66fd0f54b534849ac4d1b7b5115269e96ecfdb4e158fcf8de2a684ac456?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3", label: "Funding", href: "/funding" },
];

const BottomNavigation: React.FC = () => {
    const pathname = usePathname();
    const { width } = useScreenSize();


    if (width > 992)
        return <></>;
    else
        return (
            <nav className="fixed bottom-0  flex overflow-hidden z-10 gap-5 justify-between items-start px-6 pt-8 pb-4 mt-52 w-full text-xs font-semibold leading-tight text-white whitespace-nowrap bg-stone-50">
                {menuItems.map((item, index) => {
                    const isActive = pathname === item.href; // Check if the current route matches the menu item.

                    return (
                        <div key={index} className="flex flex-col items-center">
                            <a href={item.href}>
                                <img
                                    loading="lazy"
                                    src={item.icon}
                                    alt={item.label}
                                    className={`object-contain aspect-square w-[22px] ${isActive ? 'bg-green-600 p-1 rounded-full' : ''}`}
                                />
                            </a>
                            {isActive && (
                                <div className="overflow-hidden gap-2.5 self-stretch px-2 py-1 mt-1.5 bg-green-600 rounded-[60px] text-white">
                                    {item.label}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        );
};

export default BottomNavigation;

//   label: string;
//   isActive?: boolean;
// }

// const menuItems: MenuItem[] = [
//   { icon: "/images/home-icon.svg", label: "Dashboard", isActive: true },
//   { icon: "/images/home-icon.svg", label: "Members" },
//   { icon: "/images/home-icon.svg", label: "Events" },
//   { icon: "/images/home-icon.svg", label: "Opportunities" },
//   { icon: "/images/home-icon.svg", label: "Funding" },
//   { icon: "/images/home-icon.svg", label: "Vendors" },
// ];

// const Sidebar: React.FC = () => {
//   return (
//     <aside className="flex flex-col w-[19%] max-md:ml-0 max-md:w-full">
//       <nav className="flex overflow-hidden flex-col items-start px-6 pt-5 pb-64 mx-auto w-full leading-tight bg-white border-r-0 border-zinc-700 border-opacity-30 max-md:px-5 max-md:pb-24 max-md:mt-10">
//         <div className="flex gap-2 self-center text-sm font-bold whitespace-nowrap text-zinc-700 w-[81px]">
//           <img src="/images/logo.svg" alt="" className="object-contain shrink-0 aspect-[0.97] w-[39px]" />
//           <div className="my-auto">KADA</div>
//         </div>
//         <div className="flex gap-4 items-start self-stretch py-3.5 pr-8 pl-2.5 mt-11 rounded-2xl bg-neutral-100 max-md:pr-5 max-md:mt-10">
//           <img src="/images/coop-dp.png" alt="" className="object-contain shrink-0 rounded-full aspect-square w-[39px]" />
//           <div className="flex flex-col mt-1.5">
//             <div className="self-start text-sm font-semibold text-black">FACESIIWO</div>
//             <div className="text-xs text-zinc-500">Cooperative Society</div>
//           </div>
//         </div>
//         <h2 className="mt-16 text-sm font-semibold text-neutral-700 max-md:mt-10">MENU</h2>
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className={`flex items-center gap-2 mt-8 ml-5 text-base font-semibold px-5  whitespace-nowrap ${item.isActive ? 'text-white bg-green-600 rounded-xl py-2.5 self-stretch w-full' : 'text-zinc-700'
//               } max-md:ml-2.5`}
//           >
//             <img src={item.icon} alt="" className="object-contain shrink-0 self-start aspect-square w-[18px]" />
//             <div>{item.label}</div>
//           </div>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
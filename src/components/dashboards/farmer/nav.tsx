import React, { useState } from 'react';

interface NavItemProps {
    icon?: string; // icon is optional since some items don't have an icon
    label: string;
    isActive?: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
    const baseClasses = "flex gap-1 items-end cursor-pointer"; // Added cursor-pointer for better UX
    const activeClasses = isActive
        ? "px-3 py-2.5 font-bold text-white bg-teal-700 rounded-[60px]"
        : "my-auto text-black";

    return (
        <div className={`${baseClasses} ${activeClasses}`} onClick={onClick}>
            {icon && <img loading="lazy" src={icon} alt={label} className="object-contain shrink-0 aspect-square w-[18px]" />}
            <div>{label}</div>
        </div>
    );
};

const Navigation: React.FC = () => {
    const [activeNav, setActiveNav] = useState<string>('Dashboard'); // Track the active page

    const navItems = [
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fa8229e57a2a07aa0ac9678880aaf013429ec6c3ee0e2c8d6b5a83d5cc41f5a5?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3", label: "Dashboard" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bf27cadaba572421394c010f7081e1333020a554f5de431176b95974f6d0977d?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3", label: "Farms" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2601d0655b8b2f597af9611b2b57de004cd0497217baae2b22b37b47f43c5d69?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3", label: "Vendors" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/aad57492463811d6a604b16f61176a24a103e788faea5eb150a6589247d853ac?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3", label: "Funding" },
        { label: "Opportunities" },
        { label: "Events" },
    ];

    return (
        <nav className="flex flex-wrap gap-5 justify-between w-full text-sm leading-tight max-w-[1283px] max-md:max-w-full">
            <div className="flex flex-wrap gap-10 max-md:max-w-full">
                <div className="flex gap-9 whitespace-nowrap">
                    {navItems.slice(0, 2).map((item, index) => (
                        <NavItem
                            key={index}
                            {...item}
                            isActive={activeNav === item.label}
                            onClick={() => setActiveNav(item.label)}
                        />
                    ))}
                </div>
                <div className="flex flex-auto gap-10 my-auto text-black max-md:max-w-full">
                    {navItems.slice(2).map((item, index) => (
                        <NavItem
                            key={index}
                            {...item}
                            isActive={activeNav === item.label}
                            onClick={() => setActiveNav(item.label)}
                        />
                    ))}
                </div>
            </div>
            <div className="my-auto font-bold text-black underline">My profile</div> {/* Display the active page */}
        </nav>
    );
};

export default Navigation;

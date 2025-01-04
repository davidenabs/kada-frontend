"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Lock, Logo, CloseIcon } from "@/icons";
import Button from "@/components/form/button";
import useScreenSize from "@/hooks/use-screen-size";
import { useAtom, useSetAtom } from "jotai";
import { appAtom, openNavDrawerAtom } from "@/stores/app";
import { cn } from "rizzui";
import { usePathname, useRouter } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/16/solid";

interface NavItemProps {
  text: string;
  route: string;
  isActive?: boolean;
  hasDropdown?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  text,
  isActive,
  route,
  hasDropdown,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdownData = [
    {
      id: 1,
      title: "Commodity Pricing",
      desc: "Get insight on product pricing",
      href: "/commodity-pricing",
    },
    {
      id: 2,
      title: "Cropping Calender",
      desc: "Knowledge Bank for crop Specific information",
      href: "/cropping-calendar",
    },
    {
      id: 3,
      title: "Market Information",
      desc: "Market locations, products and other related market data",
      href: "/commodity-pricing/market",
    },
  ];

  return (
    <div className="flex flex-col items-center relative" ref={dropdownRef}>
      {hasDropdown ? (
        <button
          onClick={toggleDropdown}
          className={cn(
            "text-tertiary-700",
            isActive && "font-bold text-primary-700"
          )}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          {text}
        </button>
      ) : (
        <Link
          href={route}
          className={cn(
            "text-tertiary-700",
            isActive && "font-bold text-primary-700"
          )}
        >
          {text}
        </Link>
      )}
      {isActive && (
        <div className="h-1.5 w-1.5 bg-primary-700 rounded-full mt-1" />
      )}
      {hasDropdown && isDropdownOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#F2F9F5] shadow-md rounded-b-md py-6 z-10 px-4">
          <h2 className="text-[14px] font-semibold pl-4">KADA TOOLS</h2>
          <div className="flex flex-col gap-3 w-[250px] mt-4">
            {dropdownData.map((data) => {
              return (
                <Link
                  key={data.id}
                  href={data.href}
                  className="block px-4 py-2 text-sm text-tertiary-700 hover:bg-primary-100 hover:rounded-md"
                >
                  <div className="flex gap-4 items-start ">
                    <img
                      src="/icons/hastagIcon.svg"
                      alt="hashtag icon"
                      className="mt-1"
                    />
                    <div>
                      <h3 className="font-semibold">{data.title}</h3>

                      <p className="text-gray-500 text-[12px]">{data.desc}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const navItems: NavItemProps[] = [
  { text: "Home", route: "/" },
  { text: "About Kada", route: "/about-kada" },
  { text: "Programs", route: "/programs" },
  { text: "Interventions", route: "/interventions" },
  { text: "Tools", route: "#", hasDropdown: true },
  { text: "Contact Us", route: "/contact" },
];

const Navbar: React.FC = () => {
  const { width } = useScreenSize();
  const [app] = useAtom(appAtom);
  const updateNavDrawer = useSetAtom(openNavDrawerAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = usePathname();
  const router = useRouter();

  const handleCloseNavDrawer = useCallback(() => {
    updateNavDrawer(false);
  }, [updateNavDrawer]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (app.openNavDrawer) {
      handleCloseNavDrawer();
    }
  }, [app.openNavDrawer, handleCloseNavDrawer]);

  return (
    <>
      {app.openNavDrawer && (
        <div
          className="absolute h-full w-full inset-0 bg-black opacity-50 cursor-pointer z-[99]"
          onClick={handleCloseNavDrawer}
        />
      )}
      <header className="fixed w-full z-[999] top-0">
        <div className="flex justify-between items-center h-[90px] lg:h-[121px] app_container relative z-[999] leading-tight bg-[#F2F9F5] !backdrop-blur-lg">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Logo
              className={cn(
                width < 1024 ? "h-[46.49px] w-[46px]" : "h-[66.49px] w-[66px]"
              )}
            />

            <div>
              <h1 className="text-[#367B62] font-bold  text-[22px] md:text-[26px]">
                KADA
              </h1>
              <p className="text-tertiary-700 text-[10px] md:text-[12px]">
                Kada Agricultural <br />
                Development Agency
              </p>
            </div>
          </div>

          {/* Hamburger Icon for Mobile Screens */}
          {width < 1024 ? (
            <button
              onClick={toggleMenu}
              className="lg:hidden flex items-center text-white"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6 fill-black" />
              )}
            </button>
          ) : (
            <nav className="hidden lg:flex gap-10 self-stretch my-auto text-zinc-700">
              {navItems.map((item, index) => (
                <NavItem
                  key={index}
                  {...item}
                  isActive={currentPath === item.route}
                />
              ))}
            </nav>
          )}

          {/* Button (always visible on large screens, hidden on mobile) */}
          {width >= 1024 && (
            <div>
              <Button
                handleClick={() => router.push("/portal")}
                className="flex w-[146px] h-[45px] gap-2.5 justify-center items-center  !px-5 !py-0 my-auto font-bold text-white !rounded-full"
              >
                <span className="self-stretch my-auto">Kada Portal</span>
                <Lock className="my-auto aspect-square w-[18px]" />
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && width < 1024 && (
          <nav className="absolute top-[90px] left-0 w-full bg-primary-100 text-zinc-700 z-[998]">
            <ul className="flex flex-col items-center gap-5 py-4">
              {navItems.map((item, index) => (
                <li key={index} onClick={() => setIsMenuOpen(false)}>
                  <NavItem {...item} />
                </li>
              ))}
              <li>
                <Button
                  handleClick={() => router.push("/portal")}
                  className="flex w-[146px] h-[45px] gap-2.5 justify-center items-center  !px-5 !py-0 my-auto font-bold text-white !rounded-full"
                >
                  <span className="self-stretch my-auto">Kada Portal</span>
                  <Lock className="my-auto aspect-square w-[18px]" />
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

export default Navbar;

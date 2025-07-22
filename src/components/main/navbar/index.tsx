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
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface NavItemProps {
  text: string;
  route: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  text,
  isActive,
  route,
  hasDropdown,
  isMobile = false,
  onMobileMenuClose,
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

    // Only add click outside listener for desktop
    if (!isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isMobile]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    if (onMobileMenuClose) {
      onMobileMenuClose();
    }
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
    {
      id: 4,
      title: "Good Agronomic practices",
      desc: "Knowledge Bank for Good Agronomic practices",
      href: "/good-agronomic-practices",
    },
  ];

  return (
    <div className={cn(
      "flex flex-col items-center relative",
      isMobile && "w-full"
    )} ref={dropdownRef}>
      {hasDropdown ? (
        <button
          onClick={toggleDropdown}
          className={cn(
            "text-tertiary-700 flex items-center gap-1",
            isActive && "font-bold text-primary-700",
            isMobile && "py-2 w-full justify-center"
          )}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          <span>{text}</span>
          <ChevronDownIcon className={cn(
            "h-4 w-4 transition-transform duration-200",
            isDropdownOpen && "rotate-180"
          )} />
        </button>
      ) : (
        <Link
          href={route}
          onClick={handleLinkClick}
          className={cn(
            "text-tertiary-700",
            isActive && "font-bold text-primary-700",
            isMobile && "py-2 w-full text-center"
          )}
        >
          {text}
        </Link>
      )}

      {isActive && !isMobile && (
        <div className="h-1.5 w-1.5 bg-primary-700 rounded-full mt-1" />
      )}

      {hasDropdown && isDropdownOpen && (
        <div className={cn(
          "bg-[#F2F9F5] shadow-md rounded-b-md py-6 z-10 px-4",
          isMobile
            ? "w-full mt-2 relative"
            : "absolute top-full left-1/2 transform -translate-x-1/2 mt-2"
        )}>
          <h2 className="text-[14px] font-semibold pl-4 uppercase">
            Advisory TOOLS
          </h2>
          <div className={cn(
            "flex flex-col gap-3 mt-4",
            isMobile ? "w-full" : "w-[250px]"
          )}>
            {dropdownData.map((data) => {
              return (
                <Link
                  key={data.id}
                  href={data.href}
                  onClick={handleLinkClick}
                  className="block px-4 py-2 text-sm text-tertiary-700 hover:bg-primary-100 hover:rounded-md"
                >
                  <div className="flex gap-4 items-start">
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
  { text: "About KADA", route: "/about-kada" },
  { text: "Programs", route: "/programs" },
  { text: "Partners", route: "/partners" },
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

  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (app.openNavDrawer) {
      handleCloseNavDrawer();
    }
  }, [app.openNavDrawer, handleCloseNavDrawer]);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (width >= 1024) {
      setIsMenuOpen(false);
    }
  }, [width]);

  return (
    <>
      {app.openNavDrawer && (
        <div
          className="absolute h-full w-full inset-0 bg-black opacity-50 cursor-pointer z-[99]"
          onClick={handleCloseNavDrawer}
        />
      )}
      <header className="fixed w-full z-[999] top-0">
        <div className="flex justify-between items-center h-[90px] lg:h-[121px] app_containe max-md:px-4 px-10 relative z-[999] leading-tight bg-[#F2F9F5] !backdrop-blur-lg">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/images/main-logo.png"
              alt="Kaduna State Agricultural Development Agency Logo"
              className={cn(
                width < 1024 ? "h[46.49px] w-[166px]" : "h[66.49px] w-[266px]"
              )}
            />
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
                <span className="self-stretch my-auto">KADA Portal</span>
                <Lock className="my-auto aspect-square w-[18px]" />
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && width < 1024 && (
          <nav className="absolute top-[90px] left-0 w-full bg-primary-100 text-zinc-700 z-[998]">
            <ul className="flex flex-col items-center gap-2 py-4">
              {navItems.map((item, index) => (
                <li key={index} className="w-full px-4">
                  <NavItem
                    {...item}
                    isActive={currentPath === item.route}
                    isMobile={true}
                    onMobileMenuClose={handleMobileMenuClose}
                  />
                </li>
              ))}
              <li className="mt-4">
                <Button
                  handleClick={() => {
                    router.push("/portal");
                    handleMobileMenuClose();
                  }}
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
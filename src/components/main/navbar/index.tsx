"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Lock, Logo, CloseIcon } from "@/icons"; // Assume `Hamburger` and `CloseIcon` are valid icons
import Button from "@/components/form/button";
import useScreenSize from "@/hooks/use-screen-size";
import { useAtom, useSetAtom } from "jotai";
import { appAtom, openNavDrawerAtom } from "@/stores/app";
import cn from "@/utils/class_names";
import { usePathname, useRouter } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/16/solid";

interface NavItemProps {
  text: string;
  route: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ text, isActive, route }) => {
  return (
    <div className="flex flex-col items-center">
      <Link href={route} className={cn("text-tertiary-700", isActive && "font-bold text-primary-700")}>
        {text}
      </Link>
      {isActive && <div className="h-1.5 w-1.5 bg-primary-default rounded-full mt-1" />}
    </div>
  );
};

const navItems: NavItemProps[] = [
  { text: "Home", route: "/" },
  { text: "About Kada", route: "/about-kada" },
  { text: "Our Services", route: "/services" },
  { text: "Pricing Information", route: "/pricing" },
  { text: "Contact Us", route: "/contact" },
];

const Navbar: React.FC = () => {
  const { width } = useScreenSize();
  const [app,] = useAtom(appAtom);
  const updateNavDrawer = useSetAtom(openNavDrawerAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu
  const currentPath = usePathname()
  const router = useRouter();

  const handleCloseNavDrawer = useCallback(() => {
    updateNavDrawer(false);
  }, [updateNavDrawer]); // Memoize the function to avoid recreating it on every render

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
      <header className="fixed w-full z-[999]">
        <div className="flex justify-between items-center h-[90px] lg:h-[121px] app_container relative z-[999] leading-tight bg-[#F2F9F5] !backdrop-blur-lg">
          {/* Logo */}
          <Logo className={cn(width < 1024 ? "h-[46.49px] w-[46px]" : "h-[66.49px] w-[66px]")} />

          {/* Hamburger Icon for Mobile Screens */}
          {width < 1024 ? (
            <button
              onClick={toggleMenu}
              className="lg:hidden flex items-center text-white"
            >
              {isMenuOpen ? (
                <CloseIcon className="h-6 w" />
                // <Hamburger className="h-6 w-6" />
              ) : (<Bars3Icon className="h-6 w-6 fill-black" />)}
            </button>
          ) : (
            // Full Navigation for Larger Screens
            <nav className="hidden lg:flex gap-10 self-stretch my-auto text-zinc-700">
              {navItems.map((item, index) => (
                <NavItem key={index} {...item} isActive={currentPath === item.route} />
              ))}
            </nav>
          )}

          {/* Button (always visible on large screens, hidden on mobile) */}
          {width >= 1024 && (
            <div>
              <Button handleClick={() => router.push('/portal')} className="flex w-[146px] h-[45px] gap-2.5 justify-center items-center  !px-5 !py-0 my-auto font-bold text-white !rounded-full">
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
                <Button handleClick={() => router.push('/portal')} className="flex w-[146px] h-[45px] gap-2.5 justify-center items-center  !px-5 !py-0 my-auto font-bold text-white !rounded-full">
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

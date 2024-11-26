"use client";

import { useEffect, forwardRef, Fragment } from "react";
import { usePathname } from "next/navigation";
import { Drawer } from "rizzui";
import { useDrawer } from "@/hooks/use-drawer";
import { cn } from "rizzui";

type GlobalDrawerProps = {};

const GlobalDrawer = forwardRef<HTMLDivElement, GlobalDrawerProps>(
  (props, ref) => {
    const {
      isOpen,
      view,
      placement,
      customSize,
      closeDrawer,
      conatainerClassName,
      size,
    } = useDrawer();
    const pathname = usePathname();

    useEffect(() => {
      closeDrawer();
    }, [pathname]);

    return (
      <div ref={ref}>
        <Drawer
          isOpen={isOpen}
          onClose={closeDrawer}
          placement={placement}
          customSize={customSize}
          size={size}
          overlayClassName="bg-opacity-40 backdrop-blur-sm"
          containerClassName={cn("bg-gray-100", conatainerClassName)}
          className="z-[9999]"
        >
          {view}
        </Drawer>
      </div>
    );
  }
);

GlobalDrawer.displayName = "GlobalDrawer";

export default GlobalDrawer;

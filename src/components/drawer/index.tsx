"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Drawer } from "rizzui";
import { useDrawer } from "@/hooks/use-drawer";
import cn from "@/utils/class-names";

export default function GlobalDrawer() {
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
  );
}

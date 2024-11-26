"use client";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import type { DrawerSize } from "rizzui";

export type DrawerPlacements = "left" | "right" | "top" | "bottom";

export type DrawerTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  placement?: DrawerPlacements;
  customSize?: number;
  size?: DrawerSize;
  conatainerClassName?: string;
  isParallel?: boolean;
};

const drawerAtom = atom<DrawerTypes>({
  isOpen: false,
  view: null,
  placement: "right",
  customSize: 320,
  size: "sm",
  conatainerClassName: "bg-white",
  isParallel: false,
});

export function useDrawer() {
  const [state, setState] = useAtom(drawerAtom);

  const openDrawer = ({
    view,
    placement,
    customSize,
    conatainerClassName,
    isParallel,
    size,
  }: {
    view: React.ReactNode;
    placement: DrawerPlacements;
    customSize?: number;
    conatainerClassName?: string;
    isParallel?: boolean;
    size?: DrawerSize;
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      placement,
      customSize,
      conatainerClassName,
      isParallel,
      size,
    });
  };

  const closeDrawer = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  // set view to null when drawer is closed
  useEffect(() => {
    if (!state.isOpen) {
      setState({
        ...state,
        view: null,
      });
    }
  }, [state.isOpen]);

  return {
    ...state,
    openDrawer,
    closeDrawer,
  };
}

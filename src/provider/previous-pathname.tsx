"use client";
import { usePathname } from "next/navigation";
import { PropsWithChildren, createContext, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";

export const PreviousPathnameContext = createContext<string | undefined>(
  undefined
);

export default function PreviousPathnameProvider({
  children,
}: PropsWithChildren<unknown>) {
  const pathname = usePathname();
  const ref = useRef<string>("/");

  useEffect(() => {
    ref.current = pathname;
  }, [pathname]);

  return (
    <PreviousPathnameContext.Provider value={ref.current}>
      <Toaster position="top-right" containerClassName="toaster-container" />
      {children}
    </PreviousPathnameContext.Provider>
  );
}

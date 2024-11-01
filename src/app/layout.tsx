import type { Metadata } from "next";
import "./_styles/globals.css";
import PreviousPathnameProvider from "@/provider/previous-pathname";
import cn from "@/utils/class-names";
import { Suspense } from "react";
import GlobalModal from "@/components/modal";
import { inter, oxygen } from "./fonts";
import GlobalDrawer from "@/components/drawer";

export const metadata: Metadata = {
  title: "KADA",
  description:
    "Transforming Kaduna through Food Security and National Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(oxygen.variable, inter.variable, "font-oxygen")}>
        <PreviousPathnameProvider>
          <Suspense fallback={<div className="">Loading...</div>}>
            <main className="relative">
              {children}
              <GlobalModal />
              <GlobalDrawer />
            </main>
          </Suspense>
        </PreviousPathnameProvider>
      </body>
    </html>
  );
}

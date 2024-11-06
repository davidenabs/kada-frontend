import type { Metadata } from "next";
import cn from "@/utils/class-names";
import { Suspense } from "react";
import GlobalModal from "@/components/modal";
import { inter, oxygen } from "./fonts";
import GlobalDrawer from "@/components/drawer";
// ** Providers
import ReactQueryProvider from "@/provider/react-query";
import PreviousPathnameProvider from "@/provider/previous-pathname";
import "./_styles/globals.css";
import { Toaster } from "@/components/common/toast";
import LoaderProvider from "@/provider/loader";

export const metadata: Metadata = {
  title: {
    default: "KADA",
    template: "%s - KADA",
  },
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
        <ReactQueryProvider>
          <PreviousPathnameProvider>
            <Suspense fallback={<div className="">Loading...</div>}>
              <main className="relative">
                <LoaderProvider>
                  <Toaster />
                  {children}
                  <GlobalModal />
                  <GlobalDrawer />
                </LoaderProvider>
              </main>
            </Suspense>
          </PreviousPathnameProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

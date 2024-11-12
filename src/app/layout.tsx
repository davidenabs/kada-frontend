import type { Metadata } from "next";
import { cn } from "rizzui";
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
import { baseMetadata } from "./_templates/metadata";

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oxygen.variable} ${inter.variable} font-oxygen`}>
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

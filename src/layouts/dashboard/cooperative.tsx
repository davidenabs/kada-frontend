"use client";
import Header from "@/components/dashboards/farmer/header";
import Sidebar from "@/components/dashboards/sidebar";
import AppLoader from "@/components/shared/loader";
import BottomNavigation from "@/components/dashboards/cooperative/bottom-nav";
import React, { Suspense } from "react";
import NextProgress from "@/components/common/next-progress";

export default function CooperativeDahboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense
        fallback={
          <div className="my-auto">
            <AppLoader />
          </div>
        }
      >
        <NextProgress />
        <div className="flex flex-col">
          <div className="flex overflow-hidden w-full bg-white">
            <Sidebar />
            <div className="w-full lg:ml-[254px] max-md:ml-0 ">
              <Header />
              <div className="z-10 mt-0 w-full pt-8 max-md:max-w-full max-md:px-5">
                <div className="flex flex-col w-full">
                  <div className="dashboard_container my-auto w-full max-md:mt-1 max-md:max-w-full">
                    {children}

                    <BottomNavigation />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

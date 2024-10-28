"use client";
import BottomNavigation from "@/components/dashboards/cooperative/bottom-nav";
import Header from "@/components/dashboards/header";
import Sidebar from "@/components/dashboards/sidebar";
import AppLoader from "@/components/shared/loader";
import React, { Suspense } from "react";

const MainDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Suspense fallback={<div className="my-auto"><AppLoader /></div>}>
        <div className="flex flex-col">
          <div className="flex overflow-hidden w-full bg-white">
            <Sidebar />
            <div className="w-full ml-5 lg:ml-[20%] max-md:ml-0 min-h-screen overflow-auto"> {/* Added min-h-screen overflow-auto */}
              <Header />
              <div className="z-10 mt-0 w-full max-w-[1353px] pt-8 pr-32 max-md:max-w-full max-md:px-5">
                <div className="flex flex-col w[81%] w-full">
                  <div className="flex flex-col self-stretch my-auto w-full max-md:mt-1 max-md:max-w-full">
                    {children}
                    <div className="max-md:py-10"></div>
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
};

export default MainDashboardLayout;

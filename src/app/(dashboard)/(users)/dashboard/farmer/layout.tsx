"use client";
import Header from "@/components/dashboards/farmer/header";
import Navigation from "@/components/dashboards/farmer/nav";
import AppLoader from "@/components/shared/loader";
import React, { Suspense } from "react";

const MainDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Suspense fallback={<div className="my-auto"><AppLoader /></div>}>
        <div className="flex flex-col">
          <Header />
          <main className="flex flex-col px-8 mb-6 w-full max-md:px-5 max-md:max-w-full">
            <Navigation />
            <h1 className="self-start mt-7 text-base font-bold leading-tight text-teal-700 max-md:ml-2">
              Hello, Jerry
            </h1>
            <div className="mt-4 w-full max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                {/* <MainContent /> */}
                {children}

                
              </div>
            </div>
          </main>
        </div>
      </Suspense>
    </>
  );
};

export default MainDashboardLayout;

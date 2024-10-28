"use client";
import BottomNavigation from "@/components/dashboards/cooperative/bottom-nav";
import Header from "@/components/dashboards/header";
import Sidebar from "@/components/dashboards/sidebar";
import Button from "@/components/form/button";
import Select from "@/components/form/select";
import AppLoader from "@/components/shared/loader";
import React, { Suspense } from "react";

const MainDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Suspense fallback={<div className="my-auto"><AppLoader /></div>}>
        {/* {children} */}
        <div className="flex flex-col">
          <div className="flex overflow-hidden w-full bg-white">
            <Sidebar />
            <div className="w-full ml-5 lg:ml-[20%] max-md:ml-0 ">
              <Header />
              <div className="z-10 mt-0 w-full max-w[1353px] pt-8 pr-32 max-md:max-w-full max-md:px-5">
                <div className="flex flex-col w[81%] w-full">
                  <div className="flex flex-col selfstretch my-auto w-full max-md:mt-1 max-md:max-w-full">
                    <div className="flex gap-2 items-center self-end text-sm leading-tight">
                      <Button className="!w-fit !py-2.5 text-white !bg-green-600 !rounded-full !shadow-none ">
                        Add Member
                      </Button>
                      <Select className='!py-2.5 !px-3 !border border-tertiary-700' options={[]} value={'Import'} setValue={() => { }} />
                    </div>
                    {children}

                    <div className='max-md:py-10'></div>

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

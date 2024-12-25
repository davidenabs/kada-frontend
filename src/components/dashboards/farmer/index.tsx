"use client";
import React from "react";
import CreateFarmCard from "@/components/dashboards/farmer/create-farm-card";
import JoinCooperative from "@/components/dashboards/farmer/join-cooperative";
import VendorList from "@/components/dashboards/farmer/vendors";
import WeatherWidget from "@/components/dashboards/farmer/weather";
import Button from "@/components/form/button";
import CreateFarmModal from "@/components/modals/create-farm";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { useModal } from "@/hooks/use-modal";
import { PlusIcon, VerifiedIcon } from "@/icons";
import { userAtom } from "@/stores/user";
import { useAtom } from "jotai";

function FarmerDashboardSharedPage() {
  useDashboardTitle("Dashboard");
  const { openModal, closeModal } = useModal();
  const [user, setUser] = useAtom(userAtom);

  const handleOpenModal = () => {
    openModal({
      customSize: "654px",
      view: <CreateFarmModal close={closeModal} />,
    });
  };
  return (
    <>
      <h1 className="mb-4 text-base font-bold leading-tight text-teal-700 flex items-center gap-1">
        <span> Hello, {user?.user?.firstName}</span>
        {user?.user?.isSubscribed ? (
          <VerifiedIcon className="w-4 h-4" />
        ) : (
          <VerifiedIcon className="w-4 h-4 fill-red-300 stroke-red-600" />
        )}
      </h1>
      <div className="flex">
        <section className="flex flex-col w-[69%] max-md:ml-0 max-md:w-full space-y-6">
          <div className="overflow-hidden px-10 mx-auto w-full bg-[#205B42] rounded-3xl max-md:px-5 max-md:mt-5 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col h-[188px]">
              <div className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full">
                <h2 className="self-stretch my-auto text-4xl font-bold leading-9 text-white max-md:mt-10">
                  Farming to feed <br /> the nation
                </h2>
              </div>

              <div className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full">
                <div className="flex justify-end items-center grow text-base font-bold leading-none  max-md:mt-10 ">
                  <img
                    loading="lazy"
                    src="/images/famer-vector-curvy.svg"
                    alt="Farming illustration"
                    className="object-contain absolute grow shrink-0 aspect[1.68] basis-0 w-fit max-md:hidden"
                  />
                  <Button
                    handleClick={() => handleOpenModal()}
                    className="!w-fit !rounded-full !py-3 !px-3 !shadow-none !bg-white !text-green-800 self-center z-10 flex gap-2"
                  >
                    <span>Create Farm</span> <PlusIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <CreateFarmCard />
        </section>

        <aside className="flex flex-col ml-3 w-[31%] max-md:ml-0 max-md:w-full space-y-6">
          <WeatherWidget />
          <JoinCooperative />
          <VendorList />
        </aside>
      </div>
    </>
  );
}

export default FarmerDashboardSharedPage;

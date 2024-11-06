"use client";
import { ArrowRightIcon, CloseIcon, MapPinIcon, UsersListIcon } from "@/icons";
import Image from "next/image";
import React, { useState } from "react";
import cn from "@/utils/class-names";
import { KadaButton } from "@/components/form/button";

interface CooperativeInfoModalProps {
  close: () => void;
}

function CooperativeInfoModal({ close }: CooperativeInfoModalProps) {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    {
      id: "about",
      label: "About Cooperative",
    },
    {
      id: "eligibility",
      label: "Eligibility",
    },
    {
      id: "services",
      label: "Services",
    },
  ];

  return (
    <section className="flex overflow-hidden flex-col w-full rounded-[10px] max-md:max-w-full bg-white font-inter">
      <header className="flex items-center justify-between border-b px-6 py-2">
        <h4 className="text-base font-semibold">Cooperative Information</h4>
        <CloseIcon className="w-4 h-4" />
      </header>

      <div className="flex">
        <div className="bg-white w-4/12 py-8">
          <div className="divide-y [&>div]:py-8">
            <div className="flex flex-col items-center px-8">
              <div className="relative w-[122px] h-[122px]">
                <Image
                  src="/images/bdo.png"
                  alt="bdo"
                  fill
                  className="object-cover rounded-full"
                />
              </div>

              <h4 className="text-base text-[#101928] font-semibold mt-6">
                HarvestNet
              </h4>

              <p className="text-center text-sm font-inter text-[#1D2739]">
                Empowering local farmers through shared resources and support
              </p>
            </div>

            <div className="px-8 space-y-4">
              <div className="flex justify-center">
                <span className="text-sm">(91)</span>
              </div>
              <div className="flex justify-center items-center my-2 gap-4">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  <span className="text-xs">Chikun, Kaduna</span>
                </div>

                <div className="flex items-center gap-2">
                  <UsersListIcon className="w-[19px] h-[11px] text-[#667185]" />
                  <span className="text-xs">234 Members</span>
                </div>
              </div>
              <KadaButton
                className={cn("rounded-full w-full")}
                rightIcon={
                  <ArrowRightIcon className="w-[18px] h-[18px] fill-white" />
                }
              >
                Request to Join
              </KadaButton>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#F0EFEF] px-4 py-8">
          <div className="flex items-center space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id + tab.label}
                className={cn(
                  "text-sm text-[#333543] font-inter font-medium bg-[#F8F9FA] inline-flex px-4 rounded-full py-2",
                  activeTab === tab.id && "bg-[#343A3F] text-white"
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="border border-[#ECF2F6] bg-white p-7 mt-8 rounded-2xl">
            <div className="bg-[#F6F6F6] p-4 rounded-lg">
              <h4>AAbout</h4>

              <p className="text-base">
                HarvestNet Cooperative is a farmer-focused network dedicated to
                empowering agricultural communities through collective
                resources, knowledge-sharing, and market access. We aim to
                bridge gaps in funding, technology, and training, enabling our
                members to maximize yields and secure sustainable livelihoods.
                With a commitment to innovation and collaboration, HarvestNet
                brings farmers together, facilitating access to essential
                resources, fair pricing, and community support. Join us to
                cultivate a brighter, more resilient future for agriculture!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CooperativeInfoModal;

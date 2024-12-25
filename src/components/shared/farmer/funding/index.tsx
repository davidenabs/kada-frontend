"use client";
import Tab from "@/components/common/tab";
import Input from "@/components/form/input";
import { ArrowRightIcon, BriefcaseIcon, SearchIcon } from "@/icons";
import React, { useState } from "react";
import FundingTable from "./table";
import { KadaButton } from "@/components/form/button";
import { useRouter } from "next/navigation";
import useDashboardTitle from "@/hooks/use-dashboard-tite";

function FarmersFundingSharedPage() {
  useDashboardTitle("Funding");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Approved");
  const tabs = [
    {
      id: "approved",
      label: "Approved",
      badge: 3,
      icon: BriefcaseIcon,
    },
    {
      id: "pending",
      label: "Pending",
      badge: 0,
      icon: BriefcaseIcon,
    },
  ];

  return (
    <div className="font-inter space-y-6">
      <h4 className="text-2xl">Fundings</h4>

      <div className="flex gap-6">
        <div className="flex-1 space-y-4">
          <div className="h-[100px] w-full bg-[url('/images/funding.jpeg')] bg-cover bg-center bg-no-repeat rounded-2xl flex items-center justify-center">
            <h5 className="text-sm text-white font-inter font-semibold tracking-[10px]">
              Funding Opportunities for Farmers!
            </h5>
          </div>

          <div className="bg-white border border-[#ECF2F6] p-6 rounded-2xl space-y-4">
            <div className="flex justify-between">
              <div className="flex">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.id}
                    title={tab.label}
                    active={activeTab}
                    onClick={() => setActiveTab(tab.label)}
                    count={Number(tab.badge)}
                    className="max-lg:flex-1"
                    icon={tab.icon}
                  />
                ))}
              </div>

              <div className="">
                <Input
                  placeholder="Search here..."
                  inputClassName="!rounded-[10px]"
                  className="!w-[500px]"
                  prefix={<SearchIcon className="fill-black" />}
                />
              </div>
            </div>

            <div className="">
              <FundingTable />
            </div>
          </div>
        </div>

        <div className="w-[325px]">
          <div className="relative rounded-xl bg-[url('/images/join-coop.png')] bg-center bg-cover bg-no-repeat h-[347px] overflow-hidden z-10 p-6 flex flex-col justify-between">
            <div className="absolute inset-0 bg-custom-gradient z-[-1]"></div>
            <h4 className="text-2xl font-bold text-white text-center">
              Harvest Financial Support – Funding Awaits!
            </h4>

            <KadaButton
              className="w-full !bg-white !text-[#0D5D34] rounded-full"
              rightIcon={<ArrowRightIcon className="" />}
              onClick={() => router.push("/dashboard/farmer/cooperative")}
            >
              Join Cooperative
            </KadaButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmersFundingSharedPage;

"use client";
import React, { useState } from "react";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import Overview from "./overview";
import { KadaButton } from "@/components/form/button";
import { BriefcaseIcon, PlusIcon } from "@heroicons/react/16/solid";
import Input from "@/components/form/input";
import { SearchIcon } from "@/icons";
import UsersTable from "./table";
import Tab from "@/components/common/tab";

function AdminDashboardSharedPage() {
  useDashboardTitle("Dashboard");
  const [activeTab, setActiveTab] = useState("Farmer");

  const tabs = [
    {
      id: "farmer",
      label: "Farmer",
      badge: 3,
      icon: BriefcaseIcon,
    },
    {
      id: "vendor",
      label: "Vendor",
      badge: 0,
      icon: BriefcaseIcon,
    },
    {
      id: "cooperative",
      label: "Cooperative",
      badge: 0,
      icon: BriefcaseIcon,
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center text-sm leading-tight">
        <div className="rounded-full px-4 py-1 bg-[#F0EFEC]">
          👍🏾 Welcome Back, Admin
        </div>

        <div className="flex">
          <KadaButton
            className="rounded-full"
            leftIcon={<PlusIcon className="w-4 h-4 fill-white mr-1" />}
          >
            Add User
          </KadaButton>
        </div>
      </div>

      <Overview />

      <div className="border mt-10 p-4 space-y-4 rounded-2xl">
        <h5 className="font-bold text-lg">Users</h5>

        <div className="flex items-center justify-between">
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
          <Input
            placeholder="Search here..."
            inputClassName="!rounded-[10px] !h-[36px]"
            className="!w-[500px]"
            prefix={<SearchIcon />}
          />
        </div>

        <UsersTable />
      </div>
      {/* <FarmerTable /> */}
    </>
  );
}

export default AdminDashboardSharedPage;

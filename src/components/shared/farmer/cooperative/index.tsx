"use client";
import Tab from "@/components/common/tab";
import Input from "@/components/form/input";
import { BriefcaseIcon, SearchIcon } from "@/icons";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { useGetUsersQuery } from "@/app/_api/user";
import { UserType } from "@/interface/user";
import CooperativeCard from "@/components/common/cards/cooperative";
import { Empty } from "rizzui";
import CooperativeCardGallery from "@/components/skeletons/cooperative-card";
import { withAuth } from "@/components/common/auth";
import useDashboardTitle from "@/hooks/use-dashboard-tite";

function FarmerCooperativeSharedPage() {
  useDashboardTitle("Cooperative");
  const { closeModal, openModal } = useModal();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All Cooperative");

  const { data, isFetching, isRefetching } = useGetUsersQuery({
    params: {
      userType: UserType.COOPERATIVE,
    },
  });

  const tabs = [
    {
      id: "all",
      label: "All Cooperative",
      badge: 3,
      icon: BriefcaseIcon,
    },
    {
      id: "active",
      label: "Active Cooperative",
      badge: 0,
      icon: BriefcaseIcon,
    },
  ];

  return (
    <div className="font-inter space-y-6">
      <h4 className="text-2xl">Cooperatives (12)</h4>

      <div className="flex-1 space-y-4">
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
        </div>

        <div className="">
          {isFetching || isRefetching ? (
            <div className="grid grid-cols-2">
              <CooperativeCardGallery />
            </div>
          ) : data?.data?.total === 0 ? (
            <>
              <Empty text="No cooperative found" />
            </>
          ) : (
            <>
              <div className="grid grid-cols-2">
                {data?.data?.users.map((user) => (
                  <CooperativeCard
                    closeModal={closeModal}
                    openModal={openModal}
                    router={router}
                    key={user.id}
                    data={user}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FarmerCooperativeSharedPage;

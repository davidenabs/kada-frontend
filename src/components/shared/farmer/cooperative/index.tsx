"use client";
import Tab from "@/components/common/tab";
import Input from "@/components/form/input";
import { BriefcaseIcon, SearchIcon } from "@/icons";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { useGetCooperativesQuery } from "@/app/_api/user";
import CooperativeCard from "@/components/common/cards/cooperative";
import { Empty } from "rizzui";
import CooperativeCardGallery from "@/components/skeletons/cooperative-card";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import useDebounce from "@/hooks/use-debounce";
import { UserType } from "@/interface/user";

function FarmerCooperativeSharedPage({ farmerId }: { farmerId?: any }) {
  useDashboardTitle("Cooperative");
  const { closeModal, openModal } = useModal();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All Cooperative");
  const [loaded, setLoaded] = useState(false);
  const [page] = useState(1);
  const [search, setSearch] = useState("");
  const [limit] = useState(10);
  const debounceSearchQuery = useDebounce(search);

  const { data, isFetching, isRefetching } = useGetCooperativesQuery({
    enabled: loaded,
    params: {
      page,
      limit,
      search: debounceSearchQuery,
      userId: farmerId || null,
      getByUser: UserType.ENUMERATOR,
    },
  });

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  const tabs = [
    {
      id: "all",
      label: "All Cooperative",
      badge: data?.data?.total || 0,
      icon: BriefcaseIcon,
    },
    // {
    //   id: "active",
    //   label: "Active Cooperative",
    //   badge: 0,
    //   icon: BriefcaseIcon,
    // },
  ];

  return (
    <div className="font-inter space-y-6">
      <h4 className="text-2xl">Cooperatives ({data?.data?.total || 0})</h4>

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
                className="w-full lg:w-[500px]"
                prefix={<SearchIcon className="fill-black" />}
                onChange={(e) => setSearch(e.target.value)}
                clearable
                onClear={() => setSearch("")}
                value={search}
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
              <div className="grid grid-cols-2 gap-2">
                {data?.data?.users.map((user) => (
                  <CooperativeCard
                    closeModal={closeModal}
                    openModal={openModal}
                    router={router}
                    key={user.id}
                    data={user}
                    farmerId={farmerId}
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

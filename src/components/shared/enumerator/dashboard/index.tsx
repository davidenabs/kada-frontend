
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { BriefcaseIcon } from "@/icons";
import Tab from "@/components/common/tab";
import useDebounce from "@/hooks/use-debounce";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import Overview from "./overview";
import { useGetEnumeratorOverviewQuery } from "@/app/_api/overview";
import { useGetFarmersQuery } from '@/app/_api/user';
import EnumeratorFarmersSharedPage from "../tabs";
import { useGetFarmsQuerry } from "@/app/_api/farm";
import AddFarmerButton from "../add-button";

type tabType = "Farmers" | "Farms";

function EnumeratorDashboardSharedPage() {
  useDashboardTitle("Dashboard");

  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<tabType>("Farmers");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit] = useState(10);
  const debouncedSearchQuery = useDebounce(search);

  const { data: stats, isFetching: loading } = useGetEnumeratorOverviewQuery({
    enabled: loaded,
  });

  const { data: farmersData, isFetching: fetchingFarmers } = useGetFarmersQuery({
    enabled: loaded && activeTab === "Farmers",
    params: {
      page,
      search: debouncedSearchQuery,
      limit,
    },
  });

  const { data: farmsData, isFetching: fetchingFarms } = useGetFarmsQuerry({
    enabled: loaded && activeTab === "Farms",
    params: {
      page,
      search: debouncedSearchQuery,
      limit,
    },
  });

  const tabs = useMemo(
    () => [
      {
        id: "farmers",
        label: "Farmers",
        badge: stats?.data?.userStatistics?.totalFarmers || 0,
        icon: BriefcaseIcon,
      },
      {
        id: "farms",
        label: "Farms",
        badge: stats?.data?.farmsStatistics?.totalFarms || 0,
        icon: BriefcaseIcon,
      },
    ],
    [stats]
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center text-sm leading-tight">
        <div className="rounded-full px-4 py-1 bg-[#F0EFEC]">
          👍🏾 Welcome Back
        </div>
        <div className="flex">
          <AddFarmerButton />
        </div>
      </div>

      <Overview stats={stats?.data} isFetching={loading} isRefetching={loading} isError={false} />

      <div className="flex justify-items-stretch mt-8 gap-7">
        <div className="flex-1 h-auto">
          <div className="border bg-white rounded-2xl border-[#ECF2F6] p-4 space-y-6">
            <div className="flex justify-between">
              <div className="flex">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.id}
                    title={tab.label}
                    active={activeTab}
                    onClick={() => setActiveTab(tab.label as tabType)}
                    count={tab.badge}
                    className="max-lg:flex-1"
                    icon={tab.icon}
                  />
                ))}
              </div>
              {/* <div>
                <Input
                  placeholder="Search here..."
                  inputClassName="!rounded-[10px]"
                  className="w-[500px] max-lg:w-full"
                  prefix={<SearchIcon className="fill-black" />}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  clearable
                  onClear={() => setSearch("")}
                />
              </div> */}
            </div>

            <EnumeratorFarmersSharedPage
              data={activeTab === "Farmers" ? farmersData : farmsData}
              activeTab={activeTab}
              isError={false}
              loading={fetchingFarmers || fetchingFarms} setPage={setPage} page={page} setSearch={setSearch} search={search} limit={limit} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EnumeratorDashboardSharedPage;
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
import { userAtom } from "@/stores/user";
import { useAtomValue } from "jotai";
import { useGetUsersQuery } from "@/app/_api/user";
import { IUser, UserType } from "@/interface/user";
import MembersTableSkeleton from "@/components/skeletons/table/member";
import useDebounce from "@/hooks/use-debounce";
import columns from "./columns";
import KadaTable from "@/components/common/table";
import FarmersLGAChart from "./lga-chart";
import { useGetAdminOverviewQuery } from "@/app/_api/overview";

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

function AdminDashboardSharedPage() {
  useDashboardTitle("Dashboard");
  const [activeTab, setActiveTab] = useState("Farmer");
  const { user } = useAtomValue(userAtom);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = React.useState("");
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [stats, setStats] = React.useState<{
    totalFarmers: number;
    totalVendors: number;
    totalCooperatives: number;
  }>({
    totalFarmers: 0,
    totalVendors: 0,
    totalCooperatives: 0,
  });
  const [adminStats, setAdminStats] = React.useState<any>(null);
  const [localStats, setLocalStats] = React.useState<any>(null);
  const debouncedSearchQuery = useDebounce(search);

  const userType = React.useMemo(() => {
    return activeTab === "Farmer"
      ? UserType.FARMER
      : activeTab === "Vendor"
      ? UserType.VENDOR
      : UserType.COOPERATIVE;
  }, [activeTab]);

  const { data, isFetching, isLoading, isError } = useGetUsersQuery({
    enabled: loaded,
    params: {
      search: debouncedSearchQuery,
      userType,
      page,
      limit,
    },
  });

  const {
    data: adminData,
    isFetching: isAdminDataFetching,
    isRefetching,
  } = useGetAdminOverviewQuery({
    enabled: loaded,
  });

  React.useEffect(() => {
    if (
      !isAdminDataFetching &&
      !isRefetching &&
      adminData?.success &&
      adminData?.data
    ) {
      setAdminStats(adminData.data?.userStatistics);
      setLocalStats(adminData.data?.userStatisticsByLocal);
    }
  }, [data, isAdminDataFetching, isRefetching]);

  React.useEffect(() => {
    if (data?.data && data.success && !isFetching) {
      const stats = (data.data as unknown as any).stats;

      if (stats) {
        setStats({
          totalFarmers: stats.totalFarmers,
          totalVendors: stats.totalVendors,
          totalCooperatives: stats.totalCooperatives,
        });
      }
    }
  }, [data, isFetching]);

  const tabs = React.useMemo(() => {
    return [
      {
        id: "farmer",
        label: "Farmer",
        badge: stats?.totalFarmers || 0,
        icon: BriefcaseIcon,
      },
      {
        id: "vendor",
        label: "Vendor",
        badge: stats?.totalVendors || 0,
        icon: BriefcaseIcon,
      },
      {
        id: "cooperative",
        label: "Cooperative",
        badge: stats?.totalCooperatives || 0,
        icon: BriefcaseIcon,
      },
    ];
  }, [stats]);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <section className="space-y-8">
        <div className="flex justify-between items-center text-sm leading-tight">
          <div className="rounded-full px-4 py-1 bg-[#F0EFEC]">
            👍🏾 Welcome Back, {user?.firstName}
          </div>

          {/* <div className="flex">
          <KadaButton
            className="rounded-full"
            leftIcon={<PlusIcon className="w-4 h-4 fill-white mr-1" />}
          >
            Add User
          </KadaButton>
        </div> */}
        </div>

        <Overview stats={adminStats} />

        <FarmersLGAChart stats={localStats} />

        <div className="border mt-10 p-4 space-y-4 rounded-2xl bg-white">
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
              inputClassName="rounded-[10px] h-[36px]"
              className="w-full lg:w-[500px]"
              prefix={<SearchIcon className="fill-black" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              clearable
              onClear={() => setSearch("")}
            />
          </div>

          {isFetching || isLoading ? (
            <MembersTableSkeleton />
          ) : isError ? (
            <div className="text-center">An error occurred</div>
          ) : (
            <KadaTable
              data={data?.data?.users || []}
              columns={columns}
              renderActions={(item) => (
                <div className="flex">
                  <button className="text-xs text-blue-600">View</button>
                </div>
              )}
              itemsPerPage={limit}
              totalItems={data?.data?.total || 0}
              page={page}
              onPageChange={(page) => setPage(page)}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default AdminDashboardSharedPage;

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

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center text-sm leading-tight">
        <div className="rounded-full px-4 py-1 bg-[#F0EFEC]">
          👍🏾 Welcome Back, {user?.firstName}
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
          />
        </div>

        {isFetching || isLoading ? (
          <MembersTableSkeleton />
        ) : isError ? (
          <div className="text-center">An error occurred</div>
        ) : (
          <UsersTable users={data?.data?.users || []} type={activeTab} />
        )}
      </div>
    </>
  );
}

export default AdminDashboardSharedPage;

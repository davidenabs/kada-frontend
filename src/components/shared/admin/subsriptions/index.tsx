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
import {
  useGetSubscriptionPlans,
  useGetSubscriptionsQuery,
} from "@/app/_api/subscription";
import CreatePlan from "@/components/modals/admin/subscriptions/create-plan";
import { Dropdown } from "rizzui";
import { EllipsisVerticalIcon, PencilIcon } from "@heroicons/react/24/outline";

function AdminSubsriptionSharedPage() {
  useDashboardTitle("Subscriptions");
  const [activeTab, setActiveTab] = useState("Plans");
  const { user } = useAtomValue(userAtom);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = React.useState("");
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<any | null>(null);
  const debouncedSearchQuery = useDebounce(search);

  const { data, isFetching, isRefetching, isError } = useGetSubscriptionPlans({
    enabled: loaded,
    params: {
      search: debouncedSearchQuery,
      page,
      limit,
    },
  });

  const {
    data: subscriptionData,
    isFetching: isSubscriptionFetching,
    isRefetching: isSubscriptionRefetching,
    isError: isSubscriptionError,
  } = useGetSubscriptionsQuery({
    enabled: loaded,
    params: {
      search: debouncedSearchQuery,
      page,
      limit,
    },
  });

  const tabs = React.useMemo(() => {
    return [
      {
        id: "plans",
        label: "Plans",
        icon: BriefcaseIcon,
      },
      {
        id: "subscriptions",
        label: "Subscriptions",
        icon: BriefcaseIcon,
      },
    ];
  }, []);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {open && (
        <CreatePlan
          open={open}
          close={() => setOpen(false)}
          selected={selected}
        />
      )}

      <div className="">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold text-zinc-700"></h4>

          <KadaButton
            className="rounded-full"
            leftIcon={<PlusIcon className="w-4 h-4 fill-white mr-1" />}
            onClick={() => setOpen(true)}
          >
            Add Plan
          </KadaButton>
        </div>
      </div>
      <div className="border mt-10 p-4 space-y-4 rounded-2xl bg-white">
        <h5 className="font-bold text-lg">
          {activeTab === "Plans" ? "Plans" : "Subscriptions"}
        </h5>

        <div className="flex max-md:flex-col items-center justify-between">
          <div className="flex">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                title={tab.label}
                active={activeTab}
                onClick={() => setActiveTab(tab.label)}
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

        {isFetching || isRefetching ? (
          <MembersTableSkeleton />
        ) : isError ? (
          <div className="text-center">An error occurred</div>
        ) : (
          <KadaTable
            data={data?.data?.items || []}
            columns={columns}
            renderActions={(item) => (
              <div className="ml-4">
                <Dropdown placement="bottom">
                  <Dropdown.Trigger>
                    <EllipsisVerticalIcon className="fill-black h-4 w-4" />
                  </Dropdown.Trigger>
                  <Dropdown.Menu className="divide-y bg-white">
                    <div className={"mb-1"}>
                      <Dropdown.Item
                        className="text-xs"
                        onClick={() => {
                          setSelected(item);
                          setOpen(true);
                        }}
                      >
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Edit
                      </Dropdown.Item>
                    </div>

                    {/* <div className={"mb-1"}>
                      <Dropdown.Item
                        className="text-xs"
                        onClick={() => {
                          setMarket(item);
                          setConfirm(true);
                        }}
                      >
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete
                      </Dropdown.Item>
                    </div> */}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
            itemsPerPage={limit}
            totalItems={data?.data?.total || 0}
            page={page}
            onPageChange={(page) => setPage(page)}
          />
        )}
      </div>
    </>
  );
}

export default AdminSubsriptionSharedPage;

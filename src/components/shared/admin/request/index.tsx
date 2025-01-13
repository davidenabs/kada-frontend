"use client";
import Input from "@/components/form/input";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { SearchIcon } from "@/icons";
import React from "react";
import { useGetRequests, useUpdateRequestMutation } from "@/app/_api/request";
import { IRequest } from "@/interface/request";
import MembersTableSkeleton from "@/components/skeletons/table/member";
import { Dropdown } from "rizzui";
import KadaTable from "@/components/common/table";
import columns from "./columns";
import ConfirmModal from "@/components/modals/confim-modal";
import { toast } from "sonner";
import {
  CheckCircleIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { UserType } from "@/interface/user";
import useDebounce from "@/hooks/use-debounce";
import { useGetUsersQuery } from "@/app/_api/user";
import Tab from "@/components/common/tab";
import { BriefcaseIcon } from "@heroicons/react/16/solid";
import Vendorcolumns from "./vendor-cols";

const tabs = [
  {
    id: "vendors",
    label: "Vendors",
    badge: 0,

    icon: BriefcaseIcon,
  },
  {
    id: "requests",
    label: "Requests",
    badge: 0,
    icon: BriefcaseIcon,
  },
];

function AdminRequestSharedPage() {
  useDashboardTitle("Requests");
  const [loaded, setLoaded] = React.useState(false);
  const [requests, setRequests] = React.useState<IRequest[]>([]);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [confirm, setConfirm] = React.useState(false);
  const [request, setRequest] = React.useState<IRequest | null>(null);
  const [status, setStatus] = React.useState<"approved" | "rejected">(
    "approved"
  );
  const [search, setSearch] = React.useState("");
  const debouncedSearchQuery = useDebounce(search);
  const [activeTab, setActiveTab] = React.useState("Vendors");

  const updateMutation = useUpdateRequestMutation();

  const { data, isFetching, isRefetching, isError } = useGetRequests({
    enabled: loaded, // *Enable the query when the component is loaded
    params: {
      requestType: "VENDOR_LICENSE",
    },
  });

  const {
    data: vendorData,
    isFetching: isFetchingVendor,
    isLoading: isLoadingVendor,
    isError: isErrorVendor,
  } = useGetUsersQuery({
    enabled: loaded,
    params: {
      search: debouncedSearchQuery,
      userType: UserType.VENDOR,
      page,
      limit,
    },
  });

  // *Set requests when data is fetched
  React.useEffect(() => {
    if (data?.data && data.success && !isFetching && !isRefetching) {
      setRequests(data.data.requests);
    }
  }, [data, isFetching, isRefetching]);

  const onConfirm = async () => {
    if (!request) return;
    const payload = {
      data: {
        newStatus: status,
      },
      id: String(request.id),
    };

    updateMutation.mutateAsync(payload, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success(`Request has been successfully ${status}`);
          setConfirm(false);
          setRequest(null);
        }
      },
    });
  };

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {confirm && (
        <ConfirmModal
          open={confirm}
          close={() => setConfirm(false)}
          onConfirm={onConfirm}
          loading={updateMutation.isPending}
        />
      )}
      <section className="space-y-3 border rounded-2xl p-4 bg-white">
        <h4 className="text-sm font-bold text-zinc-700">
          {activeTab === "Vendors" ? "Vendors" : "License Requests"}
        </h4>

        <div className="flex items-center justify-between">
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

        {activeTab === "Vendors" ? (
          <>
            {isFetchingVendor || isLoadingVendor ? (
              <MembersTableSkeleton />
            ) : isError ? (
              <div className="text-center">An error occurred</div>
            ) : (
              <KadaTable
                data={vendorData?.data?.users || []}
                columns={Vendorcolumns}
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
          </>
        ) : (
          <>
            <div className="">
              {isFetching || isRefetching ? (
                <MembersTableSkeleton />
              ) : isError ? (
                <div>Failed to fetch data</div>
              ) : (
                <KadaTable
                  data={data?.data?.requests || []}
                  columns={columns}
                  renderActions={(item) => (
                    <div className="ml-4">
                      <Dropdown placement="bottom">
                        <Dropdown.Trigger>
                          <EllipsisVerticalIcon className="fill-black h-4 w-4" />
                        </Dropdown.Trigger>
                        <Dropdown.Menu className="divide-y bg-white">
                          {item.status === "pending" && (
                            <>
                              <div className={"mb-1"}>
                                <Dropdown.Item
                                  className="text-xs"
                                  onClick={() => {
                                    setRequest(item);
                                    setStatus("approved");
                                    setConfirm(true);
                                  }}
                                >
                                  <CheckCircleIcon className="mr-2 h-4 w-4" />
                                  Accept
                                </Dropdown.Item>
                              </div>
                              <div className="mb-1 pt-1">
                                <Dropdown.Item
                                  className="text-xs"
                                  onClick={() => {
                                    setRequest(item);
                                    setStatus("rejected");
                                    setConfirm(true);
                                  }}
                                >
                                  <NoSymbolIcon className="mr-2 h-4 w-4" />
                                  Reject
                                </Dropdown.Item>
                              </div>
                            </>
                          )}

                          {item.status === "approved" && (
                            <>
                              <div className={"mb-1"}>
                                <Dropdown.Item className="text-xs">
                                  <EyeIcon className="mr-2 h-4 w-4" />
                                  View
                                </Dropdown.Item>
                              </div>
                            </>
                          )}
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
        )}
      </section>
    </>
  );
}

export default AdminRequestSharedPage;

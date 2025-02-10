"use client";
import {
  useGetVendorReviewsQuery,
  useGetZonalOfficerVendorsQuery,
} from "@/app/_api/zonal";
import Tab from "@/components/common/tab";
import KadaTable from "@/components/common/table";
import MembersTableSkeleton from "@/components/skeletons/table/member";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import useDebounce from "@/hooks/use-debounce";
import { BriefcaseIcon } from "@/icons";
import React, { Fragment, useMemo, useState } from "react";
import { Dropdown, Empty } from "rizzui";
import { Columns, requestColumns, Vendorcolumns } from "./column";
import EditReviewModal from "@/components/modals/zonal/edit-review";
import { useGetRequests } from "@/app/_api/request";
import { EllipsisVerticalIcon, PencilIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/16/solid";
import ViewVendor from "@/components/modals/zonal/view-vendor";

function ZonalVendorsSharedPage() {
  useDashboardTitle("Vendors");
  const [activeTab, setActiveTab] = useState("Reviews");
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState<any | null>(null);
  const [view, setView] = useState(false);
  const [vendor, setVendor] = useState<any | null>(null);
  const debouncedSearchQuery = useDebounce(search);

  const { data, isFetching, isRefetching, isError } = useGetVendorReviewsQuery({
    enabled: loaded && activeTab === "Reviews",
    params: {
      page,
      search: debouncedSearchQuery,
      limit,
    },
  });

  const {
    data: vendorData,
    isFetching: vendorIsFetching,
    isRefetching: vendorIsRefetching,
    isError: vendorIsError,
  } = useGetZonalOfficerVendorsQuery({
    enabled: loaded && activeTab === "Members",
    params: {
      page,
      search: debouncedSearchQuery,
      limit,
    },
  });

  const {
    data: requestData,
    isFetching: requestIsFetching,
    isRefetching: requestIsRefetching,
    isError: requestIsError,
  } = useGetRequests({
    enabled: loaded, // *Enable the query when the component is loaded
    params: {
      requestType: "VENDOR_LICENSE",
    },
  });

  const tabs = [
    {
      id: "farmers",
      label: "Reviews",
      icon: BriefcaseIcon,
    },
    {
      id: "farms",
      label: "Members",
      icon: BriefcaseIcon,
    },
    {
      id: "requests",
      label: "Requests",
      icon: BriefcaseIcon,
    },
  ];

  const { tableColumns, tableData } = useMemo(() => {
    switch (activeTab) {
      case "Reviews":
        return {
          tableColumns: Columns,
          tableData: data?.data?.items || [],
        };
      case "Members":
        return {
          tableColumns: Vendorcolumns,
          tableData: vendorData?.data?.users || [],
        };
      case "Requests":
        return {
          tableColumns: requestColumns,
          tableData: requestData?.data?.requests || [],
        };
      default:
        return {
          tableColumns: [],
          tableData: [],
        };
    }
  }, [activeTab, data, vendorData, requestData]);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Fragment>
      {open && (
        <EditReviewModal
          open={open}
          close={() => setOpen(false)}
          review={review}
        />
      )}
      {view && (
        <ViewVendor open={view} close={() => setView(false)} vendor={vendor} />
      )}
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
                    onClick={() => setActiveTab(tab.label)}
                    className="max-lg:flex-1"
                    icon={tab.icon}
                  />
                ))}
              </div>
            </div>

            <div className="">
              <div>
                {isFetching || isRefetching ? (
                  <MembersTableSkeleton />
                ) : isError ? (
                  <div>Failed to fetch data</div>
                ) : data?.data?.length === 0 ? (
                  <Empty />
                ) : (
                  <KadaTable
                    // data={data?.data?.reviews || []}
                    data={tableData || []}
                    columns={tableColumns}
                    renderActions={(item) =>
                      activeTab === "Reviews" ? (
                        <button
                          onClick={() => {
                            // setReview(item);
                            // setOpen(true);
                          }}
                          className="text-primary"
                        >
                          Edit
                        </button>
                      ) : activeTab === "Members" ? (
                        <button
                          onClick={() => {
                            console.log("View");
                          }}
                          className="text-primary"
                        >
                          View
                        </button>
                      ) : (
                        <div className="ml-4">
                          <Dropdown placement="bottom">
                            <Dropdown.Trigger>
                              <EllipsisVerticalIcon className="fill-black h-4 w-4" />
                            </Dropdown.Trigger>
                            <Dropdown.Menu className="divide-y bg-white">
                              <div className="mb-1">
                                <Dropdown.Item
                                  className="text-xs"
                                  onClick={() => {
                                    setVendor((item as any).vendor);
                                    setView(true);
                                  }}
                                >
                                  <EyeIcon className="mr-2 h-4 w-4" />
                                  View
                                </Dropdown.Item>
                              </div>
                              {
                                // *Check if the request is pending
                                (item as any).status !== "approved" && (
                                  <div className="mb-1 pt-1">
                                    <Dropdown.Item
                                      className="text-xs"
                                      onClick={() => {
                                        setReview(item);
                                        setOpen(true);
                                      }}
                                    >
                                      <PencilIcon className="mr-2 h-4 w-4" />
                                      Review
                                    </Dropdown.Item>
                                  </div>
                                )
                              }
                              {/* <div className="mb-1 pt-1">
                                <Dropdown.Item
                                  className="text-xs"
                                  onClick={() => {
                                    setReview(item);
                                    setOpen(true);
                                  }}
                                >
                                  <PencilIcon className="mr-2 h-4 w-4" />
                                  Review
                                </Dropdown.Item>
                              </div> */}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      )
                    }
                    itemsPerPage={limit}
                    totalItems={data?.data?.total || 0}
                    page={page}
                    onPageChange={(page) => setPage(page)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ZonalVendorsSharedPage;

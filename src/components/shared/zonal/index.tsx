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
import { Empty } from "rizzui";
import { Columns } from "./column";
import EditReviewModal from "@/components/modals/zonal/edit-review";

function ZonalVendorsSharedPage() {
  useDashboardTitle("Vendors");
  const [activeTab, setActiveTab] = useState("Reviews");
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState<any | null>(null);
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
  ];

  const { tableColumns, tableData } = useMemo(() => {
    const isReviewTab = activeTab === "Reviews";

    return {
      tableColumns: Columns,
      tableData: isReviewTab ? data?.data?.users : vendorData?.data?.users,
    };
  }, [activeTab, data, vendorData]);

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
                    data={data?.data?.reviews || []}
                    columns={tableColumns}
                    renderActions={(item) => (
                      <div className="flex">
                        <button
                          className="text-xs text-blue-600"
                          //   onClick={() => handleView(item)}
                          onClick={() => {
                            setReview(item);
                            setOpen(true);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    )}
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

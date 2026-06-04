"use client";
import { useGetUsersQuery, useGetCooperativesListQuery } from "@/app/_api/user";
import Tab from "@/components/common/tab";
import KadaTable from "@/components/common/table";
import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import AddUserModal from "@/components/modals/admin/user";
import MembersTableSkeleton from "@/components/skeletons/table/member";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import useDebounce from "@/hooks/use-debounce";
import { BriefcaseIcon, SearchIcon } from "@/icons";
import { UserType } from "@/interface/user";
import { ChevronDownIcon, PlusIcon, ArrowUpTrayIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import React from "react";
import columns from "./columns";
import { Button, Dropdown } from "rizzui";
import BulkUploadDrawer from "@/components/drawers/admin/bulk-upload-users";
import ExportEngineDrawer from "@/components/drawers/admin/export-engine-drawer";
import { UserActions } from "./user-actions";

function AdminUsersSharedPage() {
  useDashboardTitle("Users");
  const [loaded, setLoaded] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [openBulkUpload, setOpenBulkUpload] = React.useState(false);
  const [openExport, setOpenExport] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const debouncedSearchQuery = useDebounce(search);
  const [activeTab, setActiveTab] = React.useState("Farmer");
  const [stats, setStats] = React.useState<{
    totalFarmers: number;
    totalVendors: number;
    totalCooperatives: number;
    totalPartner: number;
    totalZonalHeads: number;
    totalStaff: number;
  }>({
    totalFarmers: 0,
    totalVendors: 0,
    totalCooperatives: 0,
    totalPartner: 0,
    totalZonalHeads: 0,
    totalStaff: 0,
  });

  const userType = React.useMemo(() => {
    return activeTab === "Farmer"
      ? UserType.FARMER
      : activeTab === "Vendor"
      ? UserType.VENDOR
      : activeTab === "Cooperative"
      ? UserType.COOPERATIVE
      : activeTab === "Partner"
      ? UserType.ZONAL
      : activeTab === "Zonal Officer"
      ? UserType.STAFF
      : activeTab === "Staff"
      ? UserType.PARTNER
      : null;
  }, [activeTab]);

  
  const { data, isFetching, isLoading, isError, refetch } = useGetUsersQuery({
    enabled: loaded && activeTab !== "Cooperative",
    params: {
      search: debouncedSearchQuery,
      userType,
      page,
      limit,
    },
  });

  const { data: coopData, isFetching: coopFetching, isLoading: coopLoading, isError: coopError, refetch: coopRefetch } = useGetCooperativesListQuery({
    enabled: loaded && activeTab === "Cooperative",
    params: {
      search: debouncedSearchQuery,
      page,
      limit,
    },
  });

  const currentIsFetching = activeTab === "Cooperative" ? coopFetching : isFetching;
  const currentIsLoading = activeTab === "Cooperative" ? coopLoading : isLoading;
  const currentIsError = activeTab === "Cooperative" ? coopError : isError;
  const currentRefetch = activeTab === "Cooperative" ? coopRefetch : refetch;
  
  // Use data?.data for stats
  const activeDataForStats = data;


  React.useEffect(() => {
    if (activeDataForStats?.data && activeDataForStats.success && !isFetching) {
      const stats = (activeDataForStats.data as unknown as any).stats;

      if (stats) {
        setStats({
          totalFarmers: stats.totalFarmers,
          totalVendors: stats.totalVendors,
          totalCooperatives: stats.totalCooperatives,
          totalPartner: stats.totalPartner,
          totalZonalHeads: stats.totalZonalHeads,
          totalStaff: stats.totalStaff,
        });
      }
    }
  }, [activeDataForStats, isFetching]);

  const userOptions = React.useMemo(() => {
    return [
      {
        value: UserType.FARMER,
        label: "Farmer",
        count: stats?.totalFarmers || 0,
      },
      {
        value: UserType.VENDOR,
        label: "Vendor",
        count: stats?.totalVendors || 0,
      },
      {
        value: UserType.COOPERATIVE,
        label: "Cooperative",
        count: stats?.totalCooperatives || 0,
      },
      {
        value: UserType.PARTNER,
        label: "Partner",
        count: stats?.totalPartner || 0,
      },
      {
        value: UserType.ZONAL,
        label: "Zonal Officer",
        count: stats?.totalZonalHeads || 0,
      },
      {
        value: UserType.STAFF,
        label: "Staff",
        count: stats?.totalStaff || 0,
      },
    ];
  }, [stats]);

  const tableColumns = React.useMemo(() => {
    if (activeTab === "Cooperative") {
      return [
        ...columns,
        {
          label: "Total Farmers",
          key: "totalFarmers",
          render: (item: any) => item?.cooperativeProfile?.totalMembers || 0,
        },
      ];
    }
    return columns;
  }, [activeTab]);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {open && <AddUserModal open={open} close={() => setOpen(false)} />}
      {openBulkUpload && <BulkUploadDrawer open={openBulkUpload} close={() => setOpenBulkUpload(false)} />}
      <ExportEngineDrawer isOpen={openExport} onClose={() => setOpenExport(false)} />

      <section className="space-y-3 border rounded-2xl p-4 bg-white">
        <div className="flex justify-between">
          <h4 className="text-sm font-bold text-zinc-700">Users</h4>
          <div className="flex space-x-2">
            <KadaButton
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              leftIcon={<ArrowDownTrayIcon className="w-4 h-4 mr-1" />}
              onClick={() => setOpenExport(true)}
            >
              Export Data
            </KadaButton>
            <KadaButton
              className="rounded-full bg-green-600 hover:bg-green-700 text-white"
              leftIcon={<ArrowUpTrayIcon className="w-4 h-4 mr-1" />}
              onClick={() => setOpenBulkUpload(true)}
            >
              Bulk Upload
            </KadaButton>
            <KadaButton
              className="rounded-full"
              leftIcon={<PlusIcon className="w-4 h-4 fill-white mr-1" />}
              onClick={() => setOpen(true)}
            >
              Add User
            </KadaButton>
          </div>
        </div>

        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex">
              <Dropdown>
                <Dropdown.Trigger>
                  <Button as="span" variant="outline">
                    {activeTab} <ChevronDownIcon className="ml-2 w-5" />
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Menu className={"w-48 bg-white"}>
                  {userOptions.map((option) => (
                    <Dropdown.Item
                      key={option.value}
                      onClick={() => setActiveTab(option.label)}
                      disabled={option.value === userType || isLoading}
                    >
                      {option.label} ({option.count})
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
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
        </div>

        <div className={`transition-opacity duration-200 ${currentIsFetching ? "opacity-60 pointer-events-none" : "opacity-100"}`}>
          {currentIsLoading ? (
            <MembersTableSkeleton />
          ) : currentIsError ? (
            <div className="text-center">An error occurred</div>
          ) : (
            <KadaTable
              data={(activeTab === "Cooperative" ? coopData?.data?.data : data?.data?.users) || []}
              columns={tableColumns as any}
              renderActions={(item) => (
                <UserActions 
                  user={item} 
                  onRefresh={() => currentRefetch()} 
                />
              )}
              itemsPerPage={limit}
              totalItems={(activeTab === "Cooperative" ? coopData?.data?.meta?.total : data?.data?.total) || 0}
              page={page}
              onPageChange={(page) => setPage(page)}
              onLimitChange={(newLimit) => setLimit(newLimit)}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default AdminUsersSharedPage;

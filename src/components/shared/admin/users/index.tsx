"use client";
import { useGetUsersQuery } from "@/app/_api/user";
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
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import columns from "./columns";
import { Button, Dropdown } from "rizzui";

function AdminUsersSharedPage() {
  useDashboardTitle("Users");
  const [loaded, setLoaded] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
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
    if (data?.data && data.success && !isFetching) {
      const stats = (data.data as unknown as any).stats;

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
  }, [data, isFetching]);

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

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {open && <AddUserModal open={open} close={() => setOpen(false)} />}

      <section className="space-y-3 border rounded-2xl p-4 bg-white">
        <div className="flex justify-between">
          <h4 className="text-sm font-bold text-zinc-700">Users</h4>
          <div className="">
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

        <div className="">
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

export default AdminUsersSharedPage;

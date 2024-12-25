"use client";
import Input from "@/components/form/input";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { SearchIcon } from "@/icons";
import React from "react";
import useDebounce from "@/hooks/use-debounce";
import { UserType } from "@/interface/user";
import { useGetUsersQuery } from "@/app/_api/user";
import MembersTableSkeleton from "@/components/skeletons/table/member";
import { Empty } from "rizzui";
import KadaTable from "@/components/common/table";
import columns from "../farmers/columns";

function AdminCooperativesSharedPage() {
  useDashboardTitle("Cooperatives");
  const [loaded, setLoaded] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const debouncedSearchQuery = useDebounce(search);

  const { data, isFetching, isLoading, isError } = useGetUsersQuery({
    enabled: loaded,
    params: {
      search: debouncedSearchQuery,
      userType: UserType.COOPERATIVE,
      page,
      limit,
    },
  });

  React.useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
      <section className="space-y-3 border rounded-2xl p-4 bg-white">
        <h4 className="text-sm font-bold text-zinc-700">Cooperatives</h4>

        <div className="">
          <Input
            placeholder="Search here..."
            inputClassName="!rounded-[10px] !h-[36px]"
            className="w-full lg:w-[500px]"
            prefix={<SearchIcon className="fill-black" />}
            clearable
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
          />
        </div>

        <div className="">
          {isFetching || isLoading ? (
            <MembersTableSkeleton />
          ) : isError ? (
            <div>Failed to fetch data</div>
          ) : data?.data?.users?.length === 0 ? (
            <Empty />
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

export default AdminCooperativesSharedPage;

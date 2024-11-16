"use client";
import { useGetCmsPostsQuery } from "@/app/_api/cms";
import KadaTable from "@/components/common/table";
import { KadaButton } from "@/components/form/button";
import PostOpportunityModal from "@/components/modals/admin/opportunities";
import MembersTableSkeleton from "@/components/skeletons/table/member";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import useDebounce from "@/hooks/use-debounce";
import { useModal } from "@/hooks/use-modal";
import { SearchIcon } from "@/icons";
import { PlusIcon } from "@heroicons/react/16/solid";
import React, { Fragment } from "react";
import { Empty, Input } from "rizzui";
import columns from "./columns";

function AdminOpportunitiesPage() {
  useDashboardTitle("Cooperatives");
  const [loaded, setLoaded] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const debouncedSearchQuery = useDebounce(search);
  const { openModal, closeModal } = useModal();

  const { data, isFetching, isLoading, isError } = useGetCmsPostsQuery({
    enabled: loaded,
    params: {
      search: debouncedSearchQuery,
      page,
      limit,
    },
  });

  const handleAddProductService = () => {
    openModal({
      view: <PostOpportunityModal close={closeModal} />,
      customSize: "500px",
    });
  };

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <Fragment>
      <section className="space-y-3">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold text-zinc-700">
            Manage Opportunities
          </h4>

          <KadaButton
            className="rounded-full"
            leftIcon={<PlusIcon className="w-4 h-4 fill-white mr-1" />}
            onClick={handleAddProductService}
          >
            Post Opportunity
          </KadaButton>
        </div>

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
          ) : data?.data?.posts?.length === 0 ? (
            <Empty />
          ) : (
            <KadaTable
              data={data?.data?.posts || []}
              columns={columns}
              renderActions={(item) => (
                <div className="flex items-center">
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
    </Fragment>
  );
}

export default AdminOpportunitiesPage;

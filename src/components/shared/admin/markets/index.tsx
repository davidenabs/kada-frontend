"use client";
import { useDeleteMarketMutation, useGetMarketsQuery } from "@/app/_api/market";
import KadaTable from "@/components/common/table";
import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import AddMarketModal from "@/components/modals/admin/market";
import MembersTableSkeleton from "@/components/skeletons/table/member";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import useDebounce from "@/hooks/use-debounce";
import { SearchIcon } from "@/icons";
import { IMarket } from "@/interface/market";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { Fragment } from "react";
import { Dropdown, Empty } from "rizzui";
import columns from "./columns";
import ConfirmModal from "@/components/modals/confim-modal";
import { toast } from "sonner";

function MarketsPages() {
  useDashboardTitle("Markets");
  const [loaded, setLoaded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [market, setMarket] = React.useState<IMarket | null>(null);
  const [search, setSearch] = React.useState("");
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const debouncedSearchQuery = useDebounce(search);

  const { data, isFetching, isLoading, isError } = useGetMarketsQuery({
    enabled: loaded,
    params: {
      search: debouncedSearchQuery,
      page,
      limit,
    },
  });
  const deleteMutation = useDeleteMarketMutation();

  const handleDelete = async () => {
    if (!market) return;
    await deleteMutation.mutateAsync(market.id.toString(), {
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Market deleted successfully");
        }
      },
      onSettled: () => {
        setMarket(null);
        setConfirm(false);
      },
    });
  };

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Fragment>
      {open && (
        <AddMarketModal
          open={open}
          market={market}
          close={() => {
            setOpen(false);
            setMarket(null);
          }}
        />
      )}

      {confirm && (
        <ConfirmModal
          open={confirm}
          close={() => {
            setConfirm(false);
            setMarket(null);
          }}
          loading={deleteMutation.isPending}
          onConfirm={handleDelete}
        />
      )}
      <section className="space-y-3">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold text-zinc-700">Markets</h4>

          <KadaButton
            className="rounded-full"
            leftIcon={<PlusIcon className="w-4 h-4 fill-white mr-1" />}
            onClick={() => setOpen(true)}
          >
            Add Market
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
          ) : data?.data?.markets?.length === 0 ? (
            <Empty text="No data found" />
          ) : (
            <>
              <KadaTable
                data={data?.data?.markets || []}
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
                              setMarket(item);
                              setOpen(true);
                            }}
                          >
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit
                          </Dropdown.Item>
                        </div>

                        <div className={"mb-1"}>
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
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
                itemsPerPage={limit}
                totalItems={data?.data?.total || 0}
                page={page}
                onPageChange={(page) => setPage(page)}
              />
            </>
          )}
        </div>
      </section>
    </Fragment>
  );
}

export default MarketsPages;

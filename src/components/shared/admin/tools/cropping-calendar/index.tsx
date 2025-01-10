"use client";
import {
  useDeleteFarmProductMutation,
  useGetFarmProductsQuery,
} from "@/app/_api/farm-products";
import Breadcrumb from "@/components/common/breadcrumb";
import KadaTable from "@/components/common/table";
import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import MembersTableSkeleton from "@/components/skeletons/table/member";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import useDebounce from "@/hooks/use-debounce";
import { SearchIcon } from "@/icons";
import React, { Fragment } from "react";
import columns from "./columns";
import {
  EyeIcon,
  InformationCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import CreateCroppingInfoModal from "@/components/modals/admin/cropping";
import { Dropdown } from "rizzui";
import ConfirmModal from "@/components/modals/confim-modal";
import ViewCroppingInfoModal from "@/components/modals/admin/cropping/view-modal";
import { useModal } from "@/hooks/use-modal";
import PersonalizedCropping from "@/components/modals/farmer/croppping/personalized";

function CroppingCalendarPage() {
  useDashboardTitle("Tools");
  const [loaded, setLoaded] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const debouncedSearchQuery = useDebounce(search);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<any | null>(null);
  const [confirm, setConfirm] = React.useState(false);
  const [view, setView] = React.useState(false);

  const { data, isFetching, isRefetching, isError } = useGetFarmProductsQuery({
    enabled: loaded,
    params: {
      page,
      limit,
      search: debouncedSearchQuery,
    },
  });

  const { mutateAsync, isPending } = useDeleteFarmProductMutation();

  const toggleModal = () => setOpen(!open);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  const handleAccept = () => {
    if (isPending) return;

    mutateAsync(selected.id, {
      onSuccess: (response) => {
        if (response.success) {
          setConfirm(false);
        }
      },
      onSettled: () => {
        setConfirm(false);
      },
    });
  };

  return (
    <Fragment>
      {open && (
        <CreateCroppingInfoModal
          open={open}
          selected={selected}
          close={() => {
            toggleModal();
            setSelected(null);
          }}
        />
      )}
      {confirm && (
        <ConfirmModal
          open={confirm}
          close={() => setConfirm(false)}
          loading={isPending}
          onConfirm={() => {
            handleAccept();
          }}
        />
      )}
      {view && (
        <ViewCroppingInfoModal
          open={view}
          selected={selected}
          close={() => {
            setView(false);
            setSelected(null);
          }}
        />
      )}
      <section className="space-y-3">
        <Breadcrumb
          className="mb-4"
          items={[
            { label: "Tools", link: "/admin/tools" },
            { label: "Cropping Calendar" },
          ]}
        />

        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold text-zinc-700">
            Manage Opportunities
          </h4>

          <KadaButton
            className="rounded-full"
            leftIcon={<PlusIcon className="w-4 h-4 fill-white mr-1" />}
            onClick={toggleModal}
          >
            Add Crop Infomation
          </KadaButton>
        </div>

        <div className="flex gap-8">
          <div className="flex-1 rounded-lg bg-white p-4">
            <div className="mb-3">
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
              {isFetching || isRefetching ? (
                <MembersTableSkeleton />
              ) : isError ? (
                <div>Failed to fetch data</div>
              ) : (
                <KadaTable
                  data={data?.data?.items || []}
                  columns={columns}
                  renderActions={(item) => (
                    <div className="ml-4">
                      <Dropdown placement="bottom">
                        <Dropdown.Trigger>
                          <InformationCircleIcon className="fill-black h-4 w-4" />
                        </Dropdown.Trigger>
                        <Dropdown.Menu className="divide-y bg-white">
                          <div className="mb-1">
                            <Dropdown.Item
                              className="text-xs"
                              onClick={() => {
                                setSelected(item);
                                toggleModal();
                              }}
                            >
                              <PencilIcon className="mr-2 h-4 w-4" />
                              Edit
                            </Dropdown.Item>
                          </div>
                          <div className="mb-1 pt-1">
                            <Dropdown.Item
                              className="text-xs"
                              onClick={() => {
                                setSelected(item);
                                setView(true);
                              }}
                            >
                              <EyeIcon className="mr-2 h-4 w-4" />
                              View
                            </Dropdown.Item>
                          </div>
                          <div className="mt-1 pt-1">
                            <Dropdown.Item
                              className="text-xs"
                              onClick={() => {
                                setSelected(item);
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
              )}
            </div>
          </div>

          <div className="w-[275px] h-full max-lg:hidden">
            <div className="relative rounded-xl bg-[url('/images/vendor-banner.png')] bg-center bg-cover bg-no-repeat h-full overflow-hidden z-10 p-6 flex flex-col justify-between">
              <div className="absolute inset-0 bg-custom-gradient z-[-1]"></div>
              <h4 className="text-2xl font-bold text-white text-center">
                Increase your sales expand your market, and increase sales
                <br />
                <br />
                with Kada
              </h4>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default CroppingCalendarPage;

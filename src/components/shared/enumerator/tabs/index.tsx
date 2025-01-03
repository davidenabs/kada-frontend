"use client";
import Input from "@/components/form/input";
import { SearchIcon } from "@/icons";
import React, { useMemo } from "react";
import KadaTable from "@/components/common/table";
import MembersTableSkeleton from "@/components/skeletons/table/member";
import { Empty } from "rizzui";
import { farmColumns, farmersColumns } from "./columns";
import { useModal } from "@/hooks/use-modal";
import ViewFarmerFarmModal from "@/components/modals/enumerator/view-farmer-farm";

type EnumeratorFarmersSharedPageProps = {
  data: any;
  activeTab: "Farmers" | "Farms";
  loading?: boolean;
  isError?: boolean;
  setPage: (page: number) => void;
  page: number;
  setSearch: (query: string) => void;
  search: string;
  limit: number;
};

function EnumeratorFarmersSharedPage({
  data,
  activeTab,
  loading = false,
  isError = false,
  setPage,
  page,
  setSearch,
  search,
  limit
}: EnumeratorFarmersSharedPageProps) {

  const { openModal, closeModal } = useModal();

  const handleView = (item: any) => {
    openModal({
      view: <ViewFarmerFarmModal close={closeModal} item={item} activeTab={activeTab} />,
      customSize: activeTab === "Farms" ? "500px" : "500px",
    });
  };

  const { columns, tableData } = useMemo(() => {
    const isFarmersTab = activeTab === "Farmers";
    
    return {
      columns: isFarmersTab ? farmersColumns : farmColumns,
      tableData: isFarmersTab ? data?.data?.users : data?.data?.farms,
    };
  }, [activeTab, data]);

  return (
    <>
      <section className="space-y-3 border rounded-2xl p-4 bg-white">
        <h4 className="text-sm font-bold text-zinc-700">
          {activeTab === "Farmers" ? "Farmers" : "Farms"}
        </h4>

        <div>
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

        <div>
          {loading ? (
            <MembersTableSkeleton />
          ) : isError ? (
            <div>Failed to fetch data</div>
          ) : data?.data?.length === 0 ? (
            <Empty />
          ) : (
            <KadaTable
              data={tableData || []}
              columns={columns as any}
              renderActions={(item) => (
                <div className="flex">
                  <button className="text-xs text-blue-600" onClick={() => handleView(item)}>view</button>
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

export default EnumeratorFarmersSharedPage;
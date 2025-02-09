"use client";
import { useGetCmsPostsQuery } from "@/app/_api/cms";
import KadaTable from "@/components/common/table";
import { KadaButton } from "@/components/form/button";
import PostOpportunityModal from "@/components/modals/admin/opportunities";
import MembersTableSkeleton from "@/components/skeletons/table/member";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import useDebounce from "@/hooks/use-debounce";
import { useModal } from "@/hooks/use-modal";
import { BriefcaseIcon, SearchIcon, VerifiedIcon } from "@/icons";
import { PlusIcon } from "@heroicons/react/16/solid";
import React, { Fragment } from "react";
import { Empty, Input } from "rizzui";
import columns from "./columns";
import ExploreOpportunityDraewr from "@/components/drawers/cooperative/explore-opportunity";
import { IPost } from "@/interface/cms";
import Tab from "@/components/common/tab";
import AdminExploreOpportunityDrawer from "@/components/drawers/admin/explore-opportunity";

function AdminOpportunitiesPage() {
  useDashboardTitle("Opportunities");
  const [open, setOpen] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const debouncedSearchQuery = useDebounce(search);
  const { openModal, closeModal } = useModal();
  const [post, setPost] = React.useState<IPost | null>(null);
  const [stats, setStats] = React.useState<{
    verifiedPosts: number;
    unverifiedPosts: number;
  }>({
    verifiedPosts: 0,
    unverifiedPosts: 0,
  });
  const [activeTab, setActiveTab] = React.useState("Pending");

  const filter = React.useMemo(() => {
    return activeTab === "Pending"
      ? "pending"
      : activeTab === "Active"
      ? "active"
      : "pending";
  }, [activeTab]);

  const { data, isFetching, isLoading, isError } = useGetCmsPostsQuery({
    enabled: loaded,
    params: {
      search: debouncedSearchQuery,
      filter,
      page,
      limit,
    },
  });

  const handleAddProductService = () => {
    openModal({
      view: <PostOpportunityModal close={closeModal} />,
      size: "lg",
    });
  };

  React.useEffect(() => {
    if (data?.data && data.success && !isFetching) {
      const stats = (data.data as unknown as any).stats;

      if (stats) {
        setStats({
          verifiedPosts: stats.verifiedPosts,
          unverifiedPosts: stats.unverifiedPosts,
        });
      }
    }
  }, [data, isFetching]);

  const tabs = React.useMemo(() => {
    return [
      {
        id: "pending",
        label: "Pending",
        badge: stats?.unverifiedPosts || 0,
        icon: BriefcaseIcon,
      },
      {
        id: "active",
        label: "Active",
        badge: stats?.verifiedPosts || 0,
        icon: VerifiedIcon,
      },
    ];
  }, [stats]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <Fragment>
      {open && (
        <AdminExploreOpportunityDrawer
          close={toggleDrawer}
          open={open}
          data={post}
        />
      )}
      <section className="space-y-3">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold text-zinc-700">
            Manage Opportunities
          </h4>

          {/* <KadaButton
            className="rounded-full"
            leftIcon={<PlusIcon className="w-4 h-4 fill-white mr-1" />}
            onClick={handleAddProductService}
          >
            Post Opportunity
          </KadaButton> */}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                title={tab.label}
                active={activeTab}
                onClick={() => setActiveTab(tab.label)}
                count={Number(tab.badge)}
                className="max-lg:flex-1"
                icon={tab.icon}
              />
            ))}
          </div>
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

        {/* <div className="">
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
        </div> */}

        <div className="">
          {isFetching || isLoading ? (
            <MembersTableSkeleton />
          ) : isError ? (
            <div>Failed to fetch data</div>
          ) : data?.data?.posts?.length === 0 ? (
            <Empty text="No data found" />
          ) : (
            <KadaTable
              data={data?.data?.posts || []}
              columns={columns}
              renderActions={(item) => (
                <div className="flex items-center">
                  <button
                    className="text-xs text-blue-600"
                    onClick={() => {
                      setPost(item);
                      toggleDrawer();
                    }}
                  >
                    View
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
      </section>
    </Fragment>
  );
}

export default AdminOpportunitiesPage;

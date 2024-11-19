"use client";
import React, { Fragment } from "react";
import OpportunitiesCard from "@/components/common/opportunities-card";
import ExploreOpportunityDraewr from "@/components/drawers/cooperative/explore-opportunity";
import { useDrawer } from "@/hooks/use-drawer";
import Input from "@/components/form/input";
import { SearchIcon } from "@/icons";
import { Empty, Popover } from "rizzui";
import { KadaButton } from "@/components/form/button";
import { useGetCmsPostsQuery } from "@/app/_api/cms";
import { IPost } from "@/interface/cms";
import OpportunitySkeleton from "@/components/skeletons/opportunity";

function VendorOpportunitiesServicePage() {
  const [loaded, setLoaded] = React.useState(false);
  const [opportunities, setOpportunities] = React.useState<IPost[]>([]);
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState<IPost | null>(null);

  const { data, isFetching, isRefetching, isError } = useGetCmsPostsQuery({
    enabled: loaded,
  });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (!isFetching && !isRefetching && data?.success && data?.data) {
      setOpportunities(data.data.posts);
    }
  }, [data, isFetching, isRefetching]);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Fragment>
      {open && (
        <ExploreOpportunityDraewr
          close={toggleDrawer}
          open={open}
          data={post}
        />
      )}

      <section className="space-y-4">
        <h4 className="text-2xl font-bold">
          Opportunities ({opportunities.length})
        </h4>
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search here..."
              inputClassName="!rounded-[10px] !h-[36px]"
              className=""
              prefix={<SearchIcon className="fill-black" />}
            />
          </div>

          {/* <div className="">
            <Popover shadow="sm" placement="bottom-end">
              <Popover.Trigger>
                <KadaButton className="" variant="outline">
                  Filter
                </KadaButton>
              </Popover.Trigger>
              <Popover.Content className="z-0">
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-4">Action</div>
                  </div>
                </>
              </Popover.Content>
            </Popover>
          </div> */}
        </div>

        <div className="">
          {isFetching || isRefetching ? (
            <OpportunitySkeleton />
          ) : isError ? (
            <div className="">An error occurred, please try again</div>
          ) : data?.data?.posts?.length === 0 ? (
            <Empty className="" text="No opportunities available" />
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {opportunities.map((opportunity) => (
                <OpportunitiesCard
                  data={opportunity}
                  onClick={() => {
                    setPost(opportunity);
                    toggleDrawer();
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
}

export default VendorOpportunitiesServicePage;

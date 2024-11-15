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
  const { closeDrawer, openDrawer } = useDrawer();

  const { data, isFetching, isRefetching, isError } = useGetCmsPostsQuery({
    enabled: loaded,
  });

  const handleClick = () => {
    openDrawer({
      view: <ExploreOpportunityDraewr close={closeDrawer} />,
      placement: "right",
      size: "lg",
      conatainerClassName: "rounded-l-xl",
    });
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
              prefix={<SearchIcon />}
            />
          </div>

          <div className="">
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
          </div>
        </div>

        <div className="">
          {isFetching || isRefetching ? (
            <OpportunitySkeleton />
          ) : isError ? (
            <div className="">error...</div>
          ) : data?.data?.posts?.length === 0 ? (
            <Empty className="" text="No opportunities available" />
          ) : (
            <div className="grid grid-cols-3">
              {opportunities.map((opportunity) => (
                <OpportunitiesCard
                  image="/images/bdo.png"
                  title="United Nation’s Food Programme 2024"
                  description="Share an exciting opportunity with your network"
                  posted="2days"
                  onClick={handleClick}
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

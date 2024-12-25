"use client";
import { useGetCmsPostsQuery } from "@/app/_api/cms";
import OpportunitiesCard from "@/components/common/opportunities-card";
import ExploreOpportunityDraewr from "@/components/drawers/cooperative/explore-opportunity";
import OpportunitySkeleton from "@/components/skeletons/opportunity";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { IPost } from "@/interface/cms";
import React, { Fragment } from "react";
import { Empty } from "rizzui";

function CooperativeOpportunitiesSharedPage() {
  useDashboardTitle("Opportunities");
  const [open, setOpen] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [opportunities, setOpportunities] = React.useState<IPost[]>([]);
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
      {/* <div className="grid grid-cols-3">
        <div className="border border-[#F1F1F1] rounded-2xl bg-[#F8F8F9] p-4">
          <div className="relative w-full h-[152px] rounded-[10px] overflow-hidden">
            <Image
              src={"/images/bdo.png"}
              fill
              className="object-cover"
              alt="Funding Opportunities for Farmers!"
            />
          </div>

          <h4 className="text-sm font-bold mt-3">
            United Nation’s Food Programme 2024{" "}
          </h4>
          <p className="text-[#676E77] text-xs mt-2">
            Share an exciting opportunity with your network
          </p>

          <p className="text-xs text-[#676E77] mt-3">Posted 2days ago</p>

          <KadaButton
            className="w-full rounded-full mt-4"
            rightIcon={<ArrowRightIcon className="w-4 h-4 ml-2" />}
            onClick={() => toggleDrawer()}
          >
            Apply Now
          </KadaButton>
        </div>
      </div> */}

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
    </Fragment>
  );
}

export default CooperativeOpportunitiesSharedPage;

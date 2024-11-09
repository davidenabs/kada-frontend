"use client";
import { useGetFarmsQuerry } from "@/app/_api/farm";
import { withAuth } from "@/components/common/auth";
import FarmCard from "@/components/common/cards/farm-caard";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { UserType } from "@/interface/user";
import React, { Fragment } from "react";

function FarmerFarmsSharedPage() {
  useDashboardTitle("Farms");
  const [loaded, setLoaded] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  const { data, isLoading } = useGetFarmsQuerry({
    enabled: loaded,
    params: {
      page,
      limit,
    },
  });

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Fragment>
      <section className="bg-white rounded-3xl border border-solid border-teal-700 border-opacity-30 px-8 py-8">
        <div className="">
          {isLoading ? (
            <div className="flex items-center justify-center order border border-teal-700 border-opacity-30 bg-white rounded-3xl py-10">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-700"></div>
              </div>
            </div>
          ) : data?.data?.total === 0 ? (
            <div className="flex items-center justify-center order border border-teal-700 border-opacity-30 bg-white rounded-3xl py-10">
              <p className="text-lg font-bold text-teal-700">No farm found</p>
            </div>
          ) : (
            <>
              <section className="grid grid-cols-4 gap-8 h-[800px] max-h-[800px] overflow-y-scroll">
                {data?.data?.farms.map((farm, index) => (
                  <FarmCard key={index + "farm listsss"} {...farm} />
                ))}
              </section>
            </>
          )}
        </div>
      </section>
    </Fragment>
  );
}

export default withAuth(FarmerFarmsSharedPage, {
  allowedUserTypes: [UserType.FARMER],
});

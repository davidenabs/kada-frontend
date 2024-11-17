"use client";
import { useGetUsersQuery } from "@/app/_api/user";
import Catalog from "@/components/common/catalog";
import VendorCard from "@/components/common/vendor-card";
import Input from "@/components/form/input";
import VendorCardSkeleton from "@/components/skeletons/vendor-card";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { SearchIcon } from "@/icons";
import { UserType } from "@/interface/user";
import React from "react";
import { Empty } from "rizzui";

function FarmerVendorsSharedPage() {
  useDashboardTitle("Vendors");
  const { data, isFetching, isRefetching } = useGetUsersQuery({
    params: {
      userType: UserType.VENDOR,
    },
  });

  return (
    <section className="flex gap-4">
      <div className="flex-1">
        <h4 className="text-2xl font-inter font-bold">Explore Vendors</h4>

        <div className="">
          <Input
            placeholder="Search here..."
            inputClassName="!rounded-[10px]"
            className="!w-[500px]"
            prefix={<SearchIcon className="fill-black" />}
          />
        </div>

        <div className="border border-[#DFDFDF] p-6 bg-white rounded-2xl mt-4">
          {/* <div className="grid grid-cols-5">
            <VendorCard />
          </div> */}

          {isFetching || isRefetching ? (
            <div className="grid grid-cols-5">
              <VendorCardSkeleton />
              <VendorCardSkeleton />
            </div>
          ) : data?.data?.total === 0 ? (
            <>
              <Empty text="No Vendor Data" />
            </>
          ) : (
            <>
              <div className="grid grid-cols-5">
                {data?.data?.users.map((user) => (
                  <VendorCard
                  // closeModal={closeModal}
                  // openModal={openModal}
                  // router={router}
                  // key={user.id}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-[390px] space-y-6 divide-y">
        <div className="">
          <h4 className="text-lg font-inter font-bold">Popular Services</h4>

          <div className="space-y-4 mt-6">
            <Catalog
              type="services"
              image="/images/bdo.png"
              name="HarvestPeak Fertilizers"
              price="10,000"
              description="Lorem ipsum dolor"
            />
          </div>
        </div>

        <div className="">
          <h4 className="text-lg font-inter font-bold mt-4">
            Popular Products
          </h4>

          <div className="space-y-4 mt-6">
            <Catalog
              type="products"
              image="/images/bdo.png"
              name="HarvestPeak Fertilizers"
              price="10,000"
              description="Lorem ipsum dolor"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FarmerVendorsSharedPage;

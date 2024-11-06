"use client";
import React from "react";
import Input from "@/components/form/input";
import { SearchIcon } from "@/icons";
import VendorCard from "@/components/common/vendor-card";
import Catalog from "@/components/common/catalog";

function CooperativeVendorsSharedPage() {
  return (
    <section className="flex gap-5 min-h-[calc(100vh-70px)]">
      <div className="flex-1 space-y-4">
        <h4 className="text-2xl font-inter font-bold">Explore Vendors</h4>

        <div className="">
          <Input
            placeholder="Search here..."
            inputClassName="!rounded-[10px]"
            className="!w-[500px]"
            prefix={<SearchIcon />}
          />
        </div>

        <div className="border border-[#DFDFDF] p-6 bg-white rounded-2xl">
          <div className="grid grid-cols-5">
            <VendorCard />
          </div>
        </div>
      </div>

      <div className="w-[390px] space-y-6 divide-y bg-white border-l border-[#F2F4F8] ">
        <div className="px-4">
          <h4 className="text-lg font-inter font-bold">Popular Services</h4>

          <div className="space-y-4 mt-6">
            <Catalog
              type="service"
              image="/images/bdo.png"
              name="HarvestPeak Fertilizers"
              price="10,000"
            />
          </div>
        </div>

        <div className="px-4">
          <h4 className="text-lg font-inter font-bold mt-4">
            Popular Products
          </h4>

          <div className="space-y-4 mt-6">
            <Catalog
              type="product"
              image="/images/bdo.png"
              name="HarvestPeak Fertilizers"
              price="10,000"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CooperativeVendorsSharedPage;

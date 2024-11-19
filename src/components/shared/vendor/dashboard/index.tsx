"use client";
import React, { useState } from "react";
import Overview from "./overview";
import { BriefcaseIcon, SearchIcon } from "@/icons";
import Tab from "@/components/common/tab";
import Input from "@/components/form/input";
import Services from "../../farmer/vendors/service/services";
import Products from "../../farmer/vendors/service/products";
import AddProductServiceButton from "../add-button";
import { useGetProducts } from "@/app/_api/catalog";
import { Empty } from "rizzui";
import { ICatalog } from "@/interface/catalog";
import CatalogSkeleton from "@/components/skeletons/catalog";

function VendorDashboardSharedPage() {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("Our Services");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState<ICatalog[]>([]);
  const { data, isFetching, isRefetching, isError } = useGetProducts({
    enabled: loaded,
    params: {
      page,
      search,
      limit,
    },
  });

  const active = React.useMemo(() => {
    return activeTab === "Our Services" ? "services" : "products";
  }, [activeTab]);

  React.useEffect(() => {
    if (!isFetching && !isRefetching && data?.success && data?.data) {
      setProducts(data.data.products);
    }
  }, [data, isFetching, isRefetching]);

  const tabs = [
    {
      id: "our-services",
      label: "Our Services",
      badge: 3,
      icon: BriefcaseIcon,
    },
    {
      id: "products",
      label: "Products",
      badge: 0,
      icon: BriefcaseIcon,
    },
  ];

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center text-sm leading-tight">
        <div className="rounded-full px-4 py-1 bg-[#F0EFEC]">
          👍🏾 Welcome Back, Agrogrid Cooperative
        </div>

        <div className="flex">
          <AddProductServiceButton />
        </div>
      </div>

      <Overview />

      <div className="flex justify-items-stretch mt-8 gap-7">
        <div className="flex-1 h-auto">
          <div className="border bg-white rounded-2xl border-[#ECF2F6] p-4 space-y-6">
            <div className="flex justify-between">
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

              <div className="">
                <Input
                  placeholder="Search here..."
                  inputClassName="!rounded-[10px]"
                  className="w-[500px] max-lg:w-full"
                  prefix={<SearchIcon className="fill-black" />}
                />
              </div>
            </div>

            {isFetching || isRefetching ? (
              <CatalogSkeleton />
            ) : isError ? (
              <div className="">error...</div>
            ) : data?.data?.products?.length === 0 ? (
              <Empty className="" text="No product available" />
            ) : (
              <Services products={products} activeTab={active} />
            )}
          </div>
        </div>

        <div className="w-[275px] h-[444px] max-lg:hidden">
          <div className="relative rounded-xl bg-[url('/images/vendor-banner.png')] bg-center bg-cover bg-no-repeat h-full overflow-hidden z-10 p-6 flex flex-col justify-between">
            <div className="absolute inset-0 bg-custom-gradient z-[-1]"></div>
            <h4 className="text-2xl font-bold text-white text-center">
              Increase your sales expand your market, and increase sales
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorDashboardSharedPage;

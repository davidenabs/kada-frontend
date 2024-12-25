"use client";
import React, { Fragment } from "react";
import AddProductServiceButton from "../add-button";
import { BriefcaseIcon } from "@heroicons/react/16/solid";
import Tab from "@/components/common/tab";
import Input from "@/components/form/input";
import { SearchIcon } from "@/icons";
import Services from "../../farmer/vendors/service/services";
import { ICatalog } from "@/interface/catalog";
import { useGetProducts } from "@/app/_api/catalog";
import useDebounce from "@/hooks/use-debounce";

function VendorProductServiceSharedPage() {
  const [loaded, setLoaded] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Our Services");
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const debouncedSearchQuery = useDebounce(search);
  const [limit, setLimit] = React.useState(10);
  const [products, setProducts] = React.useState<ICatalog[]>([]);
  const [stats, setStats] = React.useState<any>({});

  const active = React.useMemo(() => {
    return activeTab === "Our Services" ? "services" : "products";
  }, [activeTab]);

  const { data, isFetching, isRefetching, isError } = useGetProducts({
    enabled: loaded,
    params: {
      page,
      search: debouncedSearchQuery,
      type: active,
      limit,
    },
  });

  React.useEffect(() => {
    if (!isFetching && !isRefetching && data?.success && data?.data) {
      setProducts(data.data.products);
      setStats((data.data as any).stats);
    }
  }, [data, isFetching, isRefetching]);

  const tabs = React.useMemo(
    () => [
      {
        id: "our-services",
        label: "Our Services",
        badge: stats?.totalServices || 0,
        icon: BriefcaseIcon,
      },
      {
        id: "products",
        label: "Products",
        badge: stats?.totalProducts || 0,
        icon: BriefcaseIcon,
      },
    ],
    [stats]
  );

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Fragment>
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-2xl font-bold">Available Services/Products</h4>
          <AddProductServiceButton />
        </div>

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
                  type="search"
                  placeholder="Search here..."
                  inputClassName="rounded-[10px]"
                  className="w-[500px] max-lg:w-full"
                  prefix={<SearchIcon className="fill-black" />}
                  onChange={(e) => setSearch(e.target.value)}
                  clearable
                  onClear={() => setSearch("")}
                  value={search}
                />
              </div>
            </div>

            <Services
              products={products}
              activeTab={active}
              loading={isFetching || isRefetching}
              isError={isError}
            />
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default VendorProductServiceSharedPage;

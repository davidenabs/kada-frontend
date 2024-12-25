"use client";
import React, { useState } from "react";
import {
  BriefcaseIcon,
  CelebrateIcon,
  SearchIcon,
  StorefrontIcon,
  VerifiedIcon,
} from "@/icons";
import Image from "next/image";
import Input from "@/components/form/input";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/16/solid";
import Gallery from "@/components/dashboards/farmer/gallery";
import Tab from "@/components/common/tab";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { useGetUserQuery } from "@/app/_api/user";
import { useParams } from "next/navigation";
import { useGetProducts } from "@/app/_api/catalog";
import { ICatalog } from "@/interface/catalog";
import useDebounce from "@/hooks/use-debounce";
import Services from "@/components/shared/farmer/vendors/service/services";

function CooperativeVendorsServiceSharedPage() {
  useDashboardTitle("Vendor");
  const { vendorId } = useParams();
  const [loaded, setLoaded] = React.useState(false);
  const [activeTab, setActiveTab] = useState("Our Services");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [stats, setStats] = React.useState<any>({});
  const [products, setProducts] = useState<ICatalog[]>([]);
  const debouncedSearchQuery = useDebounce(search);

  const active = React.useMemo(() => {
    return activeTab === "Our Services" ? "services" : "products";
  }, [activeTab]);

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

  const { data, isFetching, isRefetching } = useGetUserQuery({
    enabled: loaded,
    id: vendorId as string,
  });

  const {
    data: productsData,
    isFetching: isProductFetching,
    isRefetching: isProductRefetching,
    isError,
  } = useGetProducts({
    enabled: loaded,
    params: {
      page: 1,
      limit: 10,
      userId: vendorId as string,
      type: active,
      search: debouncedSearchQuery,
    },
  });

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    if (
      !isProductFetching &&
      !isProductFetching &&
      productsData?.success &&
      productsData?.data
    ) {
      setProducts(productsData.data.products);
      setStats((productsData.data as any).stats);
    }
  }, [productsData, isProductFetching, isProductRefetching]);

  return (
    <section className="flex max-lg:flex-col gap-x-[20px]">
      <div className="flex-1 space-y-4">
        <div className="border bg-white rounded-2xl border-[#ECF2F6] p-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-6">
              <div className="relative h-[120px] w-[209px]">
                <Image
                  src="/images/bdo.png"
                  alt="Vendor Image"
                  fill
                  className="object-cover rounded-[10px]"
                />
              </div>

              <div className="">
                <h4 className="text-[#101928] text-[20px] font-semibold">
                  {data?.data?.vendorProfile?.vendorName}
                </h4>
                <p className="text-[#1D2739] text-xs">
                  {data?.data?.vendorProfile?.productService ||
                    "No description"}
                </p>
                <div className="flex mt-4">
                  <span className="text-xs italic">
                    {data?.data?.vendorProfile?.about || "No description"}
                  </span>
                </div>
              </div>
            </div>

            {data?.data?.vendorProfile?.isVerified && (
              <div className="flex items-center">
                <VerifiedIcon className="w-5 h-5 stroke-[#00A551]" />
                <span className="font-inter text-xs">Verified Vendor</span>
              </div>
            )}
          </div>
        </div>

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                clearable
                onClear={() => setSearch("")}
              />
            </div>
          </div>

          <Services
            products={products}
            activeTab={active}
            isError={isError}
            loading={isProductFetching || isProductRefetching}
          />
        </div>
      </div>

      <div className="w-[270px] max-lg:w-full space-y-6 divide-y">
        <div className="flex p-4 bg-[#F5EBCE] rounded-2xl gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#E3A840]">
            <CelebrateIcon className="w-3 h-3 fill-white" />
          </div>

          <p className="text-sm font-inter">Get in touch with this vendor</p>
        </div>

        <div className="border bg-white border-[#ECF2F6] rounded-2xl">
          <div className="border-b border-[#ECF2F6] p-4">
            <h4 className="text-sm">Contact Information</h4>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#00A551]">
                  <PhoneIcon className="w-4 h-4 fill-white" />
                </div>
                <span className="text-xs">
                  {data?.data?.phoneNumber || "No phone number"}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#00A551]">
                  <EnvelopeIcon className="w-4 h-4 fill-white" />
                </div>
                <span className="text-xs">
                  {data?.data?.email || "No email"}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#00A551]">
                    <StorefrontIcon className="w-4 h-4 fill-white" />
                  </div>
                </div>
                <div className="">
                  <span className="text-xs">
                    {data?.data?.address || "No address"}
                  </span>
                </div>
              </div>
            </div>
            {/* <KadaButton
              className="w-full !bg-black mt-6"
              leftIcon={<ChatBubbleLeftIcon className="w-5 h-5 mr-2" />}
            >
              Chat with Vendor
            </KadaButton> */}
          </div>
        </div>

        <div className="border bg-white border-[#ECF2F6] rounded-2xl overflow-hidden">
          <div className="border-b border-[#ECF2F6] p-4">
            <h4 className="text-sm">Gallery</h4>
          </div>

          <div className="">
            <Gallery images={[]} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CooperativeVendorsServiceSharedPage;

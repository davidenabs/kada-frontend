import React, { Fragment } from "react";
import AddProductServiceButton from "../add-button";
import { BriefcaseIcon } from "@heroicons/react/16/solid";
import Tab from "@/components/common/tab";
import Input from "@/components/form/input";
import { SearchIcon } from "@/icons";
import Services from "../../farmer/vendors/service/services";
import Products from "../../farmer/vendors/service/products";

function VendorProductServiceSharedPage() {
  const [activeTab, setActiveTab] = React.useState("Our Services");

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
                  className="!w-[500px]"
                  prefix={<SearchIcon />}
                />
              </div>
            </div>

            {activeTab === "Our Services" ? <Services /> : <Products />}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default VendorProductServiceSharedPage;

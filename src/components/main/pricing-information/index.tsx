"use client";
import Button from "@/components/form/button";
import Select from "@/components/form/select";
import { BadgeTag, Brick, SearchIcon } from "@/icons";
import PriceChangeIndicator from "./price-change-indicator";
import PriceCard from "./price-card";
import { useState } from "react";

const priceCardsData = [
  {
    title: "Maize",
    price: "105,000",
    location: "Kasuwa Bichi",
    lastUpdated: "Last Updated 12:06PM",
    percentageChange: "3% rise",
    comparisonText: "Compared to yesterday",
  },
  {
    title: "Maize",
    price: "96,000",
    location: "Sabo Market",
    lastUpdated: "Last Updated 12:06PM",
    percentageChange: "3% rise",
    comparisonText: "Compared to yesterday",
  },
  {
    title: "Maize",
    price: "102,000",
    location: "Riga Chickun Market",
    lastUpdated: "Last Updated 12:06PM",
    percentageChange: "3% rise",
    comparisonText: "Compared to yesterday",
  },
  {
    title: "Maize",
    price: "104,000",
    location: "Kasuwa Bichi",
    lastUpdated: "Last Updated 12:06PM",
    percentageChange: "3% rise",
    comparisonText: "Compared to yesterday",
  },
  {
    title: "Maize II",
    price: "104,000",
    location: "Kasuwa Bichi",
    lastUpdated: "Last Updated 12:06PM",
    percentageChange: "3% rise",
    comparisonText: "Compared to yesterday",
  },
];

function PricingInformation() {
  const options = [
    {
      label: "Maize",
      value: "maize",
    },
    {
      label: "Rice",
      value: "rice",
    },
  ];

  const marketOptions = [
    {
      label: "All Market",
      value: "all",
    },
    {
      label: "Kasuwa Market",
      value: "kasuwa",
    },
    {
      label: "Sabo Market",
      value: "sabo",
    },
  ];
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <div className="h-full w-full bg-[#F2F9F5]">
        <div className="app_container flex flex-col rounded-none py-[83px] md:py-[125px] ">
          <section className="relative flex flex-col rounded-t-[32px] rounded-b-2xl bg-green-50 overflow-hidden">
            <img
              src="/images/pricing-header-bg.jpeg"
              alt="Pricing Header Background"
              className="absolute top-[-205px] left-1/2 transform -translate-x-1/2 w-full max-w-none"
            />
            <div className="pt-40 w-full max-md:pt-24 max-md:max-w-full z-10">
              <div className="flex flex-col justify-center px-16 py-6 w-full bg-white max-md:px-5 max-md:max-w-full">
                <div className="flex flex-col justify-center w-full max-md:max-w-full">
                  <div className="flex flex-col items-center self-center max-w-full leading-tight w-[472px]">
                    <BadgeTag className="w-12 h-12" />
                    <h1 className="mt-1 text-2xl font-semibold text-green-600 uppercase">
                      PRICING INFORMATION
                    </h1>
                    <p className="mt-1 text-sm text-center text-neutral-700 max-md:max-w-full">
                      Get insight on product pricing
                    </p>
                  </div>
                  <form className="grid grid-cols-3 flex-wrap gap-6 items-start mt-10 w-full">
                    <Select
                      label="Product"
                      options={options}
                      value={"Select Product"}
                      onChange={() => {}}
                      className="px-5 py-6"
                    />

                    <div className="flex flex-col flex-1 shrink basis-0 min-h-[109px] min-w-[240px]">
                      <Select
                        label="Market"
                        value="Select Market"
                        options={marketOptions}
                        onChange={() => {}}
                        className="px-5 py-6  self-stretch "
                      />

                      <div className="flex gap-2 items-center self-start mt-3">
                        <div className="flex flex-col self-stretch my-auto w-4">
                          <input
                            type="checkbox"
                            id="searchAllMarkets"
                            className="w-4 h-4 rounded-sm border border-gray-300"
                          />
                        </div>
                        <label
                          htmlFor="searchAllMarkets"
                          className="self-stretch my-auto w-28 text-xs font-medium leading-none text-gray-900"
                        >
                          Search all markets?
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="font-medium text-neutral-700 text-sm">
                        {"Date"}
                      </label>
                      <div className="grid grid-cols-2 gap-5">
                        <Select
                          // label="Date"
                          options={options}
                          value={"Select Date"}
                          onChange={() => {}}
                          className="px-5 py-6  self-stretch "
                        />

                        <Button
                          handleClick={() => setShowDetails(true)}
                          className="w-fit h-fit rounded-full gap-3"
                        >
                          <SearchIcon className="fill-yellow-500" />
                          Search
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-2xl bg-white min-h-[367px] w-full border-[0.5px] p-5">
            {!showDetails ? (
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center self-center max-w-full leading-tight w-[472px]">
                  <Brick className="w-[136.5px] h-[136.5px]" />
                  <h2 className="mt-1 text-lg font-semibold text-[#205B42]">
                    No Pricing information to show yet!
                  </h2>
                  <p className="mt-1 text-sm text-center text-neutral-700 max-md:max-w-full">
                    Select a product / market to see price information
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-1 items-center w-full max-md:max-w-full">
                  <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                    <h2 className="text-2xl text-green-600 uppercase max-md:max-w-full">
                      RESULT ({"24"})
                    </h2>
                    <div className="flex flex-wrap gap-3 items-start mt-1 w-full text-base text-neutral-700 max-md:max-w-full">
                      <span className="uppercase">
                        {"Product price across all market"}
                      </span>
                      <span className="shrink-0 w-0 border border-solid border-zinc-500 h-[19px]" />
                      <time className="underline decoration-auto decoration-solid underline-offset-auto">
                        {"28th October, 2024"}
                      </time>
                    </div>
                  </div>
                  <div className="flex flex-col self-stretch my-auto text-sm text-neutral-700 w-[120px]">
                    <PriceChangeIndicator type="increase" />
                    <PriceChangeIndicator type="reduction" />
                  </div>
                </div>

                <div className="flex flex-wrap flex-1 shrink gap-6 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full mt-3">
                  {priceCardsData.map((cardData, index) => (
                    <PriceCard key={index} {...cardData} />
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
export default PricingInformation;

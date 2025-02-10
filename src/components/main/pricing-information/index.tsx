"use client";
import Button, { KadaButton } from "@/components/form/button";
import Select from "@/components/form/select";
import { BadgeTag, Brick, SearchIcon } from "@/icons";
import PriceChangeIndicator from "./price-change-indicator";
import PriceCard from "./price-card";
import React, { useState } from "react";
import { useGetMarketsQuery, useGetProductsQuery } from "@/app/_api/market";
import useDebounce from "@/hooks/use-debounce";
import DatePicker from "@/components/form/date-picker";
import { format } from "date-fns";
import { MultiSelect } from "rizzui";

function PricingInformation() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchProducts, setSearchProducts] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [searchMarket, setSearchMarket] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [markets, setMarkets] = React.useState<any[]>([]);
  const [value, setValue] = React.useState(null);
  const [startDate, setStartDate] = React.useState<Date | null | undefined>(
    undefined
  );
  const debouncedSearchQuery = useDebounce(search);
  const debouncedSearchMarketQuery = useDebounce(searchMarket);
  const [showAllMarkets, setShowAllMarkets] = useState(false);
  const [marketIds, setMarketIds] = useState<string[]>([]);
  const [marketSizes, setMarketSizes] = useState<string[]>([]);
  const [productNames, setProductNames] = useState<string[]>([]);

  const { data, isFetching, isLoading, isError } = useGetProductsQuery({
    enabled: showDetails && loaded,
    params: {
      ...(debouncedSearchQuery.length > 0 && { search: debouncedSearchQuery }),
      page,
      limit,
      ...(startDate && { date: format(startDate, "yyyy-MM-dd") }),
      ...(marketIds.length > 0 && { marketIds }),
      ...(marketSizes.length > 0 && { marketSizes }),
      ...(productNames.length > 0 && { productNames }),
    },
  });

  const {
    data: marketData,
    isFetching: marketIsFetching,
    isRefetching: marketIsRefetching,
    isError: marketIsError,
  } = useGetMarketsQuery({
    enabled: loaded,
    params: {
      search: debouncedSearchMarketQuery,
      page: 1,
      limit: 10,
    },
  });

  const { data: productsData, isFetching: productIsFetching } =
    useGetProductsQuery({
      enabled: loaded,
      params: {
        page: 1,
        limit: 10,
      },
    });

  React.useEffect(() => {
    if (productsData?.data && productsData.success && !productIsFetching) {
      const temp = productsData.data.items.map((product: any) => ({
        label: product.name,
        value: product.name,
        data: product,
      }));

      setProducts(temp);
    }
  }, [productsData, productIsFetching]);

  React.useEffect(() => {
    if (
      marketData?.data &&
      marketData.success &&
      !marketIsFetching &&
      !marketIsRefetching
    ) {
      setMarkets(
        marketData.data.markets.map((market) => ({
          label: market.name,
          value: market.id,
          data: market,
        }))
      );
    }
  }, [data, marketIsFetching, marketIsRefetching]);

  React.useEffect(() => {
    if (data?.data && data.success && !isFetching && !isLoading) {
      setSearchProducts((data.data as any).items);
    }
  }, [data, isFetching, isLoading]);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  const handleSubmit = () => {
    setShowDetails(true);
  };

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
                  <form className="grid grid-cols-2 flex-wrap gap-6 items-start mt-10 w-full">
                    {/* <Select
                      label="Product"
                      options={options}
                      value={"Select Product"}
                      onChange={() => {}}
                      className="px-5 py-6"
                    /> */}

                    {/* <div className="flex flex-col flex-1 shrink basis-0 min-h-[109px] min-w-[240px]"> */}
                    {/* <div className="grid grid-cols-2 gap-6"> */}
                    <MultiSelect
                      label="Select Markets"
                      value={marketIds}
                      options={markets}
                      onChange={(e: any) => {
                        setMarketIds(e);
                      }}
                      className="w-full"
                      clearable={true}
                      onClear={() => {
                        setMarketIds([]);
                      }}
                      selectClassName="!h-[56px] rounded-full border-[0.4px] border-primary"
                      errorClassName="text-red-500"
                    />

                    <MultiSelect
                      label="Select Products"
                      value={productNames}
                      options={products}
                      onChange={(e: any) => {
                        setProductNames(e);
                      }}
                      className="w-full"
                      clearable={true}
                      onClear={() => {
                        setProductNames([]);
                      }}
                      selectClassName="!h-[56px] rounded-full border-[0.4px] border-primary"
                      errorClassName="text-red-500"
                    />

                    <MultiSelect
                      label="Market Size"
                      value={marketSizes}
                      options={[
                        { value: "Small", label: "Small" },
                        { value: "Medium", label: "Medium" },
                        { value: "Large", label: "Large" },
                      ]}
                      onChange={(e: any) => {
                        setMarketSizes(e);
                      }}
                      className="w-full"
                      clearable={true}
                      onClear={() => {
                        setMarketSizes([]);
                      }}
                      selectClassName="!h-[56px] rounded-full border-[0.4px] border-primary"
                      errorClassName="text-red-500"
                    />

                    <div className="flex flex-col">
                      <DatePicker
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                        placeholderText="Select Date"
                        maxDate={new Date()}
                        wrapperClassName="w-full"
                        inputProps={{
                          inputClassName:
                            "!rounded-full border-primary border-[.5px]",
                          label: "Select Date",
                        }}
                      />
                      <div className="">
                        {/* reset date */}
                        <KadaButton
                          onClick={() => setStartDate(undefined)}
                          className="w-fit h-fit rounded-full gap-3"
                          variant="outline"
                          type="button"
                        >
                          Reset Date
                        </KadaButton>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center self-start mt-3 col-span-2">
                      <div className="flex flex-col self-stretch my-auto w-4">
                        <input
                          type="checkbox"
                          id="searchAllMarkets"
                          className="w-4 h-4 rounded-sm border border-gray-300"
                          checked={showAllMarkets}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setMarketIds([]);
                              setShowAllMarkets(true);
                            } else {
                              setShowAllMarkets(false);
                            }
                          }}
                        />
                      </div>
                      <label
                        htmlFor="searchAllMarkets"
                        className="self-stretch my-auto text-xs font-medium leading-none text-gray-900"
                      >
                        Search all markets?
                      </label>
                    </div>
                    {/* </div> */}
                  </form>

                  <div className="text-center mt-8">
                    <KadaButton
                      onClick={handleSubmit}
                      className="w-[300px] h-[40px] rounded-full gap-2"
                      type="button"
                    >
                      <SearchIcon className="fill-yellow-500" />
                      Search
                    </KadaButton>
                  </div>
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
                {isFetching || isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center self-center max-w-full leading-tight w-[472px]">
                      <Brick className="w-[136.5px] h-[136.5px]" />
                      <h2 className="mt-1 text-lg font-semibold text-[#205B42]">
                        Loading...
                      </h2>
                      <p className="mt-1 text-sm text-center text-neutral-700 max-md:max-w-full">
                        Fetching data
                      </p>
                    </div>
                  </div>
                ) : isError ? (
                  <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center self-center max-w-full leading-tight w-[472px]">
                      <Brick className="w-[136.5px] h-[136.5px]" />
                      <h2 className="mt-1 text-lg font-semibold text-[#205B42]">
                        Failed to fetch data
                      </h2>
                      <p className="mt-1 text-sm text-center text-neutral-700 max-md:max-w-full">
                        An error occurred while fetching data
                      </p>
                    </div>
                  </div>
                ) : products?.length === 0 ? (
                  <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center self-center max-w-full leading-tight w-[472px]">
                      <Brick className="w-[136.5px] h-[136.5px]" />
                      <h2 className="mt-1 text-lg font-semibold text-[#205B42]">
                        No data found
                      </h2>
                      <p className="mt-1 text-sm text-center text-neutral-700 max-md:max-w-full">
                        No market data found
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <div className="flex flex-wrap gap-1 items-center w-full max-md:max-w-full">
                      <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                        <h2 className="text-2xl text-green-600 uppercase max-md:max-w-full">
                          RESULT ({searchProducts.length})
                        </h2>
                        <div className="flex flex-wrap gap-3 items-start mt-1 w-full text-base text-neutral-700 max-md:max-w-full">
                          <span className="uppercase">
                            {"Product price across all market"}
                          </span>
                          <span className="shrink-0 w-0 border border-solid border-zinc-500 h-[19px]" />
                          <time className=" decoration-auto decoration-solid underline-offset-auto">
                            {/* {"28th October, 2024"} */}

                            {format(startDate ?? new Date(), "dd MMMM, yyyy")}
                          </time>
                        </div>
                      </div>
                      <div className="flex flex-col self-stretch my-auto text-sm text-neutral-700 w-[120px]">
                        <PriceChangeIndicator type="increase" />
                        <PriceChangeIndicator type="reduction" />
                      </div>
                    </div>

                    <div className="flex flex-wrap flex-1 shrink gap-6 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full mt-3">
                      {searchProducts?.map((product, index) => (
                        <PriceCard key={index} {...product} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
export default PricingInformation;

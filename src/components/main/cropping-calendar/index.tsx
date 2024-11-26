"use client";
import { CalendarIcon, CalendarIcon2, ListIcon, SearchIcon } from "@/icons";
import { cn, Popover } from "rizzui";
import React, { Fragment, useEffect, useState } from "react";
import ChooseCrop from "./choose-crop";
import Input from "@/components/form/input";
import { Crop, searchCrops } from "@/lib/crop-data";
import { DetailData, SidebarData } from "./data";
import { useGetFarmProductsQuery } from "@/app/_api/farm-products";
import useDebounce from "@/hooks/use-debounce";
import { ICrop } from "@/interface/crop";

function CroppingCalendar() {
  const [selectedOption, setSelectedOption] = useState<
    "date-range" | "cropping-stage"
  >("cropping-stage");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Crop[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const [isOepn, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ICrop | null>(null);
  const debouncedSearchQuery = useDebounce(search);

  const { data, isFetching, isRefetching, isError } = useGetFarmProductsQuery({
    enabled: loaded && debouncedSearchQuery.length > 0,
    params: {
      page: 1,
      limit: 10,
      search: debouncedSearchQuery,
    },
  });

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSearch = (query: string) => {
    console.log("searching for", query);
    setResults(searchCrops(query));
  };

  const handleTabChange = (tab: "date-range" | "cropping-stage") => {
    setSelectedOption(tab);
    setCurrentIndex(0);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Fragment>
      <div className="bg-[#F0F0F0]">
        <section className='bg-[url("/images/cropping-calendar.png")] bg-cover bg-center bg-no-repeat w-full mt-[121px] app_container h-[201px] flex items-center'>
          <div className="font-inter text-white">
            <h4 className="text-2xl font-bold uppercase">Cropping Calendar</h4>
            <p className="text-base">
              Knowledge Bank for Crop Specific Information
            </p>
          </div>
        </section>

        <section className="app_container py-[77px]">
          <h4 className="text-center text-[40px] font-semibold text-[#343A3F]">
            How would you like to <br /> explore calendar?
          </h4>

          <div className="flex justify-center mt-[50px]">
            <div className="flex flex-row-reverse items-center gap-3">
              <button
                className={cn(
                  "flex items-center gap-4 px-3 py-2 bg-[#E5E5E5] rounded-lg w-[210px]",
                  selectedOption === "date-range" && "bg-[#00A551] text-white"
                )}
                onClick={() => handleTabChange("date-range")}
              >
                <div className="">
                  {selectedOption === "date-range" ? (
                    <CalendarIcon2 className="w-[24px] h-[24px] text-white" />
                  ) : (
                    <CalendarIcon className="w-[24px] h-[24px] text-white" />
                  )}
                </div>
                <span className="text-base">Date ranges</span>
              </button>
              <span>OR</span>
              <button
                className={cn(
                  "flex items-center gap-4 px-3 py-2 bg-[#E5E5E5] rounded-lg w-[210px]",
                  selectedOption === "cropping-stage" &&
                    "bg-[#00A551] text-white"
                )}
                onClick={() => handleTabChange("cropping-stage")}
              >
                <div className="">
                  <ListIcon className="w-[24px] h-[24px]" />
                </div>
                <span>Cropping Stages</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl px-[21px] py-[30px] w-full flex gap-[23px] mt-[60px]">
            <div className="w-[262px] h-[691px] bg-[#EEF3F1] border border-[#ECF2F6] rounded-lg">
              {selected ? (
                <SidebarData
                  type={selectedOption}
                  data={selected}
                  currentIndex={currentIndex}
                  handleSelect={handleSelect}
                />
              ) : (
                <ChooseCrop />
              )}
            </div>

            <div className="flex-1 flex flex-col">
              <div className="bg-[#506561] rounded-2xl px-9 py-8 relative">
                <Popover
                  isOpen={isOepn}
                  // setIsOpen={setIsOpen}
                  arrowClassName="fill-white"
                  animation="slideIn"
                  showArrow={false}
                  size="lg"
                >
                  <Popover.Trigger>
                    <Input
                      type="search"
                      placeholder="Search for a crop"
                      label="Search for crop"
                      suffix={
                        <div className="rounded-full bg-[#367B62] w-10 h-10 flex items-center justify-center">
                          <SearchIcon className="fill-white" />
                        </div>
                      }
                      inputClassName="h-[50px]"
                      labelClassName="text-white"
                      clearable
                      onClear={() => {
                        setSearch("");
                        setResults([]);
                        setCurrentIndex(0);
                        setSelected(null);
                      }}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onFocus={() => setIsOpen(true)}
                      onBlur={() => setIsOpen(false)}
                    />
                  </Popover.Trigger>
                  <Popover.Content className="bg-white w-[400px] !p-2">
                    <div className="w-[600px] max-h-[400px] overflow-y-scroll">
                      {isFetching || isRefetching ? (
                        <div className="space-y-4">
                          <div className="w-[300px] h-[50px] bg-[#F0F0F0] animate-pulse"></div>
                          <div className="w-[300px] h-[50px] bg-[#F0F0F0] animate-pulse"></div>
                        </div>
                      ) : isError ? (
                        <div>Failed to fetch data</div>
                      ) : (
                        <div className="">
                          {data?.data?.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between px-4 py-2 border-b cursor-pointer hover:bg-[#F0F0F0]"
                              onClick={() => {
                                setSelected(item);
                                setIsOpen(false);
                              }}
                            >
                              <p>{item.name}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Popover.Content>
                </Popover>
              </div>

              <div className="border-t mt-4 flex-1">
                {selected ? (
                  <div className="">
                    <DetailData
                      type={selectedOption}
                      data={selected}
                      currentIndex={currentIndex}
                      handleSelect={handleSelect}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center overflow-y-scroll">
                    <div className="">
                      <p>Nothing to display</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}

export default CroppingCalendar;

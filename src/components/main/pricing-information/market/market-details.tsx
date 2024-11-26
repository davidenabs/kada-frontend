import React from "react";
import DayIndicator from "./day-indicator";

interface MarketDetailsProps {
  data: any;
}

const MarketDetails: React.FC<MarketDetailsProps> = ({ data }) => {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <div className="flex flex-col text-start w-[56%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow ">
        <div className="text-xs font-semibold text-gray-400 tracking-[4.08px]">
          {data?.name}
        </div>
        <div className="mt-3 text-base font-semibold leading-6 text-zinc-700">
          {data?.address}
        </div>
        <div className="mt-3 w-full border border-solid bg-slate-100 border-slate-100 min-h-[1px]" />
        <div className="flex flex-col mt-3 max-w-full w-[313px]">
          <div className="flex flex-col w-full text-xs whitespace-nowrap">
            <div
              data-layername="day"
              className="font-semibold text-gray-400 tracking-[4.08px]"
            >
              DAY
            </div>
            <div className="flex gap-3 items-center self-start mt-5 font-medium text-center text-zinc-500">
              {days.map((day, index) => (
                <DayIndicator
                  key={day}
                  day={day}
                  isActive={index < 3 || index > 4}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-6 w-full font-semibold">
          <div className="text-xs text-gray-400 tracking-[4.08px]">
            MARKET SIZE
          </div>
          <div className="mt-5 text-base text-zinc-700">{data?.size}</div>
        </div>
        <div className="flex flex-col mt-6 w-full font-semibold">
          <div className="text-sm text-gray-400 tracking-[4.76px]">TIMES</div>
          <div className="flex gap-2 items-center mt-2 w-full text-xs text-zinc-600">
            <div className="flex gap-1 items-start self-stretch px-2.5 py-2 my-auto border border-solid border-zinc-200 rounded-[60px]">
              <div className="gap-2.5 self-stretch px-2.5 py-1 whitespace-nowrap rounded-[60px]">
                Opens
              </div>
              <div className="gap-2.5 self-stretch px-2.5 py-1 bg-neutral-100 rounded-[60px]">
                {data?.openingTime.split("-")[0]}
              </div>
            </div>
            <div className="flex gap-1 items-start self-stretch px-2.5 py-2 my-auto border border-solid border-zinc-200 rounded-[60px]">
              <div className="gap-2.5 self-stretch px-2.5 py-1 whitespace-nowrap rounded-[60px]">
                Closes
              </div>
              <div className="gap-2.5 self-stretch px-2.5 py-1 bg-neutral-100 rounded-[60px]">
                {data?.openingTime.split("-")[1]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDetails;

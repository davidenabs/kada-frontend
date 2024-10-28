import React from 'react';
import StatCard, { StatCardProps } from './stat-card';

const Statistics: React.FC<{ hasBg?: boolean }> = ({ hasBg = true }) => {
  return (

    <div className="app_container items-center flex flex-col md:flex-row overflow-x-hidden relative bg[#fefffd] pb-40 w-full pt-[123px] md:py-[165px] mb-20">
      {hasBg && <div className="absolute bg-[#FBFBFB] w-[1871.08px] h-[600.1px] left-[-283px] top-[50px] -rotate-[3.6deg] rounded-[50%]"></div>}
      <div className="flex z-10 flex-col -mb-9 w-full">
        <div className="flex flex-col md:self-start text-center md:text-left self-center whitespace-nowrap">
          <h2 className="text-lg font-semibold leading-snug text-green-600 uppercase">Facesheet</h2>
          <h1 className="mt-1.5 text-3xl font-bold leading-tight text-zinc-700">Statistics</h1>
        </div>
        <div className="mt-12 max-md:mt-0 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {statisticsData.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const statisticsData: StatCardProps[] = [
  {
    title: "Arable Land",
    value: "4.5 Million Hectres (97%) Arable Land",
    subtitle: "2.9 Million Hectres (65%) under cultivation",
    source: "KBS, 2017",
    bgColor: "bg-neutral-800",
    textColor: "text-emerald-50",
    accentColor: "text-green-500",
  },
  {
    title: "State Population",
    value: "9,476,053 Million",
    source: "2020 Projection",
    bgColor: "bg-white",
    textColor: "text-zinc-700",
    subtitle2: "State Population",
  },
  {
    title: "Agriculture contribution to state GDP",
    value: "38.09%",
    bgColor: "bg-white",
    textColor: "text-zinc-700",
    subtitle2: "Agriculture contribution to state GDP",
  },
];


export default Statistics;

import { MapNavIcon } from "@/icons";
import Link from "next/link";
import React from "react";

interface MarketMapProps {
  market: any;
}

const MarketMap: React.FC<MarketMapProps> = ({ market }) => {
  const coordinates = market?.coordinates.split(",");
  const googleMapsUrl = `https://www.google.com/maps?q=${coordinates[0]},${coordinates[1]}`;
  return (
    <div className="flex flex-col ml-5 w-[44%] max-md:ml-0 max-md:w-full">
      <div className="flex overflow-hidden flex-col justify-end p-px w-full rounded-lg border border-solid border-slate-100 text-neutral-700 max-md:mt-10">
        <img
          loading="lazy"
          src="/images/market-products.png"
          className="object-contain w-full rounded-lg aspect-[1.62]"
          alt="Map of Kaduna Central Market"
        />
        <div className="flex flex-col bg-white">
          <div className="overflow-hidden px-3 py-5 text-xs leading-5 bg-white">
            {market?.address}
          </div>
          <button className="flex overflow-hidden flex-col justify-center px-px py-3 text-sm font-semibold leading-none text-center bg-gray-200 rounded-lg">
            <div className="w-full">
              <Link href={googleMapsUrl} target="_blank" className="flex justify-center my-auto mx-auto ">
                <span className="self-stretch my-auto">Get Direction</span>
                <MapNavIcon className="my-auto w-6 h-6" />
              </Link>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketMap;

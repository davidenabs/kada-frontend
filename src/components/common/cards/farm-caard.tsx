import { IFarm } from "@/interface/farm";
import Link from "next/link";
import React, { Fragment } from "react";

function FarmCard({
  id,
  name,
  landArea,
  location,
  activeSeason,
  products,
}: IFarm) {
  return (
    <Fragment>
      <div className="">
        <Link
          href={`/dashboard/farmer/farm/${id}`}
          className="flex overflow-hidden flex-col grow pt-28 text-sm font-light leading-none rounded-lg shadow-[10px_10px_30px_rgba(199,199,199,0.25)] max-md:pt-24 max-md:mt-9 bg-[url('/images/crop-thumb.png')] bg-norepeat bg-cov"
        >
          <div className="flex overflow-hidden flex-col items-start px-4 py-5 w-full rounded-lg bg-zinc-50 max-md:pr-5">
            <h3 className="text-lg font-bold text-teal-700 max-md:ml-1 capitalize">
              {name}
            </h3>
            <p className="mt-1 font-semibold uppercase text-neutral-500 max-md:ml-1">
              {landArea} Hectares
            </p>
            <p className="mt-6 leading-4 text-zinc-700 max-md:ml-1">
              {location}
            </p>
            <div className="flex gap-1.5 items-center mt-11 text-teal-700 max-md:mt-10">
              <div className="flex shrink-0 self-stretch my-auto w-2 h-2 bg-teal-700 rounded-full" />
              <p className="self-stretch my-auto">{activeSeason}</p>
            </div>
            <div className="flex gap-1.5 self-stretch mt-5 w-full text-black whitespace-nowrap max-md:mr-1">
              {products?.map((crop, index) => (
                <span
                  key={index}
                  className="gap-2.5 self-stretch px-2.5 py-1 rounded border-zinc-300 border-[0.5px]"
                >
                  {crop.name}
                </span>
              ))}
            </div>
            <span className="self-end mt-8 text-green-800">View</span>
          </div>
        </Link>
      </div>
    </Fragment>
  );
}

export default FarmCard;

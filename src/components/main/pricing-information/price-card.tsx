import { PriceHighIcon, PriceMarketIcon } from "@/icons";
import { appAtom } from "@/stores/app";
import { formatDate } from "date-fns";
import { useAtom } from "jotai";
import Link from "next/link";
import React from "react";
import { formatDistanceToNow } from "date-fns";

interface PriceCardProps {
  title: string;
  price: string;
  location: string;
  lastUpdated: string;
  percentageChange: string;
  comparisonText: string;
  currentPriceDate: string;
}

const PriceCard: React.FC<PriceCardProps> = (product: any) => {
  const [app, setApp] = useAtom(appAtom);
  return (
    <Link
      href={"/pricing-information/market"}
      onClick={() => {
        setApp({ ...app, selectedMarket: product?.market });
      }}
      className={`flex flex-col flex-1 shrink justify-center self-stretch px-2.5 py-4 my-auto bg-gray-50 hover:bg-emerald-50 rounded-2xl border border-solid basis-0 border-slate-100 min-w-[240px]`}
    >
      <div className="flex flex-col w-full">
        <h2 className="text-xs leading-tight text-black capitalize">
          {formatDistanceToNow(
            new Date(product.currentPriceDate ?? new Date()),
            {
              addSuffix: true,
            }
          )}
        </h2>
        <div className="flex flex-col mt-4 w-full">
          <div className="flex flex-col leading-tight text-black whitespace-nowrap w-[83px]">
            <h3 className="text-xl">{product?.name}</h3>
            <div className="flex items-center mt-1 w-full text-2xl font-bold text-center">
              <span>₦&nbsp;</span>
              <span className="self-stretch my-auto">{product?.price}</span>
            </div>
          </div>
          <div className="flex flex-col mt-6 w-full">
            <div className="flex flex-col items-start max-w-full w-full">
              <div className="flex gap-2">
                <PriceMarketIcon className="w-5 h-5" />
                <span
                  className={`gap-1 text-sm font-semibold leading-tight text-black hover:text-green-600 `}
                >
                  {product?.market?.name}
                </span>
              </div>
              <p className="mt-1 text-xs leading-tight text-center text-zinc-600">
                Last updated {""}
                {formatDate(
                  new Date(product?.createdAt ?? new Date()),
                  "dd MMM yyyy, hh:mm a"
                )}
              </p>
            </div>
            <div className="flex gap-1 items-center mt-4 w-full text-xs leading-tight text-center">
              <span className="self-stretch my-auto text-black">
                {/* {percentageChange} */}
                {/* 3% rise */}
                {product?.priceTrend?.percentage ?? 0}% rise
              </span>
              <PriceHighIcon className="w-[18px] h-[18px]" />
              <span className="self-stretch my-auto text-zinc-600">
                {/* {comparisonText} */}
                Compared to yesterday
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PriceCard;

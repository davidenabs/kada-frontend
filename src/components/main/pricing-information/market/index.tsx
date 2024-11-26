"use client";
import React, { useState } from "react";
import MarketInformation from "./market-information";
import SearchSection from "./search-section";
import { useAtom } from "jotai";
import { appAtom } from "@/stores/app";

interface MarketInsightsProps {}

const MarketInsights: React.FC<MarketInsightsProps> = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<any>(null);
  const [app, setApp] = useAtom(appAtom);

  React.useEffect(() => {
    if (app.selectedMarket) {
      setShowDetails(true);
      setSelectedMarket(app.selectedMarket);
    }

    return () => {
      setApp((prev) => ({ ...prev, selectedMarket: null }));
    };
  }, [app.selectedMarket]);
  return (
    <div className="h-full w-full bg-[#F2F9F5]">
      <div className="app_container flex flex-col rounded-none py-[83px] md:py-[125px] ">
        <div className="flex gap-5 max-md:flex-col">
          <SearchSection
            setShowDetails={setShowDetails}
            setSelectedMarket={setSelectedMarket}
            selectedMarket={app.selectedMarket}
          />
          <MarketInformation
            showDetails={showDetails}
            selectedMarket={selectedMarket}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;

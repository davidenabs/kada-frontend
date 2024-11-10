"use client"
import React, { useState } from 'react';
import MarketInformation from './market-information';
import SearchSection from './search-section';


interface MarketInsightsProps { }

const MarketInsights: React.FC<MarketInsightsProps> = () => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="h-full w-full bg-[#F2F9F5]">
      <div className="app_container flex flex-col rounded-none py-[83px] md:py-[125px] ">
        <div className="flex gap-5 max-md:flex-col">
          <SearchSection setShowDetails={setShowDetails} />
          <MarketInformation showDetails={showDetails} />
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
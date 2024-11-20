import React from "react";

function OpportunitySkeleton() {
  return (
    <div className="border border-[#F1F1F1] rounded-2xl bg-[#F8F8F9] p-4 animate-pulse">
      <div className="relative w-full h-[152px] rounded-[10px] overflow-hidden bg-gray-300" />

      <h4 className="text-sm font-bold mt-3">
        <div className="w-3/4 h-4 bg-gray-300 rounded" />
      </h4>

      <p className="text-[#676E77] text-xs mt-2">
        <div className="w-full h-3 bg-gray-300 rounded mb-1" />
        <div className="w-5/6 h-3 bg-gray-300 rounded mb-1" />
      </p>

      <p className="text-xs text-[#676E77] mt-3">
        <div className="w-1/2 h-3 bg-gray-300 rounded" />
      </p>

      <div className="w-full h-10 bg-gray-300 rounded-full mt-4" />
    </div>
  );
}

export default OpportunitySkeleton;

import React from "react";

function OverviewSkeleton() {
  return (
    <div className="flex flex-col items-center px-9 py-7 rounded-md h-[178px] max-md:px-5 border border-[#ECF2F6] bg-white">
      <div className="object-contain aspect-[1.14] w-[33px] bg-gray-200 animate-pulse rounded"></div>
      <div className="mt-5 h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
      <div className="mt-2 h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
    </div>
  );
}

export default OverviewSkeleton;

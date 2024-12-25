import React from "react";

function CatalogSkeleton() {
  return (
    <div className="flex items-center gap-5">
      <div className="relative w-[116px] h-[104px] bg-gray-200 rounded-xl animate-pulse"></div>

      <div className="flex-1">
        <div className="font-inter">
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-1"></div>
          <div className="h-3 w-32 bg-gray-200 animate-pulse rounded"></div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="w-5 h-5 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default CatalogSkeleton;

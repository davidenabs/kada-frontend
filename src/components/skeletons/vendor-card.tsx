import React from "react";

function VendorCardSkeleton() {
  return (
    <div className="p-4">
      {/* Image Skeleton */}
      <div className="relative w-full h-[189px] bg-gray-200 animate-pulse rounded-lg">
        <div className="w-full h-full bg-gray-300 rounded-lg"></div>
      </div>

      {/* Text Skeleton */}
      <div className="mt-4 space-y-2">
        <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-1/4 h-3 bg-gray-200 animate-pulse rounded"></div>

        {/* Rating and Review count Skeleton */}
        <div className="flex space-x-2">
          <div className="w-12 h-3 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="mt-4">
        <div className="w-32 h-10 bg-gray-200 animate-pulse rounded-full"></div>
      </div>
    </div>
  );
}

export default VendorCardSkeleton;

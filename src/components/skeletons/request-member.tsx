import React from "react";

function RequestMemberSkeleton() {
  return (
    <div className="flex justify-between px-4 py-3 animate-pulse">
      <div className="flex gap-2 items-center">
        <div className="relative w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
        <div>
          <p className="w-24 h-4 bg-gray-200 rounded-md mb-1"></p>
          <p className="w-16 h-3 bg-gray-200 rounded-md"></p>
        </div>
      </div>

      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
    </div>
  );
}

export default RequestMemberSkeleton;

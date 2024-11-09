import React from "react";

function CooperativeCardGallery() {
  return (
    <div className="bg-white rounded-2xl border border-[#ECF2F6] p-4">
      <div className="flex items-center gap-4 cursor-pointer">
        <div className="relative w-[123px] h-[118px] animate-pulse bg-gray-200 rounded-md"></div>

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-[15px] font-semibold font-inter bg-gray-200 animate-pulse h-4 w-32 mb-2"></h4>
              <p className="text-xs mt-1 bg-gray-200 animate-pulse h-3 w-48 mb-2"></p>
              <div className="flex items-center my-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 animate-pulse rounded-full"></div>
                  <span className="text-xs bg-gray-200 animate-pulse h-3 w-24"></span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-[19px] h-[11px] bg-gray-200 animate-pulse rounded-full"></div>
                  <span className="text-xs bg-gray-200 animate-pulse h-3 w-24"></span>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm bg-gray-200 animate-pulse h-3 w-8"></span>
              </div>
            </div>

            <div className="w-28 h-10 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CooperativeCardGallery;

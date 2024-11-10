import { Block, ListIcon } from "@/icons";
import React from "react";

function ChooseCrop() {
  return (
    <div>
      <div className="flex flex-col border-b border-[#E0E2E1] pb-7 px-5 pt-9">
        <div className="">
          <ListIcon className="w-[24px] h-[24px] mx-auto" />
        </div>

        <p className="text-center text-[#343A3F] mt-4">
          You are exploring this calendar by cropping stages
        </p>
      </div>

      <div className="px-7 pt-12">
        <div className="">
          <Block className="mx-auto w-[127px] h-[127px]" />
        </div>
        <div className="text-center">
          <h4>Choose a crop</h4>
          <p>Filter will appear here when you choose a crop</p>
        </div>
      </div>
    </div>
  );
}

export default ChooseCrop;

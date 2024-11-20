import { KadaButton } from "@/components/form/button";
import { Block } from "@/icons";
import { PlusIcon } from "@heroicons/react/16/solid";
import React, { Fragment } from "react";

function Sidebar({ setValue, getValues }: any) {
  return (
    <Fragment>
      <div className="">
        <div className="px-7 pt-12">
          <div className="">
            <Block className="mx-auto w-[90px] h-[90px]" />
          </div>
          <div className="text-center">
            <h4 className="text-sm text-[#333543]">Add a range to start</h4>

            <KadaButton
              type="button"
              className="text-xs rounded-full px-2 py-1 h-fit"
              onClick={() =>
                setValue("seasons", [
                  ...getValues("seasons"),
                  {
                    name: "",
                    period: "",
                    isRecommended: false,
                    activities: [],
                  },
                ])
              }
            >
              <PlusIcon className="w-4 h-4 fill-white" />
              Add Season
            </KadaButton>
          </div>

          <div className="text-center">
            <KadaButton
              type="button"
              className="text-xs rounded-full px-2 py-1 h-fit"
              onClick={() =>
                setValue("stages", [
                  ...getValues("stages"),
                  {
                    name: "",
                    tasks: [],
                  },
                ])
              }
            >
              <PlusIcon className="w-4 h-4 fill-white" />
              Add Stage
            </KadaButton>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Sidebar;

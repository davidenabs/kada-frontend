import { KadaButton } from "@/components/form/button";
import { CloseIcon } from "@/icons";
import { IPost } from "@/interface/cms";
import { getTimeAgo } from "@/utils/utils";
import Image from "next/image";
import React, { Fragment } from "react";
import { cn, Drawer } from "rizzui";
import { format } from "date-fns";
import ProgramApplicationsDrawer from "./program-application";

type ProgramDetailsDrawerProps = {
  close: () => void;
  open: boolean;
  data: IPost | null;
};

function ProgramDetailsDrawer({
  close,
  open,
  data,
}: ProgramDetailsDrawerProps) {
  const [openApplication, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!openApplication);
  };
  return (
    <Fragment>
      {openApplication && (
        <ProgramApplicationsDrawer
          close={toggleDrawer}
          open={open}
          data={data?.applications ?? []}
        />
      )}
      <Drawer
        isOpen={open}
        onClose={close}
        placement={"right"}
        size={"lg"}
        overlayClassName="bg-opacity-40 backdrop-blur-sm"
        containerClassName={cn("bg-gray-100 rounded-l-xl")}
        className="z-[9999]"
      >
        <section className="h-full bg-white">
          <div className="bg-[#F9F9F9] flex justify-between items-center px-6 py-5 rounded-tl-2xl border-b border-[#F2F2F2]">
            <h4 className="font-bold text-lg font-inter">Program Details</h4>
            <button onClick={close}>
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white px-6 p-6 h-full overflow-y-auto">
            <div className="flex gap-7 justify-items-stretch">
              <div className="relative w-[171px] h-[160px] rounded-xl overflow-hidden">
                <Image
                  src={data?.featuredImage || "/images/bdo.png"}
                  fill
                  className="object-cover"
                  alt="Funding Opportunities for Farmers!"
                />
              </div>
              <div className="h-auto flex flex-col justify-between">
                <h4 className="text-sm font-semibold">
                  {data?.title || "United Nation’s Food Programme 2024"}
                </h4>
                <div>
                  <p className="text-[#676E77] text-xs">
                    {data?.shortDescription ??
                      "Share an exciting opportunity with your network"}
                  </p>
                  <p className="text-xs text-[#676E77] mt-2">
                    Posted {getTimeAgo(data?.createdAt ?? new Date())} ago
                  </p>
                </div>
              </div>
            </div>

            {/* Comments and Applications Section */}
            <div className="mt-6 rounded-2xl bg-[#F8F8F8F8] px-3 py-7 shadow-sm">
              {/* <p className="text-sm font-semibold">
                Total Comments: {data?.comments?.length || 0}
              </p> */}
              <div className="text-sm font-semibold pb-2">
                {data?.applicationDate
                  ? `Start: ${format(
                      new Date(data.applicationDate),
                      "dd/MM/yyyy"
                    )}`
                  : "Start date not available"}{" "}
                -
                {data?.closingDate
                  ? ` Close: ${format(
                      new Date(data.closingDate),
                      "dd/MM/yyyy"
                    )}`
                  : "Closing date not available"}
              </div>
              <KadaButton
                className=" w-full rounded-full text-white"
                onClick={toggleDrawer}
              >
                View Applications
                <span className="mx-2 bg-white px-1 text-black rounded-full">
                  {data?.applications?.length || 0}
                </span>
              </KadaButton>
            </div>

            <div className="rounded-2xl bg-[#F8F8F8F8] px-3 py-7 space-y-4 mt-10">
              <div dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
            </div>
          </div>
        </section>
      </Drawer>
    </Fragment>
  );
}

export default ProgramDetailsDrawer;

import { KadaButton } from "@/components/form/button";
import { CloseIcon } from "@/icons";
import { IApplication, IPost } from "@/interface/cms";
import { getTimeAgo } from "@/utils/utils";
import Image from "next/image";
import React, { Fragment } from "react";
import { cn, Drawer } from "rizzui";
import { format } from "date-fns";

type ProgramApplicationsDrawerProps = {
  close: () => void;
  open: boolean;
  data: IApplication[] | [];
};

function ProgramApplicationsDrawer({
  close,
  open,
  data,
}: ProgramApplicationsDrawerProps) {
  const [openApplication, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!openApplication);
  };
  return (
    <Fragment>
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
            <h4 className="font-bold text-lg font-inter">Program Applications</h4>
            <button onClick={close}>
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6  bg-[#F8F8F8F8] px-3 py-7">
              {data?.length ? (
                <ul className="space-y-2">
                  {data.map((app: IApplication) => (
                    <li key={app.id} className="p-3 bg-white rounded-lg shadow-sm">
                        {/* firstName, lastName, email, phoneNumber, publicId */}
                      <p className="text-sm font-medium">First name: {app.meta?.firstName||"N/A"}</p>
                      <p className="text-sm font-medium">Last name: {app.meta?.lastName||"N/A"}</p>
                      <p className="text-sm font-medium">Email ID: {app.meta?.email||"N/A"}</p>
                      <p className="text-sm font-medium">Phone number: {app.meta?.phoneNumber||"N/A"}</p>
                      <p className="text-sm font-medium">User ID: {app.meta?.publicId||"N/A"}</p>
                      <p className="text-xs text-gray-600">Submitted: {getTimeAgo(app.createdAt)} ago</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600">No applications available</p>
              )}
            </div>
        </section>
      </Drawer>
    </Fragment>
  );
}

export default ProgramApplicationsDrawer;

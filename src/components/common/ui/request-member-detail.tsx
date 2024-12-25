import { VerifiedIcon } from "@/icons";
import { IRequest } from "@/interface/request";
import { format } from "date-fns";
import Image from "next/image";
import React, { Fragment } from "react";
import { cn } from "rizzui";

type RequestMemberDetailProps = {
  request: IRequest;
};

function RequestMemberDetail({ request }: RequestMemberDetailProps) {
  return (
    <Fragment>
      <h4 className="text-[18px] font-bold">Requesting-Farmer’s Profile</h4>

      <div className="border border-[#ECF2F6] bg-white rounded-2xl h-[224px] flex items-center px-[50px] bg-[url('/images/profile-pattern.png')] bg-no-repeat bg-cover">
        <div className="flex items-center gap-4">
          <div className="relative w-[40px] md:w-[99px] h-[40px] md:h-[99px]">
            <Image
              src={request.farmer?.imagePath || "/images/avatar.png"}
              alt="bdo"
              fill
              className="object-cover rounded-full"
            />
          </div>

          <div className="">
            <h4 className="text-[18px] font-bold">
              {request.farmer?.firstName} {request.farmer?.lastName}
            </h4>
            <div className="flex items-center space-x-2">
              <VerifiedIcon
                className={cn(
                  "w-4 h-4",
                  request.farmer?.farmerProfile?.isNinVerified
                    ? "stroke-green-500"
                    : "stroke-red-500"
                )}
              />

              <span>
                {request.farmer?.farmerProfile?.isNinVerified
                  ? "Verified"
                  : "Not Verified"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-[#ECF2F6] space-y-2 bg-white p-4 rounded-2xl">
        <div className="flex justify-between">
          <span className="text-lg">Joined</span>

          <div className="flex">
            <span className="text-[#878D96]">
              {format(request!.farmer!.createdAt || new Date(), "dd MMM, yyyy")}
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-lg">Email</span>

          <div className="flex">
            <span className="text-[#878D96]">
              {request.farmer?.email || "N/A"}
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-lg">Phone</span>

          <div className="flex">
            <span className="text-[#878D96]">
              {request.farmer?.phoneNumber || "N/A"}
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-lg w-1/2">Address</span>

          <div className="flex w-1/2 justify-end">
            <span className="text-[#878D96] text-right">
              {request.farmer?.address || "N/A"}
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-lg">State of Residence</span>

          <div className="flex">
            <span className="text-[#878D96]">Kaduna</span>
          </div>
        </div>

        {/* <div className="flex justify-between">
          <span className="text-lg">Funding History</span>

          <div className="flex">
            <span className="text-[#878D96]">Kaduna</span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-lg">Cooperative (0)</span>

          <div className="flex">
            <span className="text-[#878D96]">Kaduna</span>
          </div>
        </div> */}
      </div>
    </Fragment>
  );
}

export default RequestMemberDetail;

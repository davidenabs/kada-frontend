"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import { KadaButton } from "../form/button";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { IPost } from "@/interface/cms";
import { getTimeAgo } from "@/utils/utils";

type OpportunitiesCardProps = {
  onClick: () => void;
  data: IPost;
};

function OpportunitiesCard({ onClick, data }: OpportunitiesCardProps) {
  return (
    <Fragment>
      <div className="border border-[#F1F1F1] rounded-2xl bg-[#F8F8F9] p-4">
        <div className="relative w-full h-[152px] rounded-[10px] overflow-hidden">
          <Image
            src={data?.featuredImage || "/images/bdo.png"}
            fill
            className="object-cover"
            alt={data?.title + " image"}
          />
        </div>

        <h4 className="text-sm font-bold mt-3">{data?.title}</h4>
        <p className="text-[#676E77] text-xs mt-2">{data?.shortDescription}</p>

        <p className="text-xs text-[#676E77] mt-3">
          Posted {getTimeAgo(data?.createdAt)} ago
        </p>

        <KadaButton
          className="w-full rounded-full mt-4 !bg-[#E2E4E3] hover:!bg-primary !text-[#333543] hover:!text-white group"
          rightIcon={
            <ArrowRightIcon className="w-4 h-4 ml-2 fill-black group-hover:fill-white" />
          }
          onClick={onClick}
        >
          Apply Now
        </KadaButton>
      </div>
    </Fragment>
  );
}

export default OpportunitiesCard;

"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import { KadaButton } from "../form/button";
import { ArrowRightIcon } from "@/icons";

type OpportunitiesCardProps = {
  onClick: () => void;
  image: string;
  title: string;
  description: string;
  posted: string;
};

function OpportunitiesCard({
  onClick,
  description,
  image,
  posted,
  title,
}: OpportunitiesCardProps) {
  return (
    <Fragment>
      <div className="border border-[#F1F1F1] rounded-2xl bg-[#F8F8F9] p-4">
        <div className="relative w-full h-[152px] rounded-[10px] overflow-hidden">
          <Image
            src={image}
            fill
            className="object-cover"
            alt={title + " image"}
          />
        </div>

        <h4 className="text-sm font-bold mt-3">{title}</h4>
        <p className="text-[#676E77] text-xs mt-2">{description}</p>

        <p className="text-xs text-[#676E77] mt-3">Posted {posted} ago</p>

        <KadaButton
          className="w-full rounded-full mt-4"
          rightIcon={<ArrowRightIcon className="w-4 h-4 ml-2" />}
          onClick={onClick}
        >
          Apply Now
        </KadaButton>
      </div>
    </Fragment>
  );
}

export default OpportunitiesCard;

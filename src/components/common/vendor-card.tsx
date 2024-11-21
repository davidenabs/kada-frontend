"use client";
import Image from "next/image";
import React from "react";
import Rating from "react-rating";
import { KadaButton } from "../form/button";
import { ArrowRightIcon } from "@/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IUser } from "@/interface/user";

type VendorCardProps = {
  vendor: IUser;
};

function VendorCard({ vendor }: VendorCardProps) {
  const pathname = usePathname();
  return (
    <div>
      <div className="relative w-full h-[189px]">
        <Image
          src={vendor?.imagePath || "/images/bdo.png"}
          alt={(vendor?.vendorProfile?.vendorName || "vendor") + "image"}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="mt-4">
        <h4 className="text-[#101928] text-[15px] font-semibold">
          {vendor?.vendorProfile?.vendorName || "Vendor Name"}
        </h4>
        <p className="text-[#1D2739] text-xs">
          {vendor?.vendorProfile?.productService || "Vendor Category"}
        </p>
        {/* <Rating
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x"

        /> */}
        {/* <div className="flex">
          <span className="text-sm">(91)</span>
        </div> */}
      </div>

      <Link href={pathname + "/" + vendor.id}>
        <KadaButton
          className="mt-4 rounded-full font-semibold text-[#1D2739] text-sm"
          variant="outline"
          rightIcon={<ArrowRightIcon />}
        >
          Explore
        </KadaButton>
      </Link>
    </div>
  );
}

export default VendorCard;

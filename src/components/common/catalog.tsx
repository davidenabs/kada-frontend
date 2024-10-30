import { ArrowRightIcon } from "@/icons";
import cn from "@/utils/class-names";
import Image from "next/image";
import React from "react";

interface CatalogProps {
  type: "service" | "product";
  image: string;
  name: string;
  price: string;
}

function Catalog({ type, image, name, price }: CatalogProps) {
  return (
    <div className="flex items-center gap-5">
      <div className="relative w-[116px] h-[104px] rounded-xl">
        <Image
          src={image}
          alt={name + " image"}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <div className="flex-1">
        <div className="font-inter">
          <h4 className="text-sm font-semibold">{name}</h4>
          <p className="text-[#929292] text-sm">Ferterlizer Provider</p>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-[#A2A9B0] text-base",
                type === "product" && "hidden"
              )}
            >
              From
            </span>
            <span className="text-sm font-semibold">₦{price}</span>
          </div>
          <ArrowRightIcon className="w-5 h-5 fill-[#C1C7CD]" />
        </div>
      </div>
    </div>
  );
}

export default Catalog;

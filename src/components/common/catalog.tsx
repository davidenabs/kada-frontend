import { ArrowRightIcon } from "@/icons";
import { cn } from "rizzui";
import Image from "next/image";
import React from "react";
import Link from "next/link";

interface CatalogProps {
  type: "services" | "products";
  image: string;
  name: string;
  price: string;
  description: string;
  href?: string;
}

function Catalog({
  type,
  image,
  name,
  price,
  description,
  href,
}: CatalogProps) {
  return (
    <Link href={href ?? "#"} className="flex items-center gap-5">
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
          <h4 className="text-sm font-semibold capitalize">{name}</h4>
          <p className="text-[#929292] text-sm">{description}</p>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-[#A2A9B0] text-base",
                type === "products" && "hidden"
              )}
            >
              {/* From */}
            </span>
            {type === "products" && (
              <>
                From <span className="text-sm font-semibold">₦{price}</span>
              </>
            )}
          </div>
          <ArrowRightIcon className="w-5 h-5 fill-[#C1C7CD]" />
        </div>
      </div>
    </Link>
  );
}

export default Catalog;

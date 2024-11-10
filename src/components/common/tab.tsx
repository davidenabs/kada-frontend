"use client";
import { cn } from "rizzui";
import React from "react";
import { Badge } from "rizzui";

function Tab(props: {
  title: string;
  active: string;
  onClick: any;
  count: number;
  icon: any;
  className?: string;
}) {
  const { title, active, icon, onClick, count, className = "" } = props;

  const Icon = icon;

  return (
    <button
      className={cn(
        "border-b h-[52px] p-4 text-paragraph-small-medium flex items-center justify-center space-x-2",
        active === title
          ? "border-green-500 text-green-500"
          : "border-[#E4E7EC] text-[#667185]",
        className
      )}
      onClick={onClick}
    >
      <Icon
        className={cn(
          "w-5 h-5",
          active === title ? "fill-[#00A551]" : "fill-[#A2A9B0]"
        )}
      />

      <span className="text-nowrap">{title}</span>

      <Badge
        className={cn(
          active !== title
            ? "bg-[#F0F2F5] text-[#344054]"
            : "bg-[#00A551] text-white",
          "!text-paragraph-xsmall-medium !px-[10px] !py-0"
        )}
      >
        {count}
      </Badge>
    </button>
  );
}

export default Tab;

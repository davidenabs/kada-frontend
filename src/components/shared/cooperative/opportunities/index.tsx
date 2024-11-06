"use client";
import ExploreOpportunityDraewr from "@/components/drawers/cooperative/explore-opportunity";
import { KadaButton } from "@/components/form/button";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { useDrawer } from "@/hooks/use-drawer";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";

function CooperativeOpportunitiesSharedPage() {
  useDashboardTitle("Opportunities");
  const { closeDrawer, openDrawer } = useDrawer();

  return (
    <div className="grid grid-cols-3">
      <div className="border border-[#F1F1F1] rounded-2xl bg-[#F8F8F9] p-4">
        <div className="relative w-full h-[152px] rounded-[10px] overflow-hidden">
          <Image
            src={"/images/bdo.png"}
            fill
            className="object-cover"
            alt="Funding Opportunities for Farmers!"
          />
        </div>

        <h4 className="text-sm font-bold mt-3">
          United Nation’s Food Programme 2024{" "}
        </h4>
        <p className="text-[#676E77] text-xs mt-2">
          Share an exciting opportunity with your network
        </p>

        <p className="text-xs text-[#676E77] mt-3">Posted 2days ago</p>

        <KadaButton
          className="w-full rounded-full mt-4"
          rightIcon={<ArrowRightIcon className="w-4 h-4 ml-2" />}
          onClick={() =>
            openDrawer({
              view: <ExploreOpportunityDraewr close={closeDrawer} />,
              placement: "right",
              size: "lg",
              conatainerClassName: "rounded-l-xl",
            })
          }
        >
          Apply Now
        </KadaButton>
      </div>
    </div>
  );
}

export default CooperativeOpportunitiesSharedPage;

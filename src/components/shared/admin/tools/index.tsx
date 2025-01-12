"use client";
import Input from "@/components/form/input";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { SearchIcon } from "@/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const tools = [
  {
    name: "Cropping Calendar",
    description:
      "Get timely crop-specific planting guidelines and best practice tips for optimized yields.",
    color: "#F7D150",
    link: "/cropping-calendar",
  },
  // {
  //   name: "Price Calculator",
  //   description:
  //     "Calculate product costs accurately across markets for smart budgeting and pricing",
  //   color: "#E7413E",
  //   link: "/pricing",
  // },
  {
    name: "Market Information",
    description:
      "Access real-time market insights and trends to make informed purchasing and selling decisions",
    color: "#5A96EA",
    link: "/market-information",
  },
  {
    name: "Certificate Issuance",
    description:
      "Access real-time market insights and trends to make informed purchasing and selling decisions",
    color: "#5A96EA",
    link: "/certificate-issuance",
  },
];

function ToolsSharedPage() {
  useDashboardTitle("Tools");
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h4 className="text-base font-bold text-[#343A3F]">
          Explore Kada Toolbox
        </h4>

        <div className="">
          <Input
            placeholder="Search here..."
            inputClassName="!rounded-[10px] !h-[36px]"
            className="!w-[500px]"
            prefix={<SearchIcon className="fill-black" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols- xl:grid-cols-4">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="p-6 bg-white border border-[#ECF2F6] shadow-[-6px_-1px_40px_6px_#ECEBEB] rounded-2xl"
          >
            <div
              className="w-6 h-6 rounded"
              style={{ backgroundColor: tool.color }}
            />

            <div className="text-sm space-y-2 mt-4">
              <h4 className="text-base text-[#343A3F] font-semibold">
                {tool.name}
              </h4>
              <p className="text-[#343A3F] h-[60px]">{tool.description}</p>
            </div>

            <div className="mt-14">
              <Link
                href={pathname + tool.link}
                className="hover:underline underline-offset-4 text-base"
              >
                Explore
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ToolsSharedPage;

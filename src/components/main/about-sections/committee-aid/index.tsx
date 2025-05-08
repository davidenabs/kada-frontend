"use client";
import React, { useState } from "react";
import CommitteeMember from "./members";
import LocalGovernmentSelector from "./lg-sector";
import { Swiper } from "swiper/react";
import Button from "@/components/form/button";
import { committeeMembers, ZoneMembers } from "@/lib/team-data";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const CommunityAids: React.FC = () => {
  const [activeTab, setActiveTab] = useState("DIRECTORATES");

  const renderCommitteeContent = () => {
    if (activeTab === "KALAC") {
      return <p></p>;
      return (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={30}
          slidesPerView={1} // Adjust the number of slides per view
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className="mt-9 max-md:max-w-full"
        >
          {/* <div className="grid md:grid-cols-3 gap-10 items-start mt-9 max-md:max-w-full">
            {committeeMembers.slice().map((member, index) => (
              <CommitteeMember key={index} {...member} />
            ))}
          </div> */}
        </Swiper>
      );
    } else if (activeTab === "KAWAC") {
      return <p></p>;
    } else if (activeTab === "ZACO") {
      return <p></p>;
    } else if (activeTab === "SADEC") {
      return <p></p>;
    } else if (activeTab === "DIRECTORATES") {
      return (
        <>
          <div className="grid md:grid-cols-3 gap-10 items-start mt-9 max-md:max-w-full">
            {committeeMembers.slice().map((member, index) => (
              <CommitteeMember key={index} {...member} />
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <div className="app_container py-[123px] md:py-[165px] flex flex-col">
      <section className="flex flex-wrap gap-5 justify-center ">
        <div className="flex flex-col items-center self-start max-md:max-w-full">
          {/* <h1 className="text-3xl font-bold leading-tight text-right text-zinc-700">
            COMMUNITY AIDS
          </h1> */}
          <div className="flex max-md:flex-col gap-5 md:justify-between md:items-end self-stretch mt-7 w-full text-base text-center max-md:max-w-full">
            {/* <LocalGovernmentSelector /> */}
            {/* buttons to tap */}
            <div className="flex w-full gap-3 mt-7 font-bold whitespace-nowrap overflow-auto justify-center">
              {/* <Button
                className={`px-16 !py-2 rounded-[33px] max-md:px-5 !shadow-none ${
                  activeTab === "KALAC"
                    ? "!bg-zinc-700 text-white"
                    : "border-[0.5px] !bg-white text-zinc-700 border-zinc-700"
                }`}
                handleClick={() => setActiveTab("KALAC")}
              >
                KALAC
              </Button>
              <Button
                className={`px-16 !py-2 rounded-[33px] max-md:px-5 !shadow-none ${
                  activeTab === "KAWAC"
                    ? "!bg-zinc-700 text-white"
                    : "border-[0.5px] !bg-white text-zinc-700 border-zinc-700"
                }`}
                handleClick={() => setActiveTab("KAWAC")}
              >
                KAWAC
              </Button>
              <Button
                className={`px-16 !py-2 rounded-[33px] max-md:px-5 !shadow-none ${
                  activeTab === "ZACO"
                    ? "!bg-zinc-700 text-white"
                    : "border-[0.5px] !bg-white text-zinc-700 border-zinc-700"
                }`}
                handleClick={() => setActiveTab("ZACO")}
              >
                ZACO
              </Button>
              <Button
                className={`px-16 !py-2 rounded-[33px] max-md:px-5 !shadow-none ${
                  activeTab === "SADEC"
                    ? "!bg-zinc-700 text-white"
                    : "border-[0.5px] !bg-white text-zinc-700 border-zinc-700"
                }`}
                handleClick={() => setActiveTab("SADEC")}
              >
                SADEC
              </Button> */}
              <div>
                <Button
                  className={`px-16 !py-2 rounded-[33px] max-md:px-5 !shadow-none flex ${
                    activeTab === "DIRECTORATES"
                      ? "!bg-zinc-700 text-white"
                      : "border-[0.5px] !bg-white text-zinc-700 border-zinc-700"
                  }`}
                  handleClick={() => setActiveTab("DIRECTORATES")}
                >
                  DIRECTORATES
                </Button>
              </div>
            </div>
          </div>
          <h2 className="mt-28 text-2xl md:text-3xl text-center font-semibold leading-tight text-zinc-700 max-md:mt-10 max-md:max-w-full">
            {activeTab === "KALAC"
              ? "KADA Local Agric Community (KALAC)"
              : activeTab === "KAWAC"
              ? "KADA Ward Agricultural Community (KAWAC)"
              : activeTab === "ZACO"
              ? "Zonal Agric Development Community (ZACO)"
              : activeTab === "DIRECTORATES"
              ? "Directorate and Zonal Zanagers"
              : " (SADEC)"}
          </h2>
          {renderCommitteeContent()}
        </div>
      </section>
    </div>
  );
};

export default CommunityAids;

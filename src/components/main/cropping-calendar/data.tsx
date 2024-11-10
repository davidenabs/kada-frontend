import { Crop } from "@/lib/crop-data";
import { cn } from "rizzui";
import React, { useState } from "react";

type SidebarDataProps = {
  type: "date-range" | "cropping-stage";
  data: Crop;
  currentIndex: number;
  handleSelect: (index: number) => void;
};

type DetailDataProps = {
  type: "date-range" | "cropping-stage";
  data: Crop;
  currentIndex: number;
  handleSelect: (index: number) => void;
};

function SidebarItem({
  name,
  index,
  currentIndex,
  handleSelect,
}: {
  name: string;
  index: number;
  currentIndex: number;
  handleSelect: (index: number) => void;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-[10px] p-[10px] rounded-lg text-[#21373B] cursor-pointer",
        currentIndex === index && "bg-[#506561] text-white"
      )}
      onClick={() => handleSelect(index)}
    >
      <div
        className={cn(
          "rounded-full h-4 w-4 border border-[#DEE4E7]",
          currentIndex === index && "border-[#5FCFB8] bg-[#678A83]"
        )}
      ></div>
      <span className="">{name}</span>
    </li>
  );
}

function SidebarData({
  type,
  data,
  currentIndex,
  handleSelect,
}: SidebarDataProps) {
  return (
    <section className="px-3 py-6">
      <h4 className="text-[#343A3F] text-base font-bold">
        {type === "date-range" ? "Date Ranges" : "Cropping Stages"}
      </h4>

      <div className="">
        <ul className="space-y-[14px]">
          {type === "date-range"
            ? data.seasons.map((season, index) => (
                <SidebarItem
                  key={season.name}
                  name={season.period}
                  index={index}
                  currentIndex={currentIndex}
                  handleSelect={handleSelect}
                />
              ))
            : data.stages.map((stage, index) => (
                <SidebarItem
                  key={stage.name}
                  name={stage.name}
                  index={index}
                  currentIndex={currentIndex}
                  handleSelect={handleSelect}
                />
              ))}
        </ul>
      </div>
    </section>
  );
}

const Attribute = ({ label, value }: { label: string; value: string }) => (
  <div>
    <h6 className="text-[#697077] text-sm">{label}</h6>
    <p className="text-[#4D5358] text-sm">{value}</p>
  </div>
);

function DetailData({ data, type, currentIndex }: DetailDataProps) {
  const isDateRange = type === "date-range";
  const currentStage = data.stages?.[currentIndex] || {};
  const currentSeason = data.seasons?.[currentIndex] || {};

  return (
    <section className="">
      <div className="bg-[#E7ECE8] border-l-2 border-[#205B42] flex gap-6 text-sm py-3 px-5">
        <span className="text-[#4D5358]">
          Showing Crop information by date ranges
        </span>
        <span className="font-bold text-[#00A551] text-sm">{data.name}</span>
        <span>January-February, 2024</span>
      </div>
      {/* Main Details */}
      <div className="border-l-2 border-[#0BCE6B] px-10 py-6 space-y-3">
        <div>
          <h4 className="text-2xl font-semibold text-[#697077]">{data.name}</h4>
          <h6 className={`text-[#697077] text-sm`}>{data.description}</h6>
        </div>

        {/* Attributes */}
        <div className="flex gap-10">
          <Attribute label="Scientific Name" value={data.scientificName} />
          <Attribute label="Ideal Temperature" value={data.idealTemperature} />
          <Attribute
            label="Water Requirements"
            value={data.waterRequirements}
          />
          <Attribute label="Soil Type" value={data.soilType} />
        </div>
      </div>

      <div className="border-t border-[#ECF2F6] px-5 py-7">
        {isDateRange ? (
          <>
            <div>
              <h6 className={`text-[#697077] text-sm`}>Activities</h6>
              <ul className="list-disc list-inside text-sm">
                {currentSeason.activities?.map((activity, idx) => (
                  <li key={idx} className={`text-[#4D5358] text-sm`}>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <Attribute label="Name" value={currentStage.name} />
            <Attribute label="Description" value={currentStage.description} />
            <Attribute label="Duration" value={currentStage.duration} />
            <div>
              <h6 className={`text-[#697077] text-sm`}>Tasks</h6>
              <ul className="list-disc list-inside text-sm">
                {currentStage.tasks?.map((task, idx) => (
                  <li key={idx} className={`text-[#4D5358] text-sm`}>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export { SidebarData, DetailData };

import { cn, Table } from "rizzui";
import React, { useState } from "react";
import { ICrop } from "@/interface/crop";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "@/utils/utils";

type SidebarDataProps = {
  type: "date-range" | "cropping-stage";
  data: ICrop;
  currentIndex: number;
  handleSelect: (index: number) => void;
};

type DetailDataProps = {
  type?: "date-range" | "cropping-stage";
  data: ICrop | null;
  currentIndex?: number;
  handleSelect?: (index: number) => void;
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
      {/* <h4 className="text-[#343A3F] text-base font-bold">
        {type === "date-range" ? "Date Ranges" : "Cropping Stages"}
      </h4> */}

      <div className="">
        {/* <ul className="space-y-[14px]">
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
        </ul> */}
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
  const [expandedSeason, setExpandedSeason] = useState<number | null>(null);
  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  const toggleSeason = (index: number) => {
    setExpandedSeason(expandedSeason === index ? null : index);
    setExpandedStage(null);
  };

  const toggleStage = (index: number) => {
    setExpandedStage(expandedStage === index ? null : index);
  };

  return (
    <section className="">
      <div className="bg-[#E7ECE8] border-l-2 border-[#205B42] flex gap-6 text-sm py-3 px-5">
        <span className="text-[#4D5358]">
          Showing Crop information {/* by date ranges */}
        </span>
        <span className="font-bold text-[#00A551] text-sm">{data?.name}</span>
        {/* <span>January-February, 2024</span> */}
      </div>
      {/* Main Details */}
      <div className="border-l-2 border-[#0BCE6B] px-10 py-6 space-y-3">
        <div>
          <h4 className="text-2xl font-semibold text-[#697077]">
            {data?.name}
          </h4>
          <h6 className={`text-[#697077] text-sm`}>{data?.description}</h6>
        </div>

        {/* Attributes */}
        <div className="flex gap-10">
          <Attribute label="Scientific Name" value={data!.scientificName} />
          <Attribute label="Ideal Temperature" value={data!.idealTemperature} />
          <Attribute
            label="Water Requirements"
            value={data!.waterRequirements}
          />
          <Attribute label="Soil Type" value={data!.soilType} />
        </div>
      </div>

      <div className="border-t border-[#ECF2F6] px-5 py-7">
        <h6 className="text-[#697077] text-lg font-semibold mb-4">
          Crop Seasons
        </h6>

        {data?.seasons.map((season, seasonIndex) => (
          <div
            key={seasonIndex}
            className="mb-4 border rounded-lg overflow-hidden"
          >
            <div
              className={`flex justify-between items-center p-4 cursor-pointer ${
                season.isRecommended ? "bg-green-50" : "bg-gray-50"
              }`}
              onClick={() => toggleSeason(seasonIndex)}
            >
              <div>
                <h3 className="font-medium text-[#4D5358]">{season.name}</h3>
                <p className="text-sm text-[#697077]">{season.period}</p>
              </div>
              {expandedSeason === seasonIndex ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </div>

            {expandedSeason === seasonIndex && (
              <div className="p-4">
                {season.stages.map((stage, stageIndex) => (
                  <div key={stageIndex} className="mb-4 border rounded">
                    <div
                      className={`flex justify-between items-center p-3 cursor-pointer ${
                        stage.isRecommended ? "bg-blue-50" : "bg-gray-50"
                      }`}
                      onClick={() => toggleStage(stageIndex)}
                    >
                      <div>
                        <h4 className="font-medium">{stage.name}</h4>
                        <p className="text-sm text-[#697077]">
                          {stage.start} - {stage.stop} {stage.duration_unit}
                        </p>
                      </div>
                      {expandedStage === stageIndex ? (
                        <ChevronUpIcon className="w-4 h-4" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4" />
                      )}
                    </div>

                    {expandedStage === stageIndex && (
                      <div className="p-3">
                        <p className="text-sm mb-2">{stage.description}</p>
                        <p className="text-sm">Phase: {stage.phase}</p>
                        <h5 className="font-medium mt-3 mb-2">Tasks:</h5>
                        <ul className="list-disc list-inside text-sm">
                          {stage?.tasks?.map((task, taskIndex) => (
                            <li key={taskIndex}>{task.description}</li>
                          ))}
                        </ul>
                        {stage?.activities?.length > 0 && (
                          <>
                            <h5 className="font-medium mt-4 mb-2">
                              Activities:
                            </h5>
                            {stage.activities.map((activity, activityIndex) => (
                              <div
                                key={activityIndex}
                                className="mb-3 space-y-4"
                              >
                                <h6 className="font-medium">
                                  Name: {activity.name}
                                </h6>
                                <p className="text-sm">
                                  Subtotal: &#8358;{activity.subtotal}
                                </p>

                                <div className="">
                                  <p className="text-sm">Details:</p>
                                  <Table
                                    variant="minimal"
                                    className="rounded-lg"
                                  >
                                    <Table.Header>
                                      <Table.Row>
                                        <Table.Head>Description</Table.Head>
                                        <Table.Head>Quantity</Table.Head>
                                        <Table.Head>Unit Cost</Table.Head>
                                        <Table.Head>Total Cost</Table.Head>
                                      </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                      {activity.details.map((detail, idx) => (
                                        <Table.Row key={idx}>
                                          <Table.Cell>
                                            {detail.description}
                                          </Table.Cell>
                                          <Table.Cell>
                                            {detail.quantity} {detail.unit}
                                          </Table.Cell>
                                          <Table.Cell>
                                            {formatCurrency(detail.unit_cost)}
                                          </Table.Cell>
                                          <Table.Cell>
                                            {formatCurrency(detail.total_cost)}
                                          </Table.Cell>
                                        </Table.Row>
                                      ))}
                                    </Table.Body>
                                  </Table>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export { SidebarData, DetailData };

import { Activity, ICrop } from "@/interface/crop";
import React from "react";
import CropActivities from "@/components/main/cropping-calendar/crop-activities";
import {
  ArrowDownIcon,
  ChevronDoubleDownIcon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";
import { Table } from "rizzui";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const Attribute = ({ label, value }: { label: string; value: string }) => (
  <div>
    <h6 className="text-[#697077] text-sm">{label}</h6>
    <p className="text-[#4D5358] text-sm">{value}</p>
  </div>
);

function CropDetails({ crop }: { crop: ICrop | null }) {
  // State to manage the visibility of the main content details
  const [isOpen, setIsOpen] = React.useState(false);

  // Function to toggle the visibility
  const toggleDetails = () => {
    setIsOpen((prev) => !prev);
  };
  const [expandedSeason, setExpandedSeason] = React.useState<number | null>(
    null
  );
  const [expandedStage, setExpandedStage] = React.useState<number | null>(null);

  const toggleSeason = (index: number) => {
    setExpandedSeason(expandedSeason === index ? null : index);
    setExpandedStage(null);
  };

  const toggleStage = (index: number) => {
    setExpandedStage(expandedStage === index ? null : index);
  };

  // const [activityStatus, setActivityStatus] = React.useState<any>({});
  // const { mutateAsync, isPending } = useUpdateFarmActivityLogMutation();

  // const handleActivityAction = async (farmActivityLogId: string) => {
  //     setActivityStatus(farmActivityLogId);
  //     await mutateAsync({ farmActivityLogId }, {
  //         onSuccess: (response) => {
  //             if (response.success) {
  //                 toast.success("Activity log updated successfully");
  //             }
  //         },
  //         onError: (error) => {
  //             console.error(`Failed to update activity:`, error);
  //         },
  //     });
  // };

  return (
    <section className="mt-6 p-2 border border-teal-700 border-opacity-30 rounded-[5px]">
      {/* Crop Header Section */}
      <div
        className="bg-[#E7ECE8] border-l-2 border-[#205B42] flex justify-between text-sm py-3 px-5 cursor-pointer"
        onClick={toggleDetails}
      >
        <div className="flex items-center gap-6">
          <span className="text-[#4D5358]">Showing Crop information</span>
          <span className="font-bold text-[#00A551] text-sm">{crop!.name}</span>
        </div>
        <span>
          <ChevronDownIcon
            className={`w-5 h-5 fill-[#205B42] transition-transform duration-300 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </span>
      </div>
      {/* Main Details, by default it should collapse */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="w-full">
          <div className="border-l-2 border-[#0BCE6B] px-10 py-6 space-y-3">
            <div>
              <h4 className="text-2xl font-semibold text-[#697077]">
                {crop!.name}
              </h4>
              <h6 className={`text-[#697077] text-sm`}>{crop?.description}</h6>
            </div>

            {/* Attributes */}
            <div className="flex gap-10">
              <Attribute label="Scientific Name" value={crop!.scientificName} />
              <Attribute
                label="Ideal Temperature"
                value={crop!.idealTemperature}
              />
              <Attribute
                label="Water Requirements"
                value={crop!.waterRequirements}
              />
              <Attribute label="Soil Type" value={crop!.soilType} />
            </div>
          </div>

          {/* <div className="border-t border-[#ECF2F6] px-5 py-7 ">
            <CropActivities activities={activities} />
          </div> */}

          <div className="border-t border-[#ECF2F6] px-5 py-7">
            <h6 className="text-[#697077] text-lg font-semibold mb-4">
              Crop Seasons
            </h6>

            {crop?.seasons.map((season, seasonIndex) => (
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
                    <h3 className="font-medium text-[#4D5358]">
                      {season.name}
                    </h3>
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
                                {stage.activities.map(
                                  (activity, activityIndex) => (
                                    <div key={activityIndex} className="mb-3">
                                      <h6 className="font-medium">
                                        {activity.name}
                                      </h6>
                                      <p className="text-sm">
                                        Subtotal: &#8358;{activity.subtotal}
                                      </p>

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
                                          {activity.details.map(
                                            (detail, idx) => (
                                              <Table.Row key={idx}>
                                                <Table.Cell>
                                                  {detail.description}
                                                </Table.Cell>
                                                <Table.Cell>
                                                  {detail.quantity}{" "}
                                                  {detail.unit}
                                                </Table.Cell>
                                                <Table.Cell>
                                                  &#8358;{detail.unit_cost}
                                                </Table.Cell>
                                                <Table.Cell>
                                                  &#8358;{detail.total_cost}
                                                </Table.Cell>
                                              </Table.Row>
                                            )
                                          )}
                                        </Table.Body>
                                      </Table>
                                    </div>
                                  )
                                )}
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
        </div>
      </div>
    </section>
  );
}

export default CropDetails;

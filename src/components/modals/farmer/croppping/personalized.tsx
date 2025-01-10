import { CloseIcon } from "@/icons";
import React, { Fragment } from "react";
import "react-quill/dist/quill.snow.css";
import { useCreateCmsPostMutation } from "@/app/_api/cms";
import { toast } from "sonner";
import { KadaButton } from "@/components/form/button";
import AddCroppping from "./add";
import { useGetPersonalizedCroppingQuery } from "@/app/_api/farm";
import { ICrop } from "@/interface/crop";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Table } from "rizzui";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/utils";

type PostOpportunityModalProps = {
  close: () => void;
  data: any;
};

const Attribute = ({ label, value }: { label: string; value: string }) => (
  <div>
    <h6 className="text-[#697077] text-sm">{label}</h6>
    <p className="text-[#4D5358] text-sm">{value}</p>
  </div>
);

function PersonalizedCropping({ close, data }: PostOpportunityModalProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [crop, setCrop] = React.useState<ICrop | null>(null);
  const [open, setOpen] = React.useState(false);
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

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = () => fileInputRef.current?.click();
  const {
    data: croppingData,
    isFetching,
    isRefetching,
    isError,
  } = useGetPersonalizedCroppingQuery({
    enabled: loaded,
  });

  React.useEffect(() => {
    if (croppingData && !isFetching && !isRefetching && !isError) {
      console.log(croppingData, "here data");
      //   const = croppingData.data.items;
      //   setCrop({
      //     ...data,
      //     cropping: croppingData?.data || [],
      //   });
    }
  }, [croppingData, isFetching, isRefetching, isError]);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Fragment>
      {open && (
        <AddCroppping close={() => setOpen(false)} open={open} crop={data} />
      )}
      <section className="w-full bg-white rounded-xl">
        <header className="flex items-center justify-between border-b px-6 py-4 bg-[#F9F9F9] rounded-t-xl">
          <h4 className="text-base font-semibold">
            Personalized Cropping Calendar
          </h4>

          <button onClick={close}>
            <CloseIcon className="w-4 h-4" />
          </button>
        </header>

        <div className="p-6">
          <div className="flex justify-end">
            <KadaButton
              className="!rounded-full h-[30px] !bg-slate-400"
              onClick={() => setOpen(true)}
            >
              Add New
            </KadaButton>
          </div>
          {croppingData?.data.items.map((item: any) => (
            <>
              <section className="mt-6 p-2 border border-teal-700 border-opacity-30 rounded-[5px]">
                <div
                  className="bg-[#E7ECE8] border-l-2 border-[#205B42] flex justify-between text-sm py-3 px-5 cursor-pointer"
                  onClick={toggleDetails}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-[#4D5358]">
                      Showing Crop information
                    </span>
                    <span className="font-bold text-[#00A551] text-sm">
                      {item!.crop.name}
                    </span>
                  </div>
                  <span>
                    <ChevronDownIcon
                      className={`w-5 h-5 fill-[#205B42] transition-transform duration-300 ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </span>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <div className="w-full">
                    <div className="border-l-2 border-[#0BCE6B] px-10 py-6 space-y-3">
                      <div>
                        <h4 className="text-2xl font-semibold text-[#697077]">
                          {item?.crop.name}
                        </h4>
                        <h6 className={`text-[#697077] text-sm`}>
                          {item?.crop?.description}
                        </h6>
                      </div>

                      {/* Attributes */}
                      <div className="flex gap-10">
                        <Attribute
                          label="Scientific Name"
                          value={item?.crop?.scientificName}
                        />
                        <Attribute
                          label="Ideal Temperature"
                          value={item?.crop?.idealTemperature}
                        />
                        <Attribute
                          label="Water Requirements"
                          value={item?.crop?.waterRequirements}
                        />
                        <Attribute
                          label="Soil Type"
                          value={item?.crop?.soilType}
                        />
                      </div>
                    </div>

                    <div className="border-t border-[#ECF2F6] px-5 py-7">
                      <h6 className="text-[#697077] text-lg font-semibold mb-4">
                        Crop Season
                      </h6>

                      <div className="grid grid-cols-2 gap-y-4 mb-4">
                        <Attribute
                          label="Planting Date"
                          value={format(
                            item?.plantingDate || new Date(),
                            "dd MMM, yyyy"
                          )}
                        />
                        <Attribute
                          label="Start Date"
                          value={format(
                            item?.startDate || new Date(),
                            "dd MMM, yyyy"
                          )}
                        />
                        <Attribute
                          label="End Date"
                          value={format(
                            item?.endDate || new Date(),
                            "dd MMM, yyyy"
                          )}
                        />
                      </div>

                      <div className="mb-4 border rounded-lg overflow-hidden">
                        <div
                          className={`flex justify-between items-center p-4 cursor-pointer ${
                            item?.season.isRecommended
                              ? "bg-green-50"
                              : "bg-gray-50"
                          }`}
                        >
                          <div>
                            <h3 className="font-medium text-[#4D5358]">
                              {item?.season.name}
                            </h3>
                            <p className="text-sm text-[#697077]">
                              {item?.season.period}
                            </p>
                          </div>
                        </div>

                        <div className="p-4">
                          {item?.season.stages.map(
                            (stage: any, stageIndex: any) => (
                              <div
                                key={stageIndex}
                                className="mb-4 border rounded"
                              >
                                <div
                                  className={`flex justify-between items-center p-3 cursor-pointer ${
                                    stage.isRecommended
                                      ? "bg-blue-50"
                                      : "bg-gray-50"
                                  }`}
                                  onClick={() => toggleStage(stageIndex)}
                                >
                                  <div>
                                    <h4 className="font-medium">
                                      {stage.name}
                                    </h4>
                                    <p className="text-sm text-[#697077]">
                                      {stage.start} - {stage.stop}{" "}
                                      {stage.duration_unit}
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
                                    <p className="text-sm mb-2">
                                      {stage.description}
                                    </p>

                                    <p className="text-sm">
                                      Phase: {stage.phase}
                                    </p>
                                    <h5 className="font-medium mt-3 mb-2">
                                      Tasks:
                                    </h5>
                                    <ul className="list-disc list-inside text-sm">
                                      {stage?.tasks?.map(
                                        (task: any, taskIndex: any) => (
                                          <li key={taskIndex}>
                                            {task.description}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                    {stage?.activities?.length > 0 && (
                                      <>
                                        <h5 className="font-medium mt-4 mb-2">
                                          Activities:
                                        </h5>
                                        {stage.activities.map(
                                          (
                                            activity: any,
                                            activityIndex: any
                                          ) => (
                                            <div
                                              key={activityIndex}
                                              className="mb-3"
                                            >
                                              <h6 className="font-medium">
                                                {activity.name}
                                              </h6>
                                              <p className="text-sm">
                                                Subtotal: &#8358;
                                                {activity.subtotal}
                                              </p>

                                              <Table
                                                variant="minimal"
                                                className="rounded-lg"
                                              >
                                                <Table.Header>
                                                  <Table.Row>
                                                    <Table.Head>
                                                      Description
                                                    </Table.Head>
                                                    <Table.Head>
                                                      Quantity
                                                    </Table.Head>
                                                    <Table.Head>
                                                      Unit Cost
                                                    </Table.Head>
                                                    <Table.Head>
                                                      Total Cost
                                                    </Table.Head>
                                                  </Table.Row>
                                                </Table.Header>
                                                <Table.Body>
                                                  {activity.details.map(
                                                    (detail: any, idx: any) => (
                                                      <Table.Row key={idx}>
                                                        <Table.Cell>
                                                          {detail.description}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                          {detail.quantity}{" "}
                                                          {detail.unit}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                          {formatCurrency(
                                                            detail.unit_cost
                                                          )}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                          {formatCurrency(
                                                            detail.total_cost
                                                          )}
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
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ))}
        </div>
      </section>
    </Fragment>
  );
}

export default PersonalizedCropping;

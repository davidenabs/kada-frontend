import { ICrop } from "@/interface/crop";
import React from "react";
import { IActivityLog } from "@/interface/farm";
import { useUpdateFarmActivityLogMutation } from "@/app/_api/farm";
import { toast } from "sonner";
import { KadaButton } from "@/components/form/button";


// const FarmActivities = ({ activityLogs }: { activityLogs: IActivityLog[] | null }) => {

//     const checkExpired = (expiredAt: Date) => {
//         const currentDate = new Date();
//         const expiryDate = new Date(expiredAt);
//         return currentDate > expiryDate;
//     };

//     return (
//         <ul className="list-disc list-inside text-sm">
//             {activityLogs?.map((log, idx) => {
//                 const isExpired = checkExpired(new Date(log.expiredAt));
//                 const isCompleted = log.status;

//                 return (
//                     <li
//                         key={idx}
//                         className="text-[#4D5358] text-sm flex items-center justify-between mt-2"
//                     >
//                         {log.activity.description}

//                         <button
//                             disabled={isCompleted || isExpired}
//                             className={`ml-4 text-sm px-3 py-1 rounded-md ${isCompleted
//                                 ? 'bg-green-500 text-white'
//                                 : isExpired
//                                     ? 'bg-red-500 text-white'
//                                     : 'bg-gray-300 text-gray-700'
//                                 }`}
//                         >
//                             {isCompleted
//                                 ? 'Completed'
//                                 : isExpired
//                                     ? 'Expired'
//                                     : 'Mark as Completed'}
//                         </button>
//                     </li>
//                 );
//             })}
//         </ul>
//     );
// };



const Attribute = ({ label, value }: { label: string; value: string }) => (
    <div>
        <h6 className="text-[#697077] text-sm">{label}</h6>
        <p className="text-[#4D5358] text-sm">{value}</p>
    </div>
);

function CropDetails({ crop, activityLogs }: { crop: ICrop | null, activityLogs: IActivityLog[] | null }) {
    const [activityStatus, setActivityStatus] = React.useState<any>({});
    const { mutateAsync, isPending } = useUpdateFarmActivityLogMutation();

    const handleActivityAction = async (farmActivityLogId: string) => {
        setActivityStatus(farmActivityLogId);
        await mutateAsync({ farmActivityLogId }, {
            onSuccess: (response) => {
                if (response.success) {
                    toast.success("Activity log updated successfully");
                }
            },
            onError: (error) => {
                console.error(`Failed to update activity:`, error);
            },
        });
    };

    return (
        <section className="mt-6 p-2 border border-teal-700 border-opacity-30 rounded-[5px]">
            {/* Crop Header Section */}
            <div className="bg-[#E7ECE8] border-l-2 border-[#205B42] flex gap-6 text-sm py-3 px-5">
                <span className="text-[#4D5358]">
                    Showing Crop information by date ranges
                </span>
                <span className="font-bold text-[#00A551] text-sm">{crop!.name}</span>
                <span>January-February, 2024</span>
            </div>
            {/* Main Details */}
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
                    <Attribute label="Ideal Temperature" value={crop!.idealTemperature} />
                    <Attribute
                        label="Water Requirements"
                        value={crop!.waterRequirements}
                    />
                    <Attribute label="Soil Type" value={crop!.soilType} />
                </div>
            </div>

            <div className="border-t border-[#ECF2F6] px-5 py-7">
                {/* Cropping Stages Section */}
                <div className="mt-6">
                    {crop!.stages?.map((stage, idx) => (
                        <div className="space-y-4">
                            <Attribute label="Name" value={stage!.name} />
                            <Attribute label="Description" value={stage!.description} />
                            <Attribute label="Duration" value={stage!.duration} />
                            <div>
                                <h6 className={`text-[#697077] text-sm`}>Tasks</h6>
                                <ul className="list-disc list-inside text-sm">

                                    {stage?.tasks?.map((task, idx) => (
                                        <li key={idx} className={`text-[#4D5358] text-sm`}>
                                            {task.description}
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Date Range Section */}
                <div className="mt-6">
                    <h5 className="text-lg font-semibold text-gray-700">Date Ranges</h5>
                    {crop!.seasons?.map((season) => (
                        <div key={season.id} className="mt-4 border-b pb-4">
                            <h6 className="text-md font-medium text-gray-800">{season.name}</h6>
                            <p className="text-sm text-gray-500">{season.period}</p>
                            <div className="mt-4">
                                <h6 className="text-sm font-medium">Activities:</h6>
                                <div>
                                    {activityLogs!.length > 0 ? (
                                        <ul className="list-disc list-inside text-sm ml-2">
                                            {activityLogs!.map((log) => (
                                                <li key={log.id} className={`text-[#4D5358] text-sm flex items-center justify-between mt-2`}>
                                                    &bull; {log.activity.description}
                                                    <KadaButton
                                                        loading={isPending && activityStatus == log.id}
                                                        onClick={() => handleActivityAction(log.id)}
                                                        className={`ml-4 text-sm px-3 py-1 rounded-md ${log.status
                                                            ? "!bg-green-500 !text-white" // Completed
                                                            : new Date(log.expiredAt) < new Date()
                                                                ? "!bg-red-500 !text-white" // Time has expired
                                                                : "!bg-gray-300 !text-gray-700" // Mark as Completed
                                                            }`}
                                                    >
                                                        {log.status
                                                            ? "Completed"
                                                            : new Date(log.expiredAt) < new Date()
                                                                ? "Time has expired"
                                                                : "Mark as Completed"}
                                                    </KadaButton>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No activity logs for this crop.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </section>
    );
}

export default CropDetails;

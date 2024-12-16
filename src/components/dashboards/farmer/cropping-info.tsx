import { Activity, ICrop } from "@/interface/crop";
import React from "react";
import CropActivities from "@/components/main/cropping-calendar/crop-activities";

const Attribute = ({ label, value }: { label: string; value: string }) => (
    <div>
        <h6 className="text-[#697077] text-sm">{label}</h6>
        <p className="text-[#4D5358] text-sm">{value}</p>
    </div>
);

function CropDetails({ crop, activities }: { crop: ICrop | null, activities: Activity[] | undefined }) {
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
            <div className="bg-[#E7ECE8] border-l-2 border-[#205B42] flex gap-6 text-sm py-3 px-5">
                <span className="text-[#4D5358]">
                    Showing Crop information
                </span>
                <span className="font-bold text-[#00A551] text-sm">{crop!.name}</span>
                {/* <span>January-February, 2024</span> */}
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
                <CropActivities activities={activities} />
            </div>


        </section>
    );
}

export default CropDetails;

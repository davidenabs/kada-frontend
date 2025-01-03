import React from "react";
import { useForm } from "react-hook-form";
import { useVerifyFarmMutation } from "@/app/_api/farm";
import { toast } from "sonner";
import Image from "next/image";
import { IFarm } from "@/interface/farm";
import Button from "@/components/form/button";

const FarmData = ({ farm, close }: { farm: IFarm, close: () => void }): React.JSX.Element => {
    const { handleSubmit } = useForm();
    const { mutateAsync, isPending } = useVerifyFarmMutation();

    const onSubmit = async () => {
        try {
            const response = await mutateAsync({
                data: { isVerified: true },
                id: farm.id,
                farmerId: farm.farmerId,
            });
            if (response.success) {
                toast.success("Farm verified successfully");
                close();
                // window.location.reload();
            }
        } catch (error) {
            toast.error("Verification failed");
        }
    };

    return (
        <div className="text-center max-h-[70vh] overflow-y-scroll p-4">
            <div className="bg-wh p-3">
                <div className="relative w-full h-[105px]">
                    <Image
                        src="/images/crop-thumb.png"
                        className="object-contain"
                        alt="FGSC Farms"
                        fill
                    />
                </div>

                <div className=" mt-6">
                    <h1 className="mt- text-lg font-bold">{farm?.name}</h1>
                    <p className="text-base font-thin pt-1">
                        {farm?.landArea} HECTARES
                    </p>
                    <p className="text-sm font-thin pt-2">
                        LGA: {farm?.lga}
                    </p>
                </div>

                <div className="mt-4">
                    <h4 className="text-[14px]">Crop(s)</h4>
                    <div className="flex flex-wrap gap-[6px] justify-center text-sm font-thin mt-2 w-full text-black/85 whitespace-nowrap">
                        {farm?.crops?.map((crop, index) => (
                            <span
                                key={index + crop.name}
                                className="gap-2.5 self-stretch px-2.5 py-1 rounded border-zinc-200 border-[0.2px]"
                            >
                                {crop.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-4 space-y-4">
                    <h4 className="text-[14px] font-medium">Farming Season</h4>
                    <div className="flex justify-center">
                        <div className="">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    opacity="0.2"
                                    d="M19.5 13.5C19.5 6.75 12 1.5 12 1.5C12 1.5 4.5 6.75 4.5 13.5C4.5 15.4891 5.29018 17.3968 6.6967 18.8033C8.10322 20.2098 10.0109 21 12 21C13.9891 21 15.8968 20.2098 17.3033 18.8033C18.7098 17.3968 19.5 15.4891 19.5 13.5Z"
                                    fill="#5A96EA"
                                />
                                <path
                                    d="M19.5 13.5C19.5 6.75 12 1.5 12 1.5C12 1.5 4.5 6.75 4.5 13.5C4.5 15.4891 5.29018 17.3968 6.6967 18.8033C8.10322 20.2098 10.0109 21 12 21C13.9891 21 15.8968 20.2098 17.3033 18.8033C18.7098 17.3968 19.5 15.4891 19.5 13.5Z"
                                    stroke="#5A96EA"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M12.75 18C14.625 17.6841 16.1822 16.125 16.5 14.25"
                                    stroke="#5A96EA"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                        <span className="font-bold text-sm">{farm.activeSeason}</span>
                    </div>

                    {!farm?.isVerified && <Button handleClick={handleSubmit(onSubmit)} loading={isPending} className="rounded-full">
                        Verify Farm
                    </Button>}
                </div>
            </div>
        </div>
    );
};

export default FarmData;

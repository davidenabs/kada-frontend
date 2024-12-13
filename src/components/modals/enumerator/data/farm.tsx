import React from "react";
import { useForm } from "react-hook-form";
import { useVerifyFarmMutation } from "@/app/_api/farm";
import { toast } from "sonner";
import Image from "next/image";
import CropList from "./crop-list";
import { IFarm } from "@/interface/farm";
import { ICrop } from "@/interface/crop";

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
                window.location.reload();
            }
        } catch (error) {
            toast.error("Verification failed");
        }
    };

    return (
        <div className="farm-data">
            <div className="image-container">
                <Image src="/images/crop-thumb.png" alt="Farm" fill />
            </div>
            <h2>{farm?.name}</h2>
            <p>{farm?.landArea} HECTARES</p>
            <p>LGA: {farm?.lga}</p>
            <CropList crops={farm?.crops as ICrop[]} />
            <button onClick={handleSubmit(onSubmit)} disabled={isPending}>
                Verify Farm
            </button>
        </div>
    );
};

export default FarmData;

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nimcVwrifySchema, nimcVwrifySchemaType } from "@/schema/user";
import { useVerifyNinMutation } from "@/app/_api/user";
import { toast } from "sonner";
import Input from "@/components/form/input";
import KadaButton from "@/components/form/button";
import ProfileDetail from "./profile-details";
import { IUser } from "@/interface/user";
import Link from "next/link";
import { useModal } from "@/hooks/use-modal";
import SubscribeModal from "../../subscribe-modal";

const FarmerData = ({ profile, close }: { profile: IUser, close: () => void }) => {
    const ninData = profile?.farmerProfile?.ninData;
    const { mutateAsync, isPending } = useVerifyNinMutation();
    const { openModal, closeModal } = useModal();
    const [confirm, setConfirm] = React.useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            dob: "",
            nin: "",
            userId: profile?.id,
            phoneNumber: profile?.phoneNumber,
        },
        resolver: zodResolver(nimcVwrifySchema),
    });

    const onSubmit = async (data: any) => {
        try {
            const response = await mutateAsync(data);
            if (response.success) {
                toast.success("User NIN verification was successful");
                close();
                window.location.reload();
            } else {
                toast.error("Invalid OTP");
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleOpenModal = () => {
        openModal({
            customSize: "654px",
            view: <SubscribeModal close={() => setConfirm(false)} open={confirm} onSubscribe={() => { }} loading={false} farmerId={profile?.id} />
        });
    };

    return (
        <div className="w-full max-h-[70vh] overflow-y-scroll p-4">
            {ninData ? (
                <ProfileDetail data={ninData} />
            ) : (
                <>
                    <div className="flex items-center justify-center  text-center text-sm text-gray-400 mb-4">
                        No farmer NIN details available.<br />
                        Please verify user's  NIN
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}>

                        <div className="space-y-4">
                            <Input
                                label="What's your date of birth"
                                type="date"
                                id="dob"
                                placeholder="What is your company name"
                                {...register("dob")}
                                error={errors.dob?.message}
                            />

                            <Input
                                label="Enter your NIN"
                                type="number"
                                id="dob"
                                placeholder="11 digits"
                                {...register("nin")}
                                error={errors.nin?.message}
                            />
                        </div>

                        <KadaButton
                            className="!rounded-full !py-4 mt-3.5 w-full"
                            type="submit"
                            loading={isSubmitting || isPending}
                        >
                            Verify NIN
                        </KadaButton>

                    </form>
                </>
            )}

            <div>
                {(!profile.isSubscribed || !profile.farmerProfile?.cooperative) && ninData && (

                    <>

                        {!profile.isSubscribed ?
                            <KadaButton
                                handleClick={() => handleOpenModal()}
                                className="!rounded-full !py-4 mt-3.5 w-full inline-flex items-center justify-center text-sm !shadow-none !bg-red-800 !text-white gap-2"
                            >
                                <span>Subscribe</span>
                            </KadaButton>
                            :
                            <Link
                                type="button"
                                className="!rounded-full !py-4 mt-3.5 w-full inline-flex items-center justify-center text-sm font-medium transition-colors h-[36px] text-white bg-primary-600"
                                href={`/dashboard/enumerator/cooperative/${profile.id}`}
                            >
                                Join A Cooperative
                            </Link>}
                    </>
                )}
            </div>
        </div>
    );
};

export default FarmerData;

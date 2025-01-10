import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nimcVwrifySchema, nimcVwrifySchemaType } from "@/schema/user";
import { useVerifyNinMutation } from "@/app/_api/user";
import { toast } from "sonner";
import Input from "@/components/form/input";
import KadaButton from "@/components/form/button";
import ProfileDetail from "./profile-details";
import { IUser, UserType } from "@/interface/user";
import Link from "next/link";
import { useModal } from "@/hooks/use-modal";
import SubscribeModal from "../../subscribe-modal";
import { useGetRequestByUserIdAndType, useGetRequests } from "@/app/_api/request";
import { RequestType } from "@/interface/request";
import { Loader } from "rizzui";

const FarmerData = ({ profile, close }: { profile: IUser, close: () => void }) => {
    const [loaded, setLoaded] = React.useState(false);
    const ninData = profile?.farmerProfile?.ninData;
    const { mutateAsync, isPending } = useVerifyNinMutation();
    const { openModal, closeModal } = useModal();
    const [confirm, setConfirm] = React.useState(false);
    // useGetRequests
    const { data: hasCooperative, isFetching, isRefetching } = useGetRequestByUserIdAndType({
        enabled: loaded,
        params: {
            requestType: RequestType.FARMER_TO_COOPERATIVE,
            userId: profile?.id.toString(),
            userType: UserType.FARMER,
            status: ['pending', 'rejected']
        }
    });

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            dob: "",
            nin: "",
        },
        resolver: zodResolver(nimcVwrifySchema),
    });

    const onSubmit = async (data: any) => {
        data.userId = profile?.id;
        data.phoneNumber = profile?.phoneNumber;
        try {
            console.log(data);

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

    // *Set loaded to true when component mounts
    React.useEffect(() => {
        setLoaded(true);
        return () => setLoaded(false);
    }, []);

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
                                className={`!rounded-full !py-4 mt-3.5 w-full inline-flex items-center justify-center text-sm font-medium transition-colors h-[36px] text-white bg-primary-600 ${hasCooperative?.data?.status === 'pending' ? 'pointer-events-none opacity-50' : ''}`}
                                href={`/dashboard/enumerator/cooperative/${profile.id}`}
                                aria-disabled={hasCooperative?.data?.status === 'pending'}
                            >
                                {loaded ? (
                                    hasCooperative?.data?.status !== 'pending' ? "Join A Cooperative" : "Already requested"
                                ) : (
                                    <Loader />
                                )}
                            </Link>}
                    </>
                )}
            </div>
        </div>
    );
};

export default FarmerData;

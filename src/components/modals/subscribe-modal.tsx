import React, { Fragment, useEffect, useState } from "react";
import { CloseIcon } from "@/icons";
import { Loader } from "rizzui";
import Button from "../form/button";
import { useGetMySubscriptionPlan } from "@/app/_api/subscription";
import { ISubscription } from "@/interface/subscription";
import { useForm } from "react-hook-form";
import { useInitiatePaymentMutation } from "@/app/_api/payment";
import { useAtom } from "jotai";
import { userAtom } from "@/stores/user";
import { PaymentPurposeType } from "@/interface/payment";
import { toast } from "sonner";
import { UserType } from "@/interface/user";

const defaultValues = {
    planId: "",
    userId: "",
};

type SubscribeModalProps = {
    open: boolean;
    close: () => void;
    onSubscribe: () => void;
    loading: boolean;
    farmerId?: any
};

const SubscribeModal: React.FC<SubscribeModalProps> = ({
    open,
    close,
    onSubscribe,
    loading,
    farmerId
}) => {
    const [loaded, setLoaded] = useState(false);
    const { data, isFetching, isRefetching } = useGetMySubscriptionPlan(UserType.FARMER);
    const [subscriptionPlan, setSubscriptionPlan] = useState<ISubscription | null>(null);
    const [user] = useAtom(userAtom);
    const [, setIsSubscribed] = useState(false);

    const paymentMutation = useInitiatePaymentMutation();

    const {
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
    });

    React.useEffect(() => {
        if (user.user) {
            const userData = user.user;
            if (userData?.isSubscribed) {
                setIsSubscribed(true);
            }
            reset({

            });
        }
    }, [user]);

    useEffect(() => {
        if ((!isFetching || !isRefetching) && data) {
            setSubscriptionPlan(data.data);
        }
    }, [data, isFetching, isRefetching]);

    useEffect(() => {
        setLoaded(true);
        return () => setLoaded(false);
    }, []);

    const onSubmit = () => {
        console.log(subscriptionPlan!.price);
        const payload = {
            email: user.user!.email,
            amount: parseFloat(subscriptionPlan!.price.toString()),
            currency: "NGN",
            type: "debit",
            purpose: PaymentPurposeType.SUBSCRIPTION,
            userId: farmerId || user.user!.id,
            planId: subscriptionPlan!.id,
            paidBy: {
                userId: user.user!.id,
                name: user.user!.firstName + " " + user.user!.lastName,
            },
            meta: {},
        };

        paymentMutation.mutateAsync(payload, {
            onSuccess: (res) => {
                toast.success("Payment initiated successfully, redirecting...");
                window.location.href = res.data.authorization_url;
            },
        });
    };

    if (!loaded) return null;

    return (
        <Fragment>
            <form className="flex overflow-hidden flex-col w-full rounded-[10px] max-md:max-w-full bg-white p-10" onSubmit={handleSubmit(onSubmit)}>
                <header className="flex justify-between bg-[#FFFFFF] border-b border-[#ECF2F6] p-4">
                    <h1 className="self-start text-2xl font-bold text-green-800">
                        Subscription Plan
                    </h1>
                    <button onClick={close}>
                        <CloseIcon className="w-4 h-4" />
                    </button>
                </header>

                <div className="mt-4 mx-auto w-full">
                    {isFetching || !subscriptionPlan ? (
                        <Loader />
                    ) : (
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 p-2 text-left">Plan Name</th>
                                    <th className="border border-gray-300 p-2 text-left">Amount</th>
                                    <th className="border border-gray-300 p-2 text-left">Duration (Years)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 p-2">{subscriptionPlan.name}</td>
                                    <td className="border border-gray-300 p-2">₦{subscriptionPlan.price}</td>
                                    <td className="border border-gray-300 p-2">{subscriptionPlan.durationInYears}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="w-full mt-6 flex justify-center">
                    <Button
                        type="submit"
                        className="!rounded-full !shadow-none"
                        loading={isSubmitting || paymentMutation.isPending}
                    >
                        Pay Now
                    </Button>
                </div>
            </form>
        </Fragment>
    );
};

export default SubscribeModal;

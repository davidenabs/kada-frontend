"use client";
import { ArrowRightIcon, CloseIcon, MapPinIcon, UsersListIcon } from "@/icons";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { cn } from "rizzui";
import { KadaButton } from "@/components/form/button";
import { IUser } from "@/interface/user";
import { useCreateRequestMutation } from "@/app/_api/request";
import { RequestType } from "@/interface/request";
import { useAtomValue } from "jotai";
import { userAtom } from "@/stores/user";
import { toast } from "sonner";
import ConfirmModal from "../confim-modal";
import { PaymentPurposeType } from "@/interface/payment";
import { useInitiatePaymentMutation } from "@/app/_api/payment";

interface CooperativeInfoModalProps {
  close: () => void;
  cooperative: IUser;
  farmerId?: any;
}

const tabs = [
  {
    id: "about",
    label: "About Cooperative",
  },
  {
    id: "eligibility",
    label: "Eligibility",
  },
  // {
  //   id: "services",
  //   label: "Services",
  // },
];

function CooperativeInfoModal({
  close,
  cooperative,
  farmerId
}: CooperativeInfoModalProps) {
  const user = useAtomValue(userAtom);
  const [activeTab, setActiveTab] = useState("about");
  const [confirm, setConfirm] = useState(false);
  const { mutateAsync, isPending } = useInitiatePaymentMutation();

  const handleJoin = () => {
    toast.dismiss();
    toast.loading("Sending request...");

    const payload = {
      email: user.user!.email,
      amount: cooperative?.cooperativeProfile?.joinAmount as number,
      currency: "NGN",
      type: "debit",
      purpose: PaymentPurposeType.COOPERATIVE_JOIN_REQUEST,
      userId: farmerId || user.user!.id,
      cooperativeProfileId: cooperative?.cooperativeProfile?.id,
      paidBy: {
        userId: user.user!.id,
        name: user.user!.firstName + " " + user.user!.lastName,
      },
      meta: {},
    };

    mutateAsync(payload, {
      onSuccess: (res) => {
        toast.success("Payment initiated successfully, redirecting...");
        close()
        window.location.href = res.data.authorization_url;
        // setIsPaid(true);
      },
    });
  };

  return (
    <Fragment>
      {confirm && (
        <ConfirmModal
          close={() => setConfirm(false)}
          onConfirm={handleJoin}
          open={confirm}
          loading={isPending}
          amount={cooperative?.cooperativeProfile?.joinAmount as number}
        />
      )}
      <section className="flex overflow-hidden flex-col w-full rounded-[10px] max-md:max-w-full bg-white font-inter">
        <header className="flex items-center justify-between border-b px-6 py-2">
          <h4 className="text-base font-semibold">Cooperative Information</h4>

          <button onClick={close}>
            <CloseIcon className="w-4 h-4" />
          </button>
        </header>

        <div className="flex">
          <div className="bg-white w-4/12 py-8">
            <div className="divide-y [&>div]:py-8">
              <div className="flex flex-col items-center px-8">
                <div className="relative w-[122px] h-[122px]">
                  <Image
                    src={cooperative?.imagePath || "/images/bdo.png"}
                    alt="bdo"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>

                <h4 className="text-base text-[#101928] font-semibold mt-6">
                  {cooperative?.cooperativeProfile?.cooperativeName}
                </h4>

                <p className="text-center text-sm font-inter text-[#1D2739]">
                  Empowering local farmers through shared resources and support
                </p>
              </div>

              <div className="px-8 space-y-4">
                <div className="flex justify-center">
                  <span className="text-sm">({cooperative?.phoneNumber})</span>
                </div>
                <div className="flex justify-center items-center my-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="text-xs">{cooperative?.lga || "Kaduna"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <UsersListIcon className="w-[19px] h-[11px] text-[#667185]" />
                    <span className="text-xs">0 Members</span>
                  </div>
                </div>
                <KadaButton
                  className={cn("rounded-full w-full")}
                  rightIcon={
                    <ArrowRightIcon className="w-[18px] h-[18px] fill-white" />
                  }
                  onClick={() => {
                    // toast("Are you sure you want to join this cooperative?", {
                    //   action: {
                    //     label: "Confirm",
                    //     onClick: () => handleJoin(),
                    //   },
                    //   dismissible: true,
                    //   position: "top-center",
                    //   closeButton: true,
                    //   duration: 10000,
                    // });
                    setConfirm(true);
                  }}
                >
                  Request to Join (&#8358;{cooperative.cooperativeProfile?.joinAmount})
                </KadaButton>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-[#F0EFEF] px-4 py-8">
            <div className="flex items-center space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id + tab.label}
                  className={cn(
                    "text-sm text-[#333543] font-inter font-medium bg-[#F8F9FA] inline-flex px-4 rounded-full py-2",
                    activeTab === tab.id && "bg-[#343A3F] text-white"
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="border border-[#ECF2F6] bg-white p-7 mt-8 rounded-2xl">
              <div className="bg-[#F6F6F6] p-4 rounded-lg">
                <h4>
                  {activeTab === "about" && "About Cooperative"}
                  {activeTab === "eligibility" && "Eligibility"}
                  {/* {activeTab === "services" && "Services"} */}
                </h4>

                <p className="text-base mt-4">
                  {activeTab === "about"
                    ? cooperative?.cooperativeProfile?.about ||
                    "No description provided"
                    : activeTab === "eligibility"
                      ? cooperative?.cooperativeProfile?.eligibility ||
                      "No eligibility provided"
                      : null}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default CooperativeInfoModal;

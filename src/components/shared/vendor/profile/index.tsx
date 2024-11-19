"use client";
import React from "react";
import Image from "next/image";
import { VerifiedIcon } from "@/icons";
import { PencilIcon } from "@heroicons/react/16/solid";
import Input from "@/components/form/input";
import { KadaButton } from "@/components/form/button";
import { useModal } from "@/hooks/use-modal";
import EditCooperaativeProfile from "@/components/modals/edit-profile/cooperative";
import { useAtomValue } from "jotai";
import { userAtom } from "@/stores/user";
import { format } from "date-fns";

function VendorProfileSharedPage() {
  const { closeModal, openModal } = useModal();
  const { user } = useAtomValue(userAtom);

  const handleEditClick = () => {
    openModal({
      view: <EditCooperaativeProfile close={closeModal} />,
      customSize: "50%",
    });
  };

  return (
    <div className="flex justify-stretch items-stretch gap-8">
      <div className="flex-1 space-y-6">
        <div className="border border-[#ECF2F6] bg-white rounded-2xl h-[224px] flex items-center px-[50px] bg-[url('/images/profile-pattern.png')] bg-no-repeat bg-cover">
          <div className="flex items-center gap-4">
            <div className="relative w-[99px] h-[99px]">
              <Image
                src="/images/bdo.png"
                alt="bdo"
                fill
                className="object-cover rounded-full"
              />
            </div>

            <div className="">
              <h4 className="text-[18px] font-bold">
                {user?.cooperativeProfile?.cooperativeName || "N/A"}
              </h4>
              <div className="flex items-center space-x-2">
                <VerifiedIcon className="w-4 h-4" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-[#ECF2F6] space-y-2 bg-white p-4 rounded-2xl">
          <div className="flex justify-between">
            <span className="text-[#00A551] text-lg">Bio</span>

            <button onClick={handleEditClick}>
              <PencilIcon className="w-4 h-4 fill-[#00A551]" />
            </button>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Joined</span>

            <div className="flex">
              <span className="text-[#878D96]">
                {format(user?.createdAt || new Date(), "dd MMM, yyyy")}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Email</span>

            <div className="flex">
              <span className="text-[#878D96]">{user?.email || "N/A"}</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Phone</span>

            <div className="flex">
              <span className="text-[#878D96]">
                {user?.phoneNumber || "N/A"}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Address</span>

            <div className="flex">
              <span className="text-[#878D96]">{user?.address || "N/A"}</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">State of Residence</span>

            <div className="flex">
              <span className="text-[#878D96]">Kaduna</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Funding History</span>

            <div className="flex">
              <span className="text-[#878D96]">Kaduna</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Cooperative (0)</span>

            <div className="flex">
              <span className="text-[#878D96]">Kaduna</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[366px] bg-[url('/images/bdo.png')] bg-cover bg-center bg-no-repeat rounded-3xl h-auto flex items-end">
        <div className="bg-white rounded-2xl p-8 flex flex-col justify-center w-full space-y-3">
          <div className="">
            <h4 className="text-2xl text-center font-bold text-[#0D5D34]">
              Having a great <br /> time here?
            </h4>
            <p className="text-center">Invite a Friend</p>
          </div>

          <Input placeholder="Enter email" label="What’s their email?" />

          <KadaButton className="!bg-black text-sm rounded-full">
            Send Invite
          </KadaButton>
        </div>
      </div>
    </div>
  );
}

export default VendorProfileSharedPage;

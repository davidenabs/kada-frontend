"use client";
import { withAuth } from "@/components/common/auth";
import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { Lock, VerifiedIcon } from "@/icons";
import { UserType } from "@/interface/user";
import { userAtom } from "@/stores/user";
import { PencilIcon } from "@heroicons/react/16/solid";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React from "react";

function FarmerProfileSharedPage() {
  useDashboardTitle("Profile");
  const { user } = useAtomValue(userAtom);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <div className="flex justify-stretch items-stretch gap-8">
      <div className="flex-1 space-y-6">
        <div className="border border-[#ECF2F6] bg-white rounded-2xl h-[224px] flex items-center px-[50px] bg-[url('/images/profile-pattern.png')] bg-no-repeat bg-cover">
          <div className="flex items-center gap-4">
            <div className="relative w-[99px] h-[99px]">
              <Image
                src={user?.imagePath ?? "/images/avatar.png"}
                alt={user?.firstName + "Profile Picture"}
                fill
                className="object-cover rounded-full"
              />
            </div>

            <div className="">
              <h4 className="text-[18px] font-bold">
                {user?.firstName} {user?.lastName}
              </h4>
              {user?.verified && (
                <div className="flex items-center space-x-2">
                  <VerifiedIcon className="w-4 h-4" />
                  <span>Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border border-[#ECF2F6] space-y-2 bg-white p-4 rounded-2xl">
          <div className="flex justify-between">
            <span className="text-[#00A551] text-lg">Bio</span>

            <button>
              <PencilIcon className="w-4 h-4 fill-[#00A551]" />
            </button>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Joined</span>

            <div className="flex">
              <span className="text-[#878D96]">20 Dec, 2023</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Email</span>

            <div className="flex">
              <span className="text-[#878D96]">
                {user?.email || "Not available"}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Phone</span>

            <div className="flex">
              <span className="text-[#878D96]">
                {user?.phoneNumber || "Not available"}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Address</span>

            <div className="flex">
              <span className="text-[#878D96]">
                {user?.address ?? "Not Available"}
              </span>
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

export default withAuth(FarmerProfileSharedPage, {
  allowedUserTypes: [UserType.FARMER],
});

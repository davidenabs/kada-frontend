"use client";
import { userAtom } from "@/stores/user";
import { format } from "date-fns";
import { useAtomValue } from "jotai";
import React from "react";

function ProfilePage() {
  const { user } = useAtomValue(userAtom);
  return (
    <>
      <div className="border border-[#ECF2F6] space-y-2 bg-white p-4 rounded-2xl">
        <div className="flex justify-between">
          <span className="text-[#00A551] text-lg">Bio</span>

          {/* <button>
            <PencilIcon className="w-4 h-4 fill-[#00A551]" />
          </button> */}
        </div>

        <div className="flex justify-between">
          <span className="text-lg">Joined</span>

          <div className="flex">
            <span className="text-[#878D96]">
              {format(
                new Date(user?.createdAt ?? new Date()),
                "dd MMM, yyyy"
              ) || "Not available"}
            </span>
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
          <span className="text-lg">ID</span>

          <div className="flex">
            <span className="text-[#878D96]">
              {user?.publicId || "Not available"}
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
          <span className="text-lg">Zone</span>

          <div className="flex">
            <span className="text-[#878D96]">
              {user?.zone ?? "Not Available"}
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-lg">LGA</span>

          <div className="flex">
            <span className="text-[#878D96]">
              {user?.lga ?? "Not Available"}
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-lg">Ward</span>

          <div className="flex">
            <span className="text-[#878D96]">
              {user?.ward ?? "Not Available"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

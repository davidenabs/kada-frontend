"use client";
import React from "react";
import { ArrowRightIcon, CloseIcon, VerifiedIcon } from "@/icons";
import Image from "next/image";
import { KadaButton } from "@/components/form/button";
import { PencilIcon } from "@heroicons/react/16/solid";

type MembershipRequestModalProps = {
  close: () => void;
};

function MembershipRequestModal({ close }: MembershipRequestModalProps) {
  return (
    <section className="flex overflow-hidden flex-col w-full rounded-[10px] max-md:max-w-full bg-white font-inter">
      <header className="flex items-center justify-between border-b px-6 py-2">
        <h4 className="text-base font-semibold">Membership Requests</h4>

        <button onClick={close}>
          <CloseIcon className="w-4 h-4" />
        </button>
      </header>

      <div className="flex bg-[#F7F7F7]">
        <div className="w-[500px] bg-white">
          <div className="flex justify-between px-4 py-3">
            <div className="flex gap-2 items-center">
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src={"https://randomuser.me/api/portraits/women/8.jpg"}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>

              <div>
                <p className="font-medium text-sm">Hafsat Yahaya</p>
                <p className="text-xs text-gray-500">Joined: Jul 2024</p>
              </div>
            </div>

            <div className="">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.2"
                  d="M13.5 20C17.6421 20 21 16.6421 21 12.5C21 8.35786 17.6421 5 13.5 5C9.35786 5 6 8.35786 6 12.5C6 16.6421 9.35786 20 13.5 20Z"
                  fill="#00A551"
                />
                <path
                  d="M25 17H31"
                  stroke="#00A551"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28 14V20"
                  stroke="#00A551"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.5 20C17.6421 20 21 16.6421 21 12.5C21 8.35786 17.6421 5 13.5 5C9.35786 5 6 8.35786 6 12.5C6 16.6421 9.35786 20 13.5 20Z"
                  stroke="#00A551"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 25C5.56875 21.9437 9.195 20 13.5 20C17.805 20 21.4313 21.9437 24 25"
                  stroke="#00A551"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex justify-between px-4 py-3">
            <div className="flex gap-2 items-center">
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src={"https://randomuser.me/api/portraits/women/8.jpg"}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>

              <div>
                <p className="font-medium text-sm">Hafsat Yahaya</p>
                <p className="text-xs text-gray-500">Joined: Jul 2024</p>
              </div>
            </div>

            <div className="flex gap-1">
              <KadaButton
                className="rounded-full !bg-[#00A551]"
                rightIcon={<ArrowRightIcon className="w-4 h-4 fill-white" />}
              >
                Accept
              </KadaButton>
              <KadaButton
                className="rounded-full !bg-[#E7413E]"
                rightIcon={<ArrowRightIcon className="w-4 h-4 fill-white" />}
              >
                Reject
              </KadaButton>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-4">
          <h4 className="text-[18px] font-bold">Requesting-Farmer’s Profile</h4>

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
                <h4 className="text-[18px] font-bold">Ismail Abdulkadir</h4>
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
                <span className="text-[#878D96]">20 Dec, 2023</span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-lg">Phone</span>

              <div className="flex">
                <span className="text-[#878D96]">+234 814 26584 12</span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-lg">Address</span>

              <div className="flex">
                <span className="text-[#878D96]">
                  GreenSprout Agro Mart 12 Independence Way, Kawo, Kaduna,
                  Kaduna State, Nigeria.
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
      </div>
    </section>
  );
}

export default MembershipRequestModal;

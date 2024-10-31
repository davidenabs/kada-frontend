"use client";
import Tab from "@/components/common/tab";
import Input from "@/components/form/input";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  MapPinIcon,
  SearchIcon,
  UsersListIcon,
} from "@/icons";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { KadaButton } from "@/components/form/button";
import cn from "@/utils/class-names";
import { useModal } from "@/hooks/use-modal";
import CooperativeInfoModal from "@/components/modals/cooperative-info";

function FarmerCooperativeSharedPage() {
  const { closeModal, openModal } = useModal();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Approved");
  const tabs = [
    {
      id: "approved",
      label: "Approved",
      badge: 3,
      icon: BriefcaseIcon,
    },
    {
      id: "pending",
      label: "Pending",
      badge: 0,
      icon: BriefcaseIcon,
    },
  ];

  return (
    <div className="font-inter space-y-6">
      <h4 className="text-2xl">Cooperatives (12)</h4>

      <div className="flex-1 space-y-4">
        <div className="bg-white border border-[#ECF2F6] p-6 rounded-2xl space-y-4">
          <div className="flex justify-between">
            <div className="flex">
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  title={tab.label}
                  active={activeTab}
                  onClick={() => setActiveTab(tab.label)}
                  count={Number(tab.badge)}
                  className="max-lg:flex-1"
                  icon={tab.icon}
                />
              ))}
            </div>

            <div className="">
              <Input
                placeholder="Search here..."
                inputClassName="!rounded-[10px]"
                className="!w-[500px]"
                prefix={<SearchIcon />}
              />
            </div>
          </div>
        </div>

        <div className="">
          <div className="grid grid-cols-2">
            <div className="bg-white rounded-2xl border border-[#ECF2F6] p-4">
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => {
                  openModal({
                    customSize: "80%",
                    view: <CooperativeInfoModal close={closeModal} />,
                  });
                }}
              >
                <div className="relative w-[123px] h-[118px]">
                  <Image
                    src="/images/bdo.png"
                    alt="bdo"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div className="">
                      <h4 className="text-[15px] font-semibold font-inter">
                        Cooperative Name
                      </h4>
                      <p className="text-xs mt-1">
                        Empowering local farmers through shared resources and
                        support
                      </p>
                      <div className="flex items-center my-2 gap-4">
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4" />
                          <span className="text-xs">Chikun, Kaduna</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <UsersListIcon className="w-[19px] h-[11px] text-[#667185]" />
                          <span className="text-xs">234 Members</span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <span className="text-sm">(91)</span>
                      </div>
                    </div>

                    <KadaButton
                      className={cn(
                        "rounded-full",
                        "!border-green-500 !bg-[#ECF6F1]"
                      )}
                      variant="outline"
                      onClick={() => router.push("/vendors/cooperative/1")}
                      rightIcon={
                        <ArrowRightIcon className="w-[18px] h-[18px]" />
                      }
                    >
                      Join
                    </KadaButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerCooperativeSharedPage;

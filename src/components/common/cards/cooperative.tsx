"use client";
import React, { Fragment } from "react";
import CooperativeInfoModal from "@/components/modals/cooperative-info";
import Image from "next/image";
import { ModalSize } from "rizzui";
import { ArrowRightIcon, MapPinIcon, UsersListIcon } from "@/icons";
import { KadaButton } from "@/components/form/button";
import { cn } from "rizzui";
import { IUser } from "@/interface/user";

function CooperativeCard({
  openModal,
  closeModal,
  router,
  data,
  farmerId,
}: {
  openModal: ({
    view,
    customSize,
    size,
  }: {
    view: React.ReactNode;
    customSize?: string | undefined;
    size?: ModalSize | undefined;
  }) => void;
  closeModal: () => void;
  router: any;
  data: IUser;
  farmerId?: any;
}) {
  return (
    <Fragment>
      <div className="bg-white rounded-2xl border border-[#ECF2F6] p-4">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => {
            openModal({
              customSize: "80%",
              view: (
                <CooperativeInfoModal close={closeModal} cooperative={data} farmerId={farmerId} />
              ),
            });
          }}
        >
          <div className="relative w-[123px] h-[118px]">
            <Image
              src={data?.imagePath || "/images/bdo.png"}
              alt="bdo"
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div className="">
                <h4 className="text-[15px] font-semibold font-inter">
                  {data?.cooperativeProfile?.cooperativeName}
                </h4>
                <p className="text-xs mt-1">
                  {data?.cooperativeProfile?.about || "No description"}
                </p>
                <div className="flex items-center my-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="text-xs"> {data?.lga || "Kaduna"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <UsersListIcon className="w-[19px] h-[11px] text-[#667185]" />
                    <span className="text-xs">0 Members</span>
                  </div>
                </div>

                {/* <div className="flex items-center">
                  <span className="text-sm">(91)</span>
                </div> */}
              </div>

              <KadaButton
                className={cn(
                  "rounded-full",
                  "!border-green-500 !bg-[#ECF6F1]"
                )}
                variant="outline"
                // onClick={() => router.push("/vendors/cooperative/1")}
                rightIcon={<ArrowRightIcon className="w-[18px] h-[18px]" />}
              >
                Join
              </KadaButton>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CooperativeCard;

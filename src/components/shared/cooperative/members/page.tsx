"use client";
import FarmerTable from "@/components/dashboards/cooperative/members/farm-table";
import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { SearchIcon } from "@/icons";
import React from "react";
import { Badge, Popover } from "rizzui";
import MembersTable from "./table";
import { useModal } from "@/hooks/use-modal";
import MembershipRequestModal from "@/components/modals/cooperative/membership-request";
import AddMemberModal from "@/components/modals/cooperative/add-member";

function CooperativeMembersPage() {
  useDashboardTitle("Members");
  const { openModal, closeModal } = useModal();

  return (
    <>
      <div className="">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-black">
            Farmer's Information
          </h2>

          <div className="flex gap-4">
            <KadaButton
              className="rounded-full"
              variant="outline"
              onClick={() =>
                openModal({
                  customSize: "80%",
                  view: <MembershipRequestModal close={closeModal} />,
                })
              }
            >
              Membership Requests
              <Badge className="ml-2 bg-red-500" color="danger" size="sm">
                6
              </Badge>
            </KadaButton>

            <KadaButton
              className="rounded-full"
              onClick={() =>
                openModal({
                  customSize: "480px",
                  view: <AddMemberModal close={closeModal} />,
                })
              }
            >
              Add Member
            </KadaButton>
          </div>
        </div>

        <div className="flex gap-5 text-sm text-black whitespace-nowrap">
          <Input
            placeholder="Search here..."
            inputClassName="!rounded-[10px] !h-[36px]"
            className="!w-[500px]"
            prefix={<SearchIcon />}
          />

          <Popover shadow="sm" placement="bottom-end">
            <Popover.Trigger>
              <KadaButton className="" variant="outline">
                Filter
              </KadaButton>
            </Popover.Trigger>
            <Popover.Content className="z-0">
              <>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4">Action</div>
                </div>
              </>
            </Popover.Content>
          </Popover>
        </div>

        <div className="border-x mt-3">
          <MembersTable />
        </div>
      </div>
    </>
  );
}

export default CooperativeMembersPage;

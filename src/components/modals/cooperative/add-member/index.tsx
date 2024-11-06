"use client";
import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import { CloseIcon, SearchIcon } from "@/icons";
import React from "react";

type AddMemberModalProps = {
  close: () => void;
};

function AddMemberModal({ close }: AddMemberModalProps) {
  return (
    <section className="flex overflow-hidden flex-col w-full rounded-[10px] bg-white font-inter">
      <header className="flex items-center justify-between border-b px-6 py-2">
        <h4 className="text-base font-semibold">Add member</h4>

        <button onClick={close}>
          <CloseIcon className="w-4 h-4" />
        </button>
      </header>

      <div className=" bg-white p-6">
        <div className="space-y-6">
          <Input
            placeholder="Search here..."
            inputClassName="!rounded-[10px] !h-[40px]"
            className="!w-full"
            prefix={<SearchIcon />}
            type="search"
            clearable
            label="Search for a registered member"
          />

          <Input
            placeholder="Enter member’s name"
            inputClassName="!rounded-[10px] !h-[40px]"
            type="text"
            label="Name"
          />

          <Input
            placeholder="08012345678"
            inputClassName="!rounded-[10px] !h-[40px]"
            type="text"
            label="Phone Number"
          />

          <Input
            placeholder="Enter Your email"
            inputClassName="!rounded-[10px] !h-[40px]"
            type="text"
            label="Email"
          />

          <Input
            placeholder="Enter or select categories"
            inputClassName="!rounded-[10px] !h-[40px]"
            type="text"
            label="Categories"
          />

          <KadaButton className="!w-full rounded-full" onClick={close}>
            Add Member
          </KadaButton>
        </div>
      </div>
    </section>
  );
}

export default AddMemberModal;

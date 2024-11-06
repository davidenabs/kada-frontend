"use client";
import React, { Fragment } from "react";
import Input from "@/components/form/input";
import Button from "../form/button";
import { CloseIcon } from "@/icons";

function CreateFarmModal({ close }: { close: () => void }) {
  return (
    <Fragment>
      <section className="flex overflow-hidden flex-col w-full bgwhite rounded-[10px] max-md:max-w-full bg-white p-10">
        <header className="flex justify-between">
          <h1 className="self-start text-2xl font-bold text-green-800">
            Create Farm
          </h1>
          <button onClick={close}>
            <CloseIcon className="w-4 h-4" />
          </button>
        </header>

        <div className="flex flex-col w-full">
          <form className="flex flex-col space-y-4">
            <Input
              label="Farm Name"
              placeholder="Enter farm name"
              inputClassName="!h-[56px]"
            />
            <Input label="Farm Location" inputClassName="!h-[56px]" />
            <Button className="!rounded-full !shadow-none">Create Farm</Button>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default CreateFarmModal;

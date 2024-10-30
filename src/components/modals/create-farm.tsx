"use client";
import React, { Fragment } from "react";
import Input from "@/components/form/input";
import Button from "../form/button";
import { CloseIcon } from "@/icons";

function CreateFarm() {
  return (
    <Fragment>
      <section className="flex overflow-hidden flex-col pb-8 w-full bgwhite rounded-[10px] max-md:max-w-full bg-white">
        <header className="flex flex-col pt-6 pb-0.5 w-full max-md:max-w-full">
          <CloseIcon className="w-4 h-4 self-end mr-7" />
          <div className="flex flex-col px-10 w-full max-md:px-5 max-md:max-w-full">
            <h1 className="self-start text-2xl font-bold text-green-800">
              Create Farm
            </h1>
            <form className="flex flex-col space-y-4">
              <Input
                label="Farm Name"
                placeholder="Enter farm name"
                inputClassName="!h-[56px]"
              />
              <Input label="Farm Location" inputClassName="!h-[56px]" />
              <Button className="!rounded-full !shadow-none">
                Create Farm
              </Button>
            </form>
          </div>
        </header>
      </section>
    </Fragment>
  );
}

export default CreateFarm;

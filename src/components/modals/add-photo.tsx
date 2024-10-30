"use client";
import { CloseIcon } from "@/icons";
import { CloudArrowUpIcon } from "@heroicons/react/16/solid";
import React, { Fragment, useRef } from "react";
import Input from "../form/input";
import { KadaButton } from "../form/button";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";

interface Props {
  close: () => void;
}

function AddPhoto({ close }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const notify = () => toast("Here is your toast.");

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the file upload here
      console.log("File selected:", file.name);
      // You can add your file upload logic here
    }
  };

  return (
    <Fragment>
      <section className="w-full rounded-[10px] bg-white p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-[#205B42]">Add photo</h1>
          <button className="" onClick={close}>
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6">
          <div className="flex gap-8">
            <div className="flex-1">
              <label className="text-xs font-inter">Upload Image</label>

              <div
                className="flex border border-dotted rounded-2xl justify-between items-center p-4 relative cursor-pointer"
                onClick={handleClick}
              >
                <div className="flex items-center space-x-2">
                  <div className="">
                    <CloudArrowUpIcon className="w-6 h-6" />
                  </div>

                  <div className="">
                    <p className="text-[#101928] font-inter">Tap to Upload</p>
                    <p className="text-[#98A2B3] text-[11px]">
                      SVG, PNG, JPG, GIF | 10MB max.
                    </p>
                  </div>
                </div>

                <div className="">
                  <KadaButton className="!bg-black">Upload</KadaButton>
                </div>
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".svg,.png,.jpg,.jpeg,.gif"
                />
              </div>
            </div>

            <div className="flex-1">
              <Input
                label="Describe this photo"
                placeholder="Enter photo description"
              />
            </div>
          </div>

          <div className="border border-[#ECF2F6] bg-[#FAFAFA] rounded-2xl p-4 mt-8">
            <h4>Your Photo Gallery</h4>
            <div className="grid grid-cols-4 mt-6">
              <div className="">
                <div className="relative w-full h-[220px]">
                  <Image
                    src="/images/bdo.png"
                    alt="BDO"
                    fill
                    className="rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <label className="text-xs font-inter">Photo Description</label>
              <div className="flex items-center gap-4">
                <Input placeholder="Enter photo description" />

                <KadaButton className="!bg-black !rounded-full">
                  Save changes
                </KadaButton>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <KadaButton
            className="!rounded-full !h-[55px] !w-[181px]"
            onClick={notify}
          >
            Submit
          </KadaButton>
        </div>
      </section>
    </Fragment>
  );
}

export default AddPhoto;

import Button from "@/components/form/button";
import { CameraIcon } from "@/icons";
import Image from "next/image";
import React, { Fragment } from "react";
import Gallery from "./gallery";
import { useModal } from "@/hooks/use-modal";
import AddPhoto from "@/components/modals/add-photo";

const FarmInfo: React.FC = () => {
  const crops = ["Corn", "Soybean", "Maize", "Maize", "Maize", "Maize"];

  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal({
      customSize: "80%",
      view: <AddPhoto close={closeModal} />,
    });
  };

  return (
    <Fragment>
      <section className="mt-6 px-2 border border-teal-700 border-opacity-30">
        <div className="flex gap-4">
          <div className="bg-white rounded-3xl shadow-[0px_0px_40px_0px_#C6C5C545] h-[682px] w-[269px] p-3">
            <div className="relative w-60 h-[105px]">
              <Image
                src="/images/crop-thumb.png"
                className="object-contain"
                alt="FGSC Farms"
                fill
              />
            </div>

            <div className="text-center mt-6">
              <h1 className="mt- text-lg font-bold">FGSC Farms</h1>
              <p className="text-base font-thin pt-1">234 HECTRES</p>
              <p className="text-sm font-thin pt-2 max-w-[213px]">
                Close to FGSC along, lorem ipsumn road, kaduna
              </p>
            </div>

            <div className="text-center">
              <button className="px-5 py-2.5 mt-6 mb-0 text-sm font-medium border-zinc-700 rounded-[60px] border-[0.5px]">
                Edit Info
              </button>
            </div>

            <div className="mt-4">
              <h4 className="text-[14px]">Produce</h4>
              <div className="flex flex-wrap gap-[6px] justify-center text-sm font-thin mt-5 w-full text-black/85 whitespace-nowrap">
                {crops.map((crop, index) => (
                  <span
                    key={index}
                    className="gap-2.5 self-stretch px-2.5 py-1 rounded border-zinc-200 border-[0.2px]"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <h4 className="text-[14px] font-medium">Farm Direction</h4>
              <div className="flex justify-between text-[#333543] text-sm mt-4">
                <span className="font-light font-inter">Longitude:</span>
                <span className="font-bold  text-sm">10.5247° N</span>
              </div>

              <div className="flex justify-between text-[#333543] text-sm">
                <span className="font-light font-inter">Latitude:</span>
                <span className="font-bold  text-sm">10.5247° N</span>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <h4 className="text-[14px] font-medium">Farming Season</h4>
              <div className="flex">
                <span className="font-bold text-sm">Wet</span>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-[30px]">
            <div className="">
              <h4 className="text-lg font-bold">Farm Location (2)</h4>
              <div className="h-[318px] w-full relative rounded-[20px]">
                <div className="absolute bottom-0 right-0 h-[163px] w-[311.02px]">
                  <div className="w-full bg-[#3865E0] h-[104px] rounded-[14px] p-6">
                    <div className="flex justify-between text-[18px] text-white font-inter">
                      <span className="font-light">Longitude:</span>
                      <span className="font-bold">10.5247° N</span>
                    </div>
                    <div className="flex justify-between text-[18px] text-white font-inter">
                      <span className="font-light">Latitude:</span>
                      <span className="font-bold">10.5247° N</span>
                    </div>
                  </div>

                  <button className="w-full bg-white flex items-center justify-center h-[72px] relative bottom-4 rounded-[14px]">
                    <span>Get Direction</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="">
              <h4 className="text-lg font-bold">Product Photos (2)</h4>

              <div className=" gap-8">
                <div className="flex-1">
                  <div className="">{/* <Gallery /> */}</div>
                </div>

                <div className="border border-[#ECF2F6] p-8 flex flex-col rounded-[20px] h-[318px] justify-between items-center">
                  <CameraIcon className="w-12 h-12" />
                  <div className="text-center">
                    <h4 className="text-[#343A3F] text-2xl">Add Photo</h4>
                    <p className="font-inter font-light text-[16px]">
                      Keep your network updated with <br /> recent product and
                      farm photos
                    </p>
                  </div>

                  <Button
                    className="!shadow-none !rounded-full"
                    handleClick={handleOpenModal}
                  >
                    <span>Upload Photo</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Gallery />
    </Fragment>
  );
};

export default FarmInfo;

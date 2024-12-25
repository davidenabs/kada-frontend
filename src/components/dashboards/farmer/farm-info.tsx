import Button from "@/components/form/button";
import { CalendarIcon, CalendarIcon2, CameraIcon, ListIcon } from "@/icons";
import Image from "next/image";
import React, { Fragment } from "react";
import Gallery from "./gallery";
import { useModal } from "@/hooks/use-modal";
import AddPhoto from "@/components/modals/add-photo";
import { IFarm } from "@/interface/farm";
import { useGetFarmGalleryQuery } from "@/app/_api/farm";
import FarmGalleySkeleton from "@/components/skeletons/farm-gallery";
import { Map } from "@/components/common/map";
import { parseGeoLocation } from "@/utils/utils";
import { cn, Tooltip } from "rizzui";
import NotifyModal from "@/components/modals/farmer/notify";
import { ICrop } from "@/interface/crop";
import { DetailData, SidebarData } from "@/components/main/cropping-calendar/data";
import ChooseCrop from "@/components/main/cropping-calendar/choose-crop";
import CropDetails from "./cropping-info";
import CreateFarmModal from "@/components/modals/create-farm";
import { getAuthToken } from "@/app/api/auth";
import CropActivities from "@/components/main/cropping-calendar/crop-activities";

export function CoordinateDisplay({ geoLocation }: { geoLocation: string }) {
  const coordinates = parseGeoLocation(geoLocation);
  if (coordinates.length === 0) {
    return <p className="text-red-500">Invalid coordinates</p>;
  }

  const token = getAuthToken();
  console.log(token)
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-white">
        Farm Coordinates ({coordinates.length})
      </h3>
      <div className="grid gap-2 text-sm">
        {coordinates.map(([longitude, latitude], index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-md text-white"
          >
            <span className="font-medium text-white">Point {index + 1}:</span>
            <span>
              {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FarmInfo(farm: IFarm & { farmId: string }) {
  const { openModal, closeModal } = useModal();
  const { data, isFetching, isRefetching } = useGetFarmGalleryQuery({
    farmId: farm.farmId,
  });
  const [notify, setNotify] = React.useState(false);
  // const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleOpenModal = () => {
    openModal({
      customSize: "80%",
      view: (
        <AddPhoto
          close={closeModal}
          gallery={data?.data || []}
          farmId={farm.farmId}
        />
      ),
    });
  };

  return (
    <Fragment>
      {notify && (
        <NotifyModal
          open={notify}
          close={() => setNotify(false)}
          crops={farm.crops!}
        />
      )}
      <section className="mt-6 p-2 border border-teal-700 border-opacity-30 rounded-[20px]">
        <div className="flex gap-4">
          <div className="bg-white rounded-3xl shadow-[0px_0px_40px_0px_#C6C5C545] h[682px] w-[269px] p-3">
            <div className="relative w-60 h-[105px]">
              <Image
                src="/images/crop-thumb.png"
                className="object-contain"
                alt="FGSC Farms"
                fill
              />
            </div>

            <div className="text-center mt-6">
              <h1 className="mt- text-lg font-bold">{farm?.name}</h1>
              <p className="text-base font-thin pt-1">
                {farm?.landArea} HECTRES
              </p>
              <p className="text-sm font-thin pt-2 max-w-[213px]">
                LGA: {farm?.lga}
              </p>
            </div>

            {/* <div className="text-center">
              <button className="px-5 py-2.5 mt-6 mb-0 text-sm font-medium border-zinc-700 rounded-[60px] border-[0.5px]">
                Edit Info
              </button>
            </div> */}

            <div className="mt-4">
              <h4 className="text-[14px]">Crop(s)</h4>
              <div className="flex flex-wrap gap-[6px] justify-start text-sm font-thin mt-2 w-full text-black/85 whitespace-nowrap">
                {farm?.crops?.map((crop, index) => (
                  <span
                    key={index + crop.name}
                    className="gap-2.5 self-stretch px-2.5 py-1 rounded border-zinc-200 border-[0.2px]"
                  >
                    {crop.name}
                  </span>
                ))}
              </div>
            </div>

            {/* <div className="text-center mt-4">
              <Tooltip
                size="sm"
                className="bg-white border-primary border"
                content={"Get notified for your cropping stages"}
              >
                <KadaButton
                  className="w-fit h-[30px]"
                  variant="outline"
                  onClick={() => setNotify(true)}
                >
                  Get Notified
                </KadaButton>
              </Tooltip>
            </div> */}

            <div className="mt-4 space-y-4">
              <h4 className="text-[14px] font-medium">Farming Season</h4>
              <div className="flex">
                <div className="">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      d="M19.5 13.5C19.5 6.75 12 1.5 12 1.5C12 1.5 4.5 6.75 4.5 13.5C4.5 15.4891 5.29018 17.3968 6.6967 18.8033C8.10322 20.2098 10.0109 21 12 21C13.9891 21 15.8968 20.2098 17.3033 18.8033C18.7098 17.3968 19.5 15.4891 19.5 13.5Z"
                      fill="#5A96EA"
                    />
                    <path
                      d="M19.5 13.5C19.5 6.75 12 1.5 12 1.5C12 1.5 4.5 6.75 4.5 13.5C4.5 15.4891 5.29018 17.3968 6.6967 18.8033C8.10322 20.2098 10.0109 21 12 21C13.9891 21 15.8968 20.2098 17.3033 18.8033C18.7098 17.3968 19.5 15.4891 19.5 13.5Z"
                      stroke="#5A96EA"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.75 18C14.625 17.6841 16.1822 16.125 16.5 14.25"
                      stroke="#5A96EA"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-bold text-sm">{farm.activeSeason}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-[30px] min-w-0">
            <div className="">
              <h4 className="text-lg font-bold">Farm Location</h4>
              <div className="h-[318px] w-full relative rounded-[20px]">
                <Map coordinates={farm.geoLocation as any} />
                <div className="absolute bottom-0 right-0 h-[163px] w-fit z-[9999]">
                  <div className="w-full bg-[#3865E0] h-full rounded-[14px] p-4 overflow-y-scroll">
                    <div className="">
                      <CoordinateDisplay
                        geoLocation={farm.geoLocation as any}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <h4 className="text-lg font-bold">
                Product Photos {""}
                <span>({data?.data?.length || 0})</span>
              </h4>

              <div className="flex gap-8 mt-2">
                <div className="flex-1 min-w-0 rounded-[20px]">
                  {isFetching || isRefetching ? (
                    <FarmGalleySkeleton />
                  ) : data?.data?.length ? (
                    <Gallery images={data?.data} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#ECF2F6] rounded-[20px]">
                      <p className="text-[#333543] text-sm font-inter">
                        No photos available
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex-1 lg:flex-none w-[321px] border border-[#ECF2F6] p-8 flex flex-col rounded-[20px] h-[318px] justify-between items-center">
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

        {farm.crops!.map((crop) => {
          return (
            <CropDetails crop={crop} activities={crop.activities} />
          );
        })}

      </section>
    </Fragment>
  );
}

export default FarmInfo;

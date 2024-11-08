"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import Input from "@/components/form/input";
import Button from "../form/button";
import { CloseIcon } from "@/icons";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useCreateFarmMutation } from "@/app/_api/farm";
import { useAtomValue } from "jotai";
import { userAtom } from "@/stores/user";
import { toast } from "sonner";
import { CreateFarmSchemaType, createFarmSchema } from "@/schema/farm";
import { MultiSelect } from "rizzui";

const defaultValues = {
  name: "",
  landArea: "",
  geoLocation: {
    type: "",
    coordinates: [],
  },
  activeSeason: "",
  products: [],
};

const seasons = [
  {
    label: "Dry",
    value: "Dry",
  },
  {
    label: "Wet",
    value: "Wet",
  },
  {
    label: "Both",
    value: "Dry,Wet",
  },
];

function CreateFarmModal({ close }: { close: () => void }) {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const { mutateAsync, isPending } = useCreateFarmMutation();
  const user = useAtomValue(userAtom);
  const [loaded, setLoaded] = useState(false);
  const [season, setSeason] = useState<string>("");

  const {
    control,
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(createFarmSchema),
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        toast.error(`Unable to retrieve your location: ${error.message}`);
      }
    );
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoaded(true);
      delete (window as any).L.Icon.Default.prototype._getIconUrl;
      (window as any).L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
        iconUrl: "/leaflet/images/marker-icon.png",
        shadowUrl: "/leaflet/images/marker-shadow.png",
      });
    }
  }, []);

  const handleCreated = (e: any) => {
    const { layer } = e;

    const geoLocation = {
      type: "Polygon",
      coordinates: layer.toGeoJSON().geometry.coordinates,
    };

    setValue("geoLocation", geoLocation);
  };

  const onSubmit = (data: CreateFarmSchemaType) => {
    console.log(data);
    const newData = {
      data: {
        ...data,
        landArea: Number(data.landArea),
        activeSeason: "Summer",
      },
      farmerId: user.user?.id!,
    };
    mutateAsync(newData, {
      onSuccess: (response) => {
        console.log(response);
        // reset();
        // close();
      },
      onError: (error) => {
        console.error("Failed to create farm:", error);
      },
    });
  };

  if (!loaded) return null;

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
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Farm Name"
              placeholder="Enter farm name"
              inputClassName="!h-[56px]"
              {...register("name")}
              error={errors.name?.message}
            />

            <Input
              type="number"
              label="Land Areaa"
              placeholder="0.00"
              inputClassName="!h-[56px]"
              suffix={<span className="text-gray-500">Hectares</span>}
              {...register("landArea")}
              error={errors.landArea?.message}
            />

            <div className="">
              <label className="mb-1.5 text-sm">Active Seasons</label>
              <div className="border border-primary w-full rounded-full divide-x divide-primary flex overflow-hidden mt-1.5 h-[56px]">
                {seasons.map((s) => (
                  <button
                    type="button"
                    key={s.label + s.value}
                    className={`w-full h-full py-2 ${
                      season === s.value ? "bg-[#D8FBE9]" : ""
                    }`}
                    onClick={() => setSeason(s.value)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="">
              <label className="mb-1.5 text-sm">Products</label>

              <Controller
                control={control}
                name="products"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <MultiSelect
                    options={[]}
                    label="Multi Select"
                    value={value}
                    // options={options}
                    onChange={onChange}
                    error={error?.message}
                    className="w-full max-w-md"
                    clearable={true}
                    onClear={() => onChange([])}
                  />
                )}
              />
            </div>

            <div className="">
              <h2 className="text-xl font-bold text-green-800">Draw Farm</h2>
              <div className="h-[400px] w-full mb-4">
                <MapContainer
                  center={userLocation || [6.5244, 3.3792]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  ref={mapRef}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <FeatureGroup>
                    <EditControl
                      position="topright"
                      onCreated={handleCreated}
                      draw={{
                        rectangle: false,
                        circle: false,
                        circlemarker: false,
                        marker: false,
                        polyline: false,
                      }}
                    />
                  </FeatureGroup>
                </MapContainer>
              </div>

              {errors.geoLocation && (
                <span className="text-red-500">
                  {errors.geoLocation.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="!rounded-full !shadow-none"
              loading={isSubmitting || isPending}
            >
              Create Farm
            </Button>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default CreateFarmModal;

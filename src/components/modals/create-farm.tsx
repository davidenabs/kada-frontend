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
import { useGetFarmProductsQuery } from "@/app/_api/farm-products";

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
  const user = useAtomValue(userAtom);
  const [loaded, setLoaded] = useState(false);
  const [season, setSeason] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);

  // * react-query
  const { mutateAsync, isPending } = useCreateFarmMutation();
  const { data, isFetching, isRefetching } = useGetFarmProductsQuery({});

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
    if ((!isFetching || !isRefetching) && data) {
      const tempProducts: any[] = [];
      data.data.forEach((d: any) => {
        tempProducts.push({ label: d.name, value: d.id });
      });

      setProducts(tempProducts);
    }
  }, [data, isFetching, isRefetching]);

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
    const newData = {
      data: {
        ...data,
        landArea: Number(data.landArea),
      },
      farmerId: user.user?.id!,
    };
    mutateAsync(newData, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Farm created successfully");
          reset(defaultValues);
          close();
        }
      },
      onError: (error) => {
        console.error("Failed to create farm:", error);
      },
    });
  };

  if (!loaded) return null;

  return (
    <Fragment>
      <form
        className="flex overflow-hidden flex-col w-full rounded-[10px] max-md:max-w-full bg-white p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <header className="flex justify-between bg-[#FFFFFF] border-b border-[#ECF2F6]">
          <h1 className="self-start text-2xl font-bold text-green-800">
            Create Farm
          </h1>
          <button onClick={close}>
            <CloseIcon className="w-4 h-4" />
          </button>
        </header>

        <div className="w-full h-[70vh] overflow-y-scroll">
          <div className="flex flex-col space-y-4">
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
              <Controller
                control={control}
                name="activeSeason"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <>
                    <div className="border border-primary w-full rounded-full divide-x divide-primary flex overflow-hidden mt-1.5 h-[56px]">
                      {seasons.map((s) => (
                        <button
                          type="button"
                          key={s.label + s.value}
                          className={`w-full h-full py-2 ${
                            value === s.value ? "bg-[#D8FBE9]" : ""
                          }`}
                          onClick={() => {
                            setSeason(s.value);
                            onChange(s.value);
                          }}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="">
              <Controller
                control={control}
                name="products"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <MultiSelect
                    label="Products"
                    value={value}
                    options={products}
                    onChange={onChange}
                    error={error?.message}
                    className="w-full"
                    clearable={true}
                    onClear={() => onChange([])}
                    selectClassName="!h-[56px] rounded-full border-[0.4px] border-primary"
                    errorClassName="text-red-500"
                  />
                )}
              />
            </div>

            <div className="">
              <label className="text-sm mb-2 inline-block">
                Draw your Farm Coordinates
              </label>
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
          </div>
        </div>

        <div className="w-full mt-4">
          <Button
            type="submit"
            className="!rounded-full !shadow-none"
            loading={isSubmitting || isPending}
          >
            Create Farm
          </Button>
        </div>
      </form>
    </Fragment>
  );
}

export default CreateFarmModal;

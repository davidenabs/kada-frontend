"use client";
import { CloseIcon } from "@/icons";
import { CloudArrowUpIcon } from "@heroicons/react/16/solid";
import React, { Fragment, useRef } from "react";
import Input from "../form/input";
import { KadaButton } from "../form/button";
import Image from "next/image";
import { toast } from "sonner";
import { IFarmGallery } from "@/interface/farm";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import {
  CreateFarmSchemaType,
  CreateGallerySchemaType,
  createGallerySchema,
} from "@/schema/farm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateFarmGalleryMutation } from "@/app/_api/farm";

interface Props {
  close: () => void;
  gallery: IFarmGallery[] | [];
  farmId: string;
}

const defaultValues = {
  description: "",
  file: new File([], ""),
};

function AddPhoto({ close, gallery, farmId }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File | null>(null);

  const { mutateAsync, isPending } = useCreateFarmGalleryMutation();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFiles(file);
    } else {
      setFiles(null);
    }
  };

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(createGallerySchema),
  });

  const onSubmit = (data: CreateGallerySchemaType) => {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("file", data.file);

    mutateAsync(
      {
        data: {
          description: data.description,
          file: data.file as File,
        },
        farmId: farmId,
      },
      {
        onSuccess: (response) => {
          if (response.success) {
            toast.success("Gallery created successfully");
            reset(defaultValues);
            close();
          }
        },
        onError: (error) => {},
      }
    );
  };

  return (
    <Fragment>
      <form
        className="w-full rounded-[10px] bg-white p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
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
                  <KadaButton type="button" className="!bg-black">
                    Upload
                  </KadaButton>
                </div>
                <Controller
                  control={control}
                  name="file"
                  render={({ field: { value, onChange } }) => (
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={(e) => {
                        onChange(e.target.files?.[0]);
                        handleFileChange(e);
                      }}
                      accept=".svg,.png,.jpg,.jpeg,.gif"
                    />
                  )}
                />
              </div>

              <p className="text-red-500 text-xs mt-1">
                {errors?.file?.message}
              </p>
            </div>

            <div className="flex-1">
              <Input
                label="Describe this photo"
                placeholder="Enter photo description"
                {...register("description")}
                error={errors.description?.message}
              />
            </div>
          </div>

          <div className="w-6/12">
            {files && (
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-300 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {files.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(files.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFiles(null);
                    }}
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="border border-[#ECF2F6] bg-[#FAFAFA] rounded-2xl p-4 mt-8">
            <h4>Your Photo Gallery</h4>
            <div className="grid grid-cols-4 gap-4 mt-6">
              {gallery.map((image, index) => {
                return (
                  <div className="" key={index}>
                    <div className="relative w-full h-[220px] border rounded">
                      <Image
                        src={image.imagePath}
                        alt={image?.description || "Gallery Image"}
                        fill
                        className="rounded-2xl object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* <div className="mt-8">
              <label className="text-xs font-inter">Photo Description</label>
              <div className="flex items-center gap-4">
                <Input placeholder="Enter photo description" />

                <KadaButton className="!bg-black !rounded-full">
                  Save changes
                </KadaButton>
              </div>
            </div> */}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <KadaButton
            type="submit"
            className="!rounded-full !h-[55px] !w-[181px]"
            loading={isPending || isSubmitting}
          >
            Submit
          </KadaButton>
        </div>
      </form>
    </Fragment>
  );
}

export default AddPhoto;

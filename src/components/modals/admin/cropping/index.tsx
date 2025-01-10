import Input from "@/components/form/input";
import { CloseIcon } from "@/icons";
import React, { Fragment, useState } from "react";
import Sidebar from "./sidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cropSchema, cropSchemaType } from "@/schema/crop";
import { KadaButton } from "@/components/form/button";
import {
  useCreateFarmProductMutation,
  useUpdateFarmProductMutation,
} from "@/app/_api/farm-products";
import { toast } from "sonner";
import { Modal } from "rizzui";
import ActivityForm from "./activity-form";
import SeasonForm from "./season-form-new";

type CreateCroppingInfoProps = {
  open: boolean;
  selected: any | null;
  close: () => void;
};

const defaultValues: cropSchemaType = {
  name: "",
  scientificName: "",
  description: "",
  idealTemperature: "",
  waterRequirements: "",
  soilType: "",
  // activities: [] as any,
  seasons: [] as any,
  // stages: [] as any,
};

function CreateCroppingInfoModal({
  open,
  selected,
  close,
}: CreateCroppingInfoProps) {
  const [loaded, setLoaded] = useState(false);
  const { mutateAsync, isPending } = useCreateFarmProductMutation();
  const updateMutation = useUpdateFarmProductMutation();
  const {
    control,
    reset,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: selected || defaultValues, // * if selected is passed, use it as default values
    resolver: zodResolver(cropSchema),
  });

  console.log(errors);

  React.useEffect(() => {
    if (selected) {
      reset(selected);
    }
  }, [selected]);

  const onSubmit = (data: cropSchemaType) => {
    console.log(data);
    if (selected === null) {
      mutateAsync(data, {
        onSuccess: () => {
          toast.success("Crop created successfully");
          reset(defaultValues);
          close();
        },
      });
    } else {
      updateMutation.mutate(
        {
          id: selected.id,
          data: data,
        },
        {
          onSuccess: () => {
            toast.success("Crop updated successfully");
            close();
          },
        }
      );
    }
  };

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <Fragment>
      <Modal
        isOpen={open}
        onClose={() => {}}
        size={"full"}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100"
        className="z-[9999] [&_.pointer-events-none]:overflow-visible"
      >
        <section className="w-full bg-white rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <header className="flex items-center justify-between border-b px-6 py-1 bg-[#F9F9F9] rounded-t-xl">
              <h4 className="text-base font-semibold">Add a crop</h4>

              <button onClick={close} type="button">
                <CloseIcon className="w-3 h-3" />
              </button>
            </header>

            <div className="overflow-y-scroll h-[90vh] border">
              <div className="p-6">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Crop Name"
                    placeholder="e.g. Maize"
                    {...register("name")}
                    error={errors.name?.message?.toString()}
                    inputClassName="h-[30px]"
                    labelClassName="text-xs"
                    disabled={isPending || updateMutation.isPending}
                  />

                  <Input
                    label="Scientific Name"
                    placeholder="e.g. Zea mays"
                    inputClassName="h-[30px]"
                    labelClassName="text-xs"
                    {...register("scientificName")}
                    error={errors.scientificName?.message?.toString()}
                    disabled={isPending || updateMutation.isPending}
                  />

                  <Input
                    label="Description"
                    placeholder="e.g. Maize is a cereal crop"
                    inputClassName="h-[30px]"
                    labelClassName="text-xs"
                    {...register("description")}
                    error={errors.description?.message?.toString()}
                    disabled={isPending || updateMutation.isPending}
                  />

                  <Input
                    label="Ideal Temperature"
                    placeholder="e.g. 20-30°C"
                    inputClassName="h-[30px]"
                    labelClassName="text-xs"
                    {...register("idealTemperature")}
                    error={errors.idealTemperature?.message?.toString()}
                    disabled={isPending || updateMutation.isPending}
                  />

                  <Input
                    label="Water Requirements"
                    placeholder="e.g. 500-600mm per season"
                    inputClassName="h-[30px]"
                    labelClassName="text-xs"
                    {...register("waterRequirements")}
                    error={errors.waterRequirements?.message?.toString()}
                    disabled={isPending || updateMutation.isPending}
                  />

                  <Input
                    label="Soil Type"
                    placeholder="e.g. Loamy soil"
                    inputClassName="h-[30px]"
                    labelClassName="text-xs"
                    {...register("soilType")}
                    error={errors.soilType?.message?.toString()}
                    disabled={isPending || updateMutation.isPending}
                  />
                </div>

                <div className="bg-white rounded-xl w-full flex mt-[30px] border ">
                  <div className="w-[170px] h-[550px] bg-[#EEF3F1] border border-[#ECF2F6] rounded-lg">
                    <Sidebar getValues={getValues} setValue={setValue} />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="border-b border-[#ECF2F6] px-4 py-2 text-[#A2A9B0]">
                      <p>CROPPING DETAILS</p>
                    </div>

                    {/* <div className="mt-1 flex-1  px-4 max-h-[500px] grid grid-cols-1lg:grid-cols-2 max-lg:divide-y lg:divide-x [&>div]:lg:px-4 [&>div]:max-lg:px-4">
                      <div className="h-full overflow-y-scroll">
                        <ActivityForm control={control} />
                      </div>
                    </div> */}

                    <div className="mt-1 flex-1  px-4 max-h-[500px] grid grid-cols-1lg:grid-cols-2 max-lg:divide-y lg:divide-x [&>div]:lg:px-4 [&>div]:max-lg:px-4">
                      <div className="h-full overflow-y-scroll">
                        <SeasonForm control={control} setValue={setValue} />
                      </div>
                    </div>

                    {/* <div className="mt-1 flex-1  px-4 max-h-[500px] grid grid-cols-1 lg:grid-cols-2 max-lg:divide-y lg:divide-x [&>div]:lg:px-4 [&>div]:max-lg:px-4">
                      <div className="h-full overflow-y-scroll">
                        <SeasonForm control={control} />
                      </div>

                      <div className="h-full overflow-y-scroll">
                        <StageForm control={control} />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-6 py-2">
              <KadaButton
                type="submit"
                className="rounded-full w-full"
                loading={isSubmitting || isPending || updateMutation.isPending}
              >
                {selected ? "Update" : "Create"} Crop
              </KadaButton>
            </div>
          </form>
        </section>
      </Modal>
    </Fragment>
  );
}

export default CreateCroppingInfoModal;

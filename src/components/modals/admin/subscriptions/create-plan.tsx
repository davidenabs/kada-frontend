import {
  useCreateSubscriptionPlanMutation,
  useUpdateSubscriptionPlanMutation,
} from "@/app/_api/subscription";
import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import Select from "@/components/form/select";
import { CloseIcon } from "@/icons";
import { UserType } from "@/interface/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal } from "rizzui";
import { toast } from "sonner";
import { z } from "zod";

export const planSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.preprocess((val) => {
    if (typeof val === "string") {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, z.number().min(1, "Price is required")),
  // durationInYears: z.number().min(1, "Duration is required"),
  durationInYears: z.preprocess((val) => {
    if (typeof val === "string") {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, z.number().min(1, "duration must be at least 1")),
  userType: z.string().min(1, "User type is required"),
});

export type planSchemaType = z.infer<typeof planSchema>;

const defaultValues: planSchemaType = {
  name: "",
  price: 0,
  durationInYears: 0,
  userType: "" as any,
};

function CreatePlan({ open, selected, close }: any) {
  const createMutation = useCreateSubscriptionPlanMutation();
  const updateMutation = useUpdateSubscriptionPlanMutation();
  const [option, setOption] = useState(null);
  const options = [
    { label: "FARMER", value: "FARMER" },
    { label: "VENDOR", value: "VENDOR" },
    { label: "COOPERATIVE", value: "COOPERATIVE" },
  ];
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
    resolver: zodResolver(planSchema),
  });

  const onSubmit = async (data: planSchemaType) => {
    if (selected) {
      const { userType, ...rest } = data;
      // * update
      updateMutation.mutateAsync(
        { id: selected.id, data: rest },
        {
          onSuccess: () => {
            toast.success("Plan updated successfully");
            close();
          },
        }
      );
    } else {
      // * create
      createMutation.mutateAsync(
        { data: data },
        {
          onSuccess: () => {
            toast.success("Plan created successfully");
            close();
          },
        }
      );
    }
  };

  return (
    <Fragment>
      <Modal
        isOpen={open}
        onClose={() => {}}
        size={"md"}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100"
        className="z-[9999] [&_.pointer-events-none]:overflow-visible"
      >
        <section className="w-full bg-white rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <header className="flex items-center justify-between border-b px-6 py-1 bg-[#F9F9F9] rounded-t-xl">
              <h4 className="text-base font-semibold">Create Plan</h4>

              <button onClick={close} type="button">
                <CloseIcon className="w-3 h-3" />
              </button>
            </header>

            <div className="overflow-y-scroll border">
              <div className="p-6">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Name"
                    placeholder="e.g. Maize"
                    {...register("name")}
                    error={errors.name?.message?.toString()}
                    inputClassName="h-[30px]"
                    labelClassName="text-xs"
                    // disabled={createMutation.isPending || updateMutation.isPending}
                  />

                  <Input
                    label="Price"
                    placeholder="e.g. Zea mays"
                    inputClassName="h-[30px]"
                    labelClassName="text-xs"
                    {...register("price")}
                    error={errors.price?.message?.toString()}
                    // disabled={isPending || updateMutation.isPending}
                  />

                  <Input
                    label="Duration in Years"
                    placeholder="e.g. Maize is a cereal crop"
                    inputClassName="h-[30px]"
                    labelClassName="text-xs"
                    {...register("durationInYears")}
                    error={errors.durationInYears?.message?.toString()}
                    // disabled={isPending || updateMutation.isPending}
                  />

                  <Controller
                    control={control}
                    name="userType"
                    render={({ field: { name, onChange, value } }) => (
                      <Select
                        label="Are you fully registered with CAC"
                        value={
                          option === null
                            ? {
                                label: value,
                                value: value,
                              }
                            : option
                        }
                        className={"border"}
                        options={options}
                        onChange={(e: any) => {
                          setOption(e);
                          onChange(e.value);
                        }}
                        selectClassName="h-[30px] rounded-full"
                        labelClassName="text-xs"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="w-full px-6 py-2">
              <KadaButton
                type="submit"
                className="rounded-full w-full"
                // loading={isSubmitting || isPending || updateMutation.isPending}
              >
                {selected ? "Update" : "Create"} Plan
              </KadaButton>
            </div>
          </form>
        </section>
      </Modal>
    </Fragment>
  );
}

export default CreatePlan;

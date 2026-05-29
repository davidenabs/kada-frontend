import React, { useEffect } from "react";
import { Drawer, Button, ActionIcon, Title, Loader } from "rizzui";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useGetUserQuery, useUpdateUserMutation } from "@/app/_api/user";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/form/input";
import Select from "@/components/form/select";
import { toast } from "sonner";
import { lgaOptions } from "@/lib/lga-data";

export default function EditUserDrawer({
  open,
  close,
  userId,
}: {
  open: boolean;
  close: () => void;
  userId: number | null;
}) {
  const { data: userData, isLoading } = useGetUserQuery({
    id: userId?.toString() || "",
    enabled: !!userId && open,
  });

  const { mutate: updateUser, isPending } = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      lga: "",
      ward: "",
    },
  });

  useEffect(() => {
    if (userData?.data) {
      const user = userData.data;
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        lga: user.lga || "",
        ward: user.ward || "",
      });
    }
  }, [userData, reset]);

  const onSubmit = (data: any) => {
    updateUser(
      { ...data, userId },
      {
        onSuccess: () => {
          toast.success("User updated successfully!");
          close();
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to update user");
        },
      }
    );
  };

  return (
    <Drawer
      isOpen={open}
      onClose={close}
      placement="right"
      className="max-w-md w-full"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b bg-white">
        <Title as="h5">Edit User</Title>
        <ActionIcon variant="text" onClick={close}>
          <XMarkIcon className="w-5 h-5" />
        </ActionIcon>
      </div>

      <div className="p-5 overflow-y-auto h-[calc(100vh-65px)] bg-white">
        {isLoading ? (
          <div className="flex justify-center p-10"><Loader size="lg" /></div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="First Name"
              {...register("firstName", { required: "First name is required" })}
              error={errors.firstName?.message as string}
            />
            <Input
              label="Last Name"
              {...register("lastName", { required: "Last name is required" })}
              error={errors.lastName?.message as string}
            />
            <Input
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message as string}
            />
            <Input
              label="Phone Number"
              {...register("phoneNumber", { required: "Phone is required" })}
              error={errors.phoneNumber?.message as string}
            />

            <Controller
              control={control}
              name="lga"
              render={({ field }) => (
                <Select
                  label="LGA"
                  options={lgaOptions}
                  value={lgaOptions.find((l: any) => l.value === field.value)}
                  onChange={(val: any) => field.onChange(val?.value)}
                  error={errors.lga?.message as string}
                />
              )}
            />
            <Input
              label="Ward"
              {...register("ward")}
              error={errors.ward?.message as string}
            />

            <div className="pt-4 flex gap-3">
              <Button type="button" variant="outline" className="w-full" onClick={close} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" className="w-full" isLoading={isPending}>
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </div>
    </Drawer>
  );
}

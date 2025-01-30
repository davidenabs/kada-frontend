import { useAdminAddUserMutation } from "@/app/_api/admin";
import {
  useCreateMarketMutation,
  useUpdateMarketMutation,
} from "@/app/_api/market";
import { KadaButton } from "@/components/form/button";
import DatePicker from "@/components/form/date-picker";
import Input from "@/components/form/input";
import Select from "@/components/form/select";
import { CloseIcon } from "@/icons";
import { IMarket } from "@/interface/market";
import { UserType } from "@/interface/user";
import {
  lgaOptions,
  lgaOptionsByZone,
  wardOptionsByLga,
  zoneOptions,
} from "@/lib/lga-data";
import { addUserSchema, addUserSchemaType } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import React, { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { Badge, cn, Modal } from "rizzui";
import { toast } from "sonner";

type AddUserModalProps = {
  open: boolean;
  close: () => void;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  userType: "",
  lga: "",
  ward: "",
  zone: "",
  community: "",
};

function AddUserModal({ open, close }: AddUserModalProps) {
  const [zoneOption, setZoneOption] = React.useState<any>(null);
  const [option, setOption] = React.useState<any>(null);
  const [wardOption, setWardOption] = React.useState<any>(null);
  const [userType, setUserType] = React.useState<any>(null);

  const createMutation = useAdminAddUserMutation();
  const {
    control,
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(addUserSchema),
  });

  const lgaOptions = React.useMemo(() => {
    if (zoneOption) {
      return lgaOptionsByZone(zoneOption.value);
    }
    return [];
  }, [zoneOption]);

  const wardOptions = React.useMemo(() => {
    if (option) {
      return wardOptionsByLga(option.value);
    }
    return [];
  }, [option]);

  const isLoading = React.useMemo(() => {
    return createMutation.isPending;
  }, [createMutation.isPending]);

  const onSubmit = (data: addUserSchemaType) => {
    const payload = {
      data: {
        ...data,
        phoneNumber: `234${data.phoneNumber}`,
      },
    };
    // const { password, ...rest } = data;
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("User added successfully");
        reset(defaultValues);
        close();
      },
    });
  };

  return (
    <Fragment>
      <Modal
        isOpen={open}
        onClose={() => {}}
        size={"lg"}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100"
        className="z-[9999] [&_.pointer-events-none]:overflow-visible"
      >
        <section className="bg-white rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <header className="flex items-center justify-between border-b px-6 py-1 bg-[#F9F9F9] rounded-t-xl">
              <h4 className="text-base font-semibold">User</h4>

              <button onClick={close} type="button">
                <CloseIcon className="w-3 h-3" />
              </button>
            </header>

            <div className="overflow-y-scroll  max-h-[90vh] px-6 py-3">
              <div className="space-y-4">
                <Input
                  label="FirstName"
                  placeholder="Enter first name"
                  error={errors.firstName?.message}
                  {...register("firstName")}
                  disabled={isLoading}
                />

                <Input
                  label="LastName"
                  placeholder="Enter last name"
                  error={errors.lastName?.message}
                  {...register("lastName")}
                  disabled={isLoading}
                />

                <Input
                  label="Email"
                  placeholder="Enter email"
                  error={errors.email?.message}
                  {...register("email")}
                  disabled={isLoading}
                />

                <Input
                  label="Password"
                  placeholder="Enter password"
                  error={errors.password?.message}
                  {...register("password")}
                  disabled={isLoading}
                />

                <Input
                  label="Phone Number"
                  prefix={"+234"}
                  type="tel"
                  id="phone"
                  placeholder="08012345678"
                  className=""
                  {...register("phoneNumber")}
                  error={errors.phoneNumber?.message}
                />

                <Controller
                  name="userType"
                  control={control}
                  render={({ field: { name, onChange } }) => (
                    <Select
                      label="User Type"
                      id="userType"
                      options={[
                        { value: UserType.ZONAL, label: "Zonal" },
                        { value: UserType.PARTNER, label: "Partner" },
                      ]}
                      onChange={(e: any) => {
                        setUserType(e);
                        onChange(e.value);
                      }}
                      error={errors.userType?.message}
                      value={userType}
                    />
                  )}
                />

                <Controller
                  name="zone"
                  control={control}
                  render={({ field: { name, onChange } }) => (
                    <Select
                      label="Zone"
                      id="zone"
                      options={zoneOptions}
                      onChange={(e: any) => {
                        setZoneOption(e);
                        onChange(e.value);
                      }}
                      value={zoneOption}
                      error={errors.zone?.message}
                    />
                  )}
                />

                <Controller
                  name="lga"
                  control={control}
                  render={({ field: { name, onChange } }) => (
                    <Select
                      label="Local Government Area (LGA)"
                      id="lga"
                      options={lgaOptions}
                      onChange={(e: any) => {
                        setOption(e);
                        onChange(e.value);
                      }}
                      value={option}
                      error={errors.lga?.message}
                    />
                  )}
                />

                <Controller
                  name="ward"
                  control={control}
                  render={({ field: { name, onChange } }) => (
                    <Select
                      label="Ward"
                      id="ward"
                      options={wardOptions}
                      onChange={(e: any) => {
                        setWardOption(e);
                        onChange(e.value);
                      }}
                      error={errors.ward?.message}
                      value={wardOption}
                    />
                  )}
                />

                <Input
                  label="Community"
                  placeholder="Enter market community"
                  error={errors.community?.message}
                  {...register("community")}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="w-full px-6 py-4">
              <KadaButton
                type="submit"
                className="rounded-full w-full"
                loading={isLoading}
              >
                Create User
              </KadaButton>
            </div>
          </form>
        </section>
      </Modal>
    </Fragment>
  );
}

export default AddUserModal;

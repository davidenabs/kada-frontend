import { useRegisterMutation } from "@/app/_api/auth";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import Password from "@/components/form/password";
import Select from "@/components/form/select";
import { UserType } from "@/interface/user";
import { lgaOptionsByZone, zoneOptions } from "@/lib/lga-data";
import { RegisterSchema, RegisterSchemaType } from "@/schema/auth";
import { appAtom } from "@/stores/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  userType: UserType.FARMER,
  acceptTerms: false,
  lga: "",
  zone: "",
  ward: "",
  community: "",
};

const FarmerForm: React.FC = () => {
  const [app, setApp] = useAtom(appAtom);
  const router = useRouter();
  const { mutateAsync, isPending } = useRegisterMutation();
  const [option, setOption] = React.useState<any>(null);
  const [zoneOption, setZoneOption] = React.useState<any>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(RegisterSchema),
  });

  const lgaOptions = React.useMemo(() => {
    if (zoneOption) {
      return lgaOptionsByZone(zoneOption.value);
    }
    return [];
  }, [zoneOption]);

  const onSubmit = (data: RegisterSchemaType) => {
    const { confirmPassword, acceptTerms, ...rest } = data;

    // console.log(rest);

    mutateAsync(rest, {
      onSuccess: (response) => {
        console.log(response);
        if (response.success) {
          toast.success(response.message);
          setApp({ ...app, userEmail: data.phoneNumber });
          router.push("/account-setup/verify-account?type=farmer");
        } else {
          toast.error(response.message);
        }
      },
      onError: (error) => {},
    });
  };

  return (
    <form
      className="flex flex-col items-start lg:px-8 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <h2 className="text-base font-bold text-teal-700">Farmers Account</h2>
        <p className="mt-1 text-sm font-medium text-zinc-500">
          Please complete the form to get started
        </p>
      </div>

      <div className="space-y-4 w-full mt-9">
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

        <Input
          label="Email"
          placeholder="Enter your email"
          className=""
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="First Name"
          id="firstName"
          placeholder="What is your name"
          className=""
          {...register("firstName")}
          error={errors.firstName?.message}
        />

        <Input
          label="Last Name"
          id="lastName"
          placeholder="What is your Surname"
          className=""
          {...register("lastName")}
          error={errors.lastName?.message}
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

        <Input
          label="Ward"
          id="ward"
          placeholder="What is your ward"
          className=""
          {...register("ward")}
          error={errors.ward?.message}
        />

        <Input
          label="Community"
          id="community"
          placeholder="What is your community"
          className=""
          {...register("community")}
          error={errors.community?.message}
        />

        <Password
          label="Create Password"
          id="password"
          placeholder={"*******"}
          className=""
          {...register("password")}
          error={errors.password?.message}
        />

        <Password
          label="Confirm Password"
          id="confirmPassword"
          placeholder={"*******"}
          className=""
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>

      <div className="flex flex-col mt-9 self-stretch">
        <div className="">
          <div className="flex gap-1.5 items-center text-sm font-light text-zinc-700">
            <input
              {...register("acceptTerms")}
              type="checkbox"
              id="terms"
              className="w-3 h-3 border border-solid border-zinc-700 rounded-sm checked:bg-primary checked:border-primary focus:ring-0 text-primary"
            />
            <label htmlFor="terms" className="self-stretch my-auto">
              <span className="font-medium">
                I agree with the terms and conditions of this application
              </span>
            </label>
          </div>
          <p className="text-red-500 text-xs mt-1">
            {errors.acceptTerms?.message}
          </p>
        </div>

        <Button
          className="!rounded-full !py-4 mt-3.5 w-full"
          type="submit"
          loading={isSubmitting || isPending}
        >
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default FarmerForm;

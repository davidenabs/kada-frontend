import { useRegisterMutation } from "@/app/_api/auth";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import Password from "@/components/form/password";
import Select from "@/components/form/select";
import { UserType } from "@/interface/user";
import { kadaLGA, lgaOptions } from "@/lib/lga-data";
import {
  CooperativeSchema,
  CooperativeSchemaType,
  RegisterSchema,
  RegisterSchemaType,
} from "@/schema/auth";
import { appAtom } from "@/stores/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  cooperativeName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  userType: UserType.COOPERATIVE,
  acceptTerms: false,
  lga: "",
};

const CooperativeForm: React.FC = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useRegisterMutation();
  const [app, setApp] = useAtom(appAtom);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(CooperativeSchema),
  });

  const onSubmit = (data: CooperativeSchemaType) => {
    const { confirmPassword, acceptTerms, ...rest } = data;

    mutateAsync(rest, {
      onSuccess: (response) => {
        console.log(response);
        if (response.success) {
          toast.success(response.message);
          setApp({ ...app, userEmail: data.email });
          router.push("/account-setup/verify-account?type=cooperative");
        } else {
          toast.error(response.message);
        }
      },
      onError: (error) => { },
    });
  };

  // Map LGAs to options
  // const lgaOptions = kadaLGA.lgas.map((lga) => ({
  //   value: lga,
  //   label: lga,
  // }));

  return (
    <form
      className="flex flex-col items-start lg:px-8 mt20 max-md:mt-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <h2 className="text-base font-bold text-teal-700">Cooperative</h2>
        <p className="mt-1 text-sm font-medium text-zinc-500">
          Please complete the form to get started
        </p>
      </div>

      <div className="w-full space-y-4">
        <Input
          label="Email"
          placeholder="Enter your email"
          className=""
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Cooperative Name"
          id="firstName"
          placeholder="What is your company name"
          className=""
          {...register("cooperativeName")}
          error={errors.cooperativeName?.message}
        />

        <Select
          label="Local Government Area (LGA)"
          id="lga"
          options={lgaOptions}
          {...register("lga")}
          error={errors.lga?.message}
        >
        </Select>

        <Input
          label="Phone"
          prefix={"+234"}
          type="tel"
          id="phone"
          placeholder=""
          className=""
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
        />

        <Password
          label="Password"
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
              type="checkbox"
              id="terms"
              {...register("acceptTerms")}
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
          loading={isSubmitting || isPending}
          className="!rounded-full !py-4 mt-3.5 w-full"
          type="submit"
        >
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default CooperativeForm;

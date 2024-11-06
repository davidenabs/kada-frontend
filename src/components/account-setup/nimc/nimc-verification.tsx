"use client";
import { useVerifyNinMutation } from "@/app/_api/user";
import { withAuth } from "@/components/common/auth";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import useCheckUserField from "@/hooks/user-field";
import { UserType } from "@/interface/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const nimcVwrifySchema = z.object({
  dob: z.string({ message: "Date of birth is required" }).trim().min(1, {
    message: "Date of birth is required",
  }),
  nin: z
    .string()
    .trim()
    .min(1, { message: "NIN is required" })
    .length(11, { message: "NIN must be 11 characters long" })
    .regex(/^\d+$/, { message: "NIN must be a number" }),
});

type nimcVwrifySchemaType = z.infer<typeof nimcVwrifySchema>;

const NimcVerification: React.FC = () => {
  useCheckUserField([
    {
      // field: "farmerProfile.isNinVerified",
      field: "verified",
      redirectTo: "/dashboard/farmer",
      condition: (value) => value === true,
    },
  ]);

  const [loaded, setLoaded] = useState(false);
  const { mutateAsync, isPending } = useVerifyNinMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      dob: "",
      nin: "",
    },
    resolver: zodResolver(nimcVwrifySchema),
  });

  const onSubmit = (data: nimcVwrifySchemaType) => {
    mutateAsync(data, {
      onSuccess: (response) => {
        const { data, message, status } = response;
        console.log(response);
        // if (data.verified) {
        //   toast.success("Account verified successfully");
        // } else {
        //   toast.error("Invalid OTP");
        // }
      },
      onError: (error) => {},
    });
  };

  // useEffect(() => {
  //   setLoaded(true);
  // }, []);

  return (
    <section className="flex overflow-hidden flex-col justify-center items-center px-10 py-12 bg-white rounded-lg border-[0.5px] border-zinc-400 border-opacity-50 max-w-[624px] max-md:px-5 mx-auto my-auto">
      <div className="flex flex-col items-center max-w-full w-[365px]">
        <img
          src="/images/nimc-logo.png"
          alt="NIMC Verification Logo"
          className="object-contain aspect-square w-[87px]"
        />

        <h2 className="text-2xl font-bold leading-tight text-zinc-700">
          NIMC Verification
        </h2>

        <form
          noValidate
          className="flex flex-col self-stretch mt-11 w-full font-medium max-md:mt-10 max-md:max-w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="What's your date of birth"
            type="date"
            id="dob"
            placeholder="What is your company name"
            {...register("dob")}
            error={errors.dob?.message}
          />

          <Input
            label="Enter your NIN"
            type="number"
            id="dob"
            placeholder="11 digits"
            {...register("nin")}
            error={errors.nin?.message}
          />

          <Button
            className=" mt-8 !w-fit !py-3 !rounded-full !px-10 mx-auto"
            type="submit"
            loading={isSubmitting || isPending}
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default withAuth(NimcVerification, {
  allowedUserTypes: [UserType.FARMER],
});

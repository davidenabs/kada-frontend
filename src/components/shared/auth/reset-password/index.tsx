"use client";
import { useSendOtpMutation } from "@/app/_api/auth";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import Password from "@/components/form/password";
import { OtpType } from "@/interface/auth";
import { ResetPasswordSchema, ResetPasswordSchemaType } from "@/schema/auth";
import { appAtom } from "@/stores/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  userId: "",
  otp: "",
  password: "",
  confirmPassword: "",
};

function ResetPassword() {
  const [app, setApp] = useAtom(appAtom);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(ResetPasswordSchema),
  });

  const { mutateAsync, isPending } = useSendOtpMutation();

  const onSubmit = (data: ResetPasswordSchemaType) => {
    console.log(data);
    // const newData = {
    //   ...data,
    //   method: data.userId.includes("@") ? "email" : "phone",
    // };

    // mutateAsync(newData, {
    //   onSuccess: (response) => {
    //     toast.success("OTP sent successfully");

    //     if (response.success) {
    //       setApp({ ...app, userEmail: data.userId });
    //     }
    //   },
    // });
  };

  useEffect(() => {
    if (app.userEmail) setValue("userId", app.userEmail);

    return () => {
      setApp({ ...app, userEmail: null });
    };
  }, [app.userEmail]);

  return (
    <Fragment>
      <form
        className="w-full md:w-6/12 border rounded-lg p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-sm text-gray-500"></p>
        </div>

        <div className="space-y-4">
          <Input
            label="Email/Phone"
            placeholder="Enter your email or phone number"
            inputClassName=""
            {...register("userId")}
            error={errors.userId?.message}
          />

          <Input
            label="Otp"
            placeholder="Enter your otp"
            inputClassName=""
            {...register("otp")}
            error={errors.otp?.message}
          />

          <Password
            label="Password"
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
          />

          <Password
            label="Confirm Password"
            placeholder="Enter your password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>

        <Button
          type="submit"
          className="!py-3 mt-8 !rounded-full"
          loading={isSubmitting || isPending}
        >
          Sign in
        </Button>

        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Didn't receive the code?{" "}
            <Link href="/forgot-password" className="text-green-800">
              Resend OTP
            </Link>
          </p>
        </div>
      </form>
    </Fragment>
  );
}

export default ResetPassword;

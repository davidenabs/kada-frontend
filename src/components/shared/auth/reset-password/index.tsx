"use client";
import { useResetPasswordMutation } from "@/app/_api/auth";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import Password from "@/components/form/password";
import { ResetPasswordSchema, ResetPasswordSchemaType } from "@/schema/auth";
import { appAtom } from "@/stores/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [app, setApp] = useAtom(appAtom);
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(ResetPasswordSchema),
  });

  const { mutateAsync, isPending } = useResetPasswordMutation();

  const onSubmit = (data: ResetPasswordSchemaType) => {
    mutateAsync(data, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Password reset successfully");
          reset(defaultValues);
          setApp({ ...app, userEmail: null });
          router.push("/sign-in");
        }
      },
    });
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

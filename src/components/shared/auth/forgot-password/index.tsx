"use client";
import { useSendOtpMutation } from "@/app/_api/auth";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import { OtpType } from "@/interface/auth";
import { ForgotPasswordSchema, ForgotPasswordSchemaType } from "@/schema/auth";
import { appAtom } from "@/stores/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  userId: "",
  type: OtpType.CHANGE_PASSWORD,
};

function ForgotPassword() {
  const router = useRouter();
  const [app, setApp] = useAtom(appAtom);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const { mutateAsync, isPending } = useSendOtpMutation();

  const onSubmit = (data: ForgotPasswordSchemaType) => {
    const newData = {
      ...data,
      method: data.userId.includes("@") ? "email" : "phone",
    };

    mutateAsync(newData, {
      onSuccess: (response) => {
        toast.success("OTP sent successfully");

        if (response.success) {
          setApp({ ...app, userEmail: data.userId });
          router.push("/reset-password");
        }
      },
    });
  };

  return (
    <Fragment>
      <form
        className="w-full md:w-6/12 border rounded-lg p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-sm text-gray-500">
            Enter your email address or phone number to receive a password reset
            code
          </p>
        </div>

        <div className="p-4">
          <Input
            label="Email/Phone"
            placeholder="Enter your email or phone number"
            inputClassName=""
            {...register("userId")}
            error={errors.userId?.message}
          />
        </div>

        <Button
          type="submit"
          className="!py-3 mt-8 !rounded-full"
          loading={isSubmitting || isPending}
        >
          Submit
        </Button>

        <div className="p-4">
          <p className="text-sm text-gray-500">
            Back to{" "}
            <Link href="/sign-in" className="text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </Fragment>
  );
}

export default ForgotPassword;

"use client";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import AppLoader from "@/components/shared/loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVerifyOtpMutation } from "@/app/_api/auth";
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal";
import ResendOtp from "@/components/modals/auth/resend-otp";
import { useAtom } from "jotai";
import { appAtom } from "@/stores/app";
import { OtpType } from "@/interface/auth";

const verifySchema = z.object({
  email: z.string().trim().min(1, { message: "Email/Phone is required" }),
  otp: z
    .string()
    .min(1, { message: "OTP is required" })
    .max(6, { message: "OTP must be 6 characters long" })
    .length(6, { message: "OTP must be 6 characters long" })
    .regex(/^\d+$/, { message: "OTP must be a number" }),
});

type verifySchemaType = z.infer<typeof verifySchema>;

const EmailVerificationPage: React.FC = () => {
  const [app, setApp] = useAtom(appAtom);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  //   const { userType, loaded } = useUserType();
  let route = "";

  const { mutateAsync, isPending } = useVerifyOtpMutation();
  const { closeModal, openModal } = useModal();

  useEffect(() => {
    setLoaded(true);

    if (app.userEmail) {
      setValue("email", app.userEmail);
    }

    return () => {
      setLoaded(false);
      setApp({ ...app, userEmail: null });
    };
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      otp: "",
    },
    resolver: zodResolver(verifySchema),
  });

  const handleResendOtp = () => {
    openModal({
      view: <ResendOtp close={closeModal} />,
    });
  };

  const onSubmit = (data: verifySchemaType) => {
    const newData = {
      userId: data.email,
      otp: data.otp,
      type: OtpType.VERIFY_ACCOUNT,
    };

    mutateAsync(newData, {
      onSuccess: (response) => {
        const { data, message, success } = response;
        if (success) {
          toast.success("Account verified successfully");
          router.push("/sign-in");
        } else {
          toast.error("Invalid OTP");
        }
      },
      onError: (error) => {
        console.error("Failed to create farm:", error);
        // toast.dismiss();
      },
    });
  };

  if (!loaded) {
    return <AppLoader />;
  }

  return (
    <div className="app_container my-auto">
      <section className=" flex overflow-hidden flex-col justify-center items-center max-md:px-5 px-20 py-16 mt-24 bg-white rounded-lg border-[0.5px] border-zinc-400 border-opacity-50 w-full md:w-[624px] max-md:mt-10 mx-auto">
        <form
          noValidate
          className="flex flex-col items-center max-w-full w[394px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl text-zinc-700 font-bold">
            Verify your account
          </h1>

          <p className="mt-7 font-thin leading-6 text-center text-zinc-500">
            You are almost there! We sent an email to testjerry@gmail.com
          </p>

          {/* <p className="self-stretch mt-2.5 font-thin leading-6 text-center text-zinc-500">
            just click on the link to complete your sign up process. if you
            didn't receive the mail. please check your spam folder
          </p> */}

          <Input
            className="!w-[300px] mt-4"
            placeholder="Provide your email/phone number"
            label="Email/Phone"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            className="!w-[300px] mt-4"
            placeholder="123456"
            label="Enter OTP"
            {...register("otp")}
            error={errors.otp?.message}
          />

          <Button
            className="!rounded-full mt-7 !py-3 !px-10 !w-fit"
            type="submit"
            loading={isSubmitting || isPending}
          >
            Verify
          </Button>

          <button
            type="button"
            className="!rounded-full mt-7 !py-3 !px-10 !w-fit"
            onClick={handleResendOtp}
          >
            Resend Otp
          </button>

          <Link
            href="/sign-in"
            className="mt-7 text-base font-semibold text-teal-700"
          >
            Log in to your account
          </Link>
        </form>
      </section>
    </div>
  );
};

export default EmailVerificationPage;

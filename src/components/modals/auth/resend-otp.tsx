"use client";
import { useSendOtpMutation } from "@/app/_api/auth";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import { CloseIcon } from "@/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const sendSchema = z.object({
  userId: z
    .string({
      invalid_type_error: "Field must be a string",
    })
    .trim()
    .min(1, { message: "Email or phone number is required" }),
});

type sendSchemaType = z.infer<typeof sendSchema>;

function ResendOtp({ close }: { close: () => void }) {
  const { mutateAsync, isPending } = useSendOtpMutation();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      userId: "",
    },
    resolver: zodResolver(sendSchema),
  });

  const onSubmit = async (data: sendSchemaType) => {
    const isEmail = data.userId.includes("@");
    const newData = {
      userId: data.userId,
      method: isEmail ? "email" : "phone",
    };
    mutateAsync(newData, {
      onSuccess: (response) => {
        const { data, message, status } = response;
        console.log(response);
        if (response.success) {
          toast.success("OTP sent successfully");
          reset({ userId: "" });
          close();
        } else {
          // toast.error("Invalid OTP");
        }
      },
      onError: (error) => {
        console.error("Failed to create farm:", error);
        // toast.dismiss();
      },
    });
  };

  return (
    <Fragment>
      <section className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="self-start text-2xl font-bold text-green-800">
            Resend OTP
          </h1>

          <button onClick={close}>
            <CloseIcon className="w-4 h-4 self-end mr-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="flex flex-col space-y-8">
              <Input
                className="mt-4"
                placeholder="Enter your phone number or email"
                {...register("userId")}
                error={errors.userId?.message}
              />

              <Button
                className="!rounded-full mt-7 !py-3 !px-10 !w-fit"
                type="submit"
                loading={isSubmitting || isPending}
              >
                Resend OTP
              </Button>
            </div>
          </div>
        </form>
      </section>
    </Fragment>
  );
}

export default ResendOtp;

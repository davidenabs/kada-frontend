"use client";
import { useSendContactMailMutation } from "@/app/_api/user";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import TextArea from "@/components/form/text-area";

import { contactSchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  email: "",
  name: "",
  message: "",
};

const ContactForm: React.FC = () => {
  const { mutateAsync, isPending } = useSendContactMailMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: any) => {
    mutateAsync(data, {
      onSuccess: (response) => {
        const { data, message, success } = response;
        console.log(response);
        if (success) {
          toast.success("Message sent successfully");
          reset();
        } else {
          toast.error(message);
        }
      },
    });
  };

  return (
    <form
      className="flex flex-col grow text-base font-light leading-tight text-black max-md:mt-10 max-md:max-w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="self-start text-3xl font-bold text-zinc-700">
        Contact Us
      </h1>
      <p className="self-start mt-2 text-lg font-semibold leading-snug text-green-600">
        Reach out to us for enquiry
      </p>

      <Input
        placeholder="Full Name"
        className=""
        inputClassName="border-0"
        {...register("name")}
        error={errors.name?.message}
        disabled={isPending}
      />
      <Input
        placeholder="Your email"
        className="mt-4"
        inputClassName="border-0"
        {...register("email")}
        error={errors.email?.message}
        disabled={isPending}
      />
      {/* <Textarea */}
      <div>
        <TextArea
          placeholder="Your Message"
          aria-label="Your Message"
          {...register("message")}
          // error={errors.message?.message}
          disabled={isPending}
        />

        <p className="text-xs text-red-500">
          {errors.message?.message?.toString()}
        </p>
      </div>

      <Button
        type="submit"
        className=" mt-12 font-bold !text-amber-300 !rounded-full max-md:mt-10 max-md:max-w-full"
        loading={isPending}
      >
        Submit
      </Button>
    </form>
  );
};

export default ContactForm;

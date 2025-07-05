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

const SubmitButton: React.FC = () => {
  return (
    <button
      type="submit"
      className="overflow-hidden self-center px-16 py-3 mt-3 max-w-full text-base font-bold text-amber-300 whitespace-nowrap bg-green-800 rounded-[60px] w-[538px] max-md:px-5"
    >
      Submit
    </button>
  );
};

interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  className = "",
}) => {
  return (
    <div className={`grow w-fit max-md:pr-5 max-md:max-w-full ${className}`}>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={label}
        className="p-4 w-full bg-white border border-solid border-stone-900"
        aria-label={label}
      />
    </div>
  );
};

interface ContactFormProps {
  onSubmit: (formData: FormData) => void;
}

const defaultValues = {
  email: "",
  name: "",
  message: "",
  phoneNumber: "",
};

const ContactForm: React.FC = () => {
  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     const formData = new FormData(event.currentTarget);
  //     onSubmit(formData);
  //   };

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
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-xl leading-tight text-black rounded-none mt-10 w-full max-md:px-5"
    >
      <div className="self-center text-2xl font- leading-none text-center text-green-800">
        <h1>Send Us a Message</h1>
      </div>
      <div className="mt-14 max-md:mt-10 max-md:max-w-full">
        <Input
          placeholder="Full Name"
          className=""
          inputClassName="border"
          {...register("name")}
          error={errors.name?.message}
          disabled={isPending}
        />

        <Input
          placeholder="Your email"
          className="mt-4"
          inputClassName="border"
          {...register("email")}
          error={errors.email?.message}
          disabled={isPending}
        />

        <Input
          placeholder="Phone Number"
          className="mt-4"
          inputClassName="border"
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
          disabled={isPending}
        />

        <div>
          <TextArea
            placeholder="Your Message"
            aria-label="Your Message"
            {...register("message")}
            // error={errors.message?.message}
            disabled={isPending}
            className="mt-4"
          />

          <p className="text-xs text-red-500">
            {errors.message?.message?.toString()}
          </p>
        </div>
      </div>
      {/* <SubmitButton /> */}

      <div className="justify-center flex">
        <Button
          type="submit"
          className=" mt-12 font-bold !text-amber-300 !rounded-full max-md:mt-10 w-[538px] max-md:max-w-full"
          loading={isPending}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;

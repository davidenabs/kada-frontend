"use client";
import React from "react";
import { CloseIcon } from "@/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import AddFarmerForm from "./add-farmer-form";
import { EnumeratorRegisterFarmerSchema, EnumeratorRegisterFarmerSchemaType} from "@/schema/auth";
import { UserType } from "@/interface/user";
import { useRegisterFarmerMutation } from "@/app/_api/enumerator";

type AddFarmerModalProps = {
  close: () => void;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  nin: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  userType: UserType.FARMER,
  acceptTerms: false,
};

function AddFarmerModal({ close }: AddFarmerModalProps) {
  const { mutateAsync, isPending } = useRegisterFarmerMutation();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(EnumeratorRegisterFarmerSchema),
  });

  const onSubmit = (data: EnumeratorRegisterFarmerSchemaType) => {
    const { confirmPassword, acceptTerms, ...rest } = data;

    mutateAsync(rest, {
      onSuccess: (response) => {
        console.log(response);
        if (response.success) {
          reset(defaultValues);
          toast.success(response.message);
          close();
        } else {
          toast.error(response.message);
        }
      },
      onError: (error) => {},
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex overflow-hidden flex-col w-full rounded-[10px] bg-white font-inter"
    >
      <header className="flex items-center justify-between border-b px-6 py-4 bg-[#F9F9F9]">
        <div className="flex flex-col">
          <h4 className="text-base font-semibold">Add Farmer</h4>
          <p className="mt-1 text-sm font-medium text-zinc-500">
            Please complete the form
          </p>
        </div>

        <button onClick={close}>
          <CloseIcon className="w-4 h-4" />
        </button>
      </header>

      <div className=" bg-white p-6 divide-y">
        <div className="pt8">
          <AddFarmerForm errors={errors}
            register={register} loading={isSubmitting || isPending} />
        </div>
      </div>
    </form>
  );
}

export default AddFarmerModal;
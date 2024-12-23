import { useForceUpdateMutation, useUpdateUserMutation } from "@/app/_api/user";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import TextArea from "@/components/form/text-area";
import { CloseIcon } from "@/icons";
import {
  EditCooperaativeProfileSchema,
  EditCooperaativeProfileSchemaType,
} from "@/schema";
import { userAtom } from "@/stores/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  name: "",
  about: "",
  eligibility: "",
  address: "",
  bankName: "",
  accountNumber: "",
  accountName: "",
  bankAddress: "",
  joinAmount: 0,
};

type EditCooperaativeProfileProps = {
  close: () => void;
};

function EditCooperaativeProfile({ close }: EditCooperaativeProfileProps) {
  const [user, setUser] = useAtom(userAtom);

  const { mutateAsync, isPending } = useUpdateUserMutation();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(EditCooperaativeProfileSchema),
  });

  const onSubmit = async (data: EditCooperaativeProfileSchemaType) => {
    const newData = {
      address: data.address,
      cooperativeName: data.name,
      cooperativeAbout: data.about,
      cooperativeEligibility: data.eligibility,
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      accountName: data.accountName,
      bankAddress: data.bankAddress,
      joinAmount: data.joinAmount,
    };

    mutateAsync(newData, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Profile updated successfully");
          close();
        }
      },
      onError: (error) => { },
    });
  };

  useEffect(() => {
    reset({
      name: user?.user?.cooperativeProfile?.cooperativeName || "",
      about: user?.user?.cooperativeProfile?.about || "",
      eligibility: user?.user?.cooperativeProfile?.eligibility || "",
      address: user?.user?.address || "",
      bankName: user?.user?.cooperativeProfile?.bankName || "",
      accountNumber: user?.user?.cooperativeProfile?.accountNumber || "",
      accountName: user?.user?.cooperativeProfile?.accountName || "",
      bankAddress: user?.user?.cooperativeProfile?.bankAddress || "",
      joinAmount: user?.user?.cooperativeProfile?.joinAmount || 0,

    });
  }, []);

  return (
    <form
      className="bg-white font-inter rounded-xl w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="flex items-center justify-between border-b px-6 py-2">
        <h4 className="text-base font-semibold">Edit Profile</h4>

        <button
          onClick={() => {
            if (isSubmitting || isPending) return;
            close();
          }}
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </header>

      <div className="p-6 overflow-y-scroll max-h-[600px]">
        <div className="space-y-6">
          <Input
            placeholder="Enter Name"
            inputClassName="!rounded-[10px] !h-[40px]"
            className="!w-full"
            label="Cooperative Name"
            {...register("name")}
            error={errors.name?.message}
          />

          <TextArea
            placeholder="Enter About"
            textareaClassName=""
            className="w-full"
            label="About Cooperative"
            {...register("about")}
            error={errors.about?.message}
          />

          <TextArea
            placeholder="Enter Eligibility"
            textareaClassName=""
            className="!w-full"
            label="Eligibility"
            {...register("eligibility")}
            error={errors.eligibility?.message}
          />

          <TextArea
            placeholder="Enter Address"
            className="w-full"
            label="Address"
            {...register("address")}
            error={errors.address?.message}
          />

          <Input
            placeholder="Enter Bank Name"
            inputClassName="!rounded-[10px]!h-[40px]"
            className="!w-full"
            label="Bank Name"
            {...register("bankName")}
            error={errors.bankName?.message}
            />

            <Input
            placeholder="Enter Account Number"
            inputClassName="!rounded-[10px]!h-[40px]"
            className="!w-full"
            label="Account Number"
            {...register("accountNumber")}
            error={errors.accountNumber?.message}
            />

            <Input
            placeholder="Enter Account Name"
            inputClassName="!rounded-[10px]!h-[40px]"
            className="!w-full"
            label="Account Name"
            {...register("accountName")}
            error={errors.accountName?.message}
            />

            <Input
            placeholder="Enter Bank Address"
            inputClassName="!rounded-[10px]!h-[40px]"
            className="!w-full"
            label="Bank Address"
            {...register("bankAddress")}
            error={errors.bankAddress?.message}
            />

            <Input
            prefix={"₦"}
            placeholder="Enter Join Amount"
            inputClassName="!rounded-[10px]!h-[40px]"
            className="!w-full"
            label="Join Amount"
            {...register("joinAmount")}
            error={errors.joinAmount?.message}
            />
        </div>
      </div>

      <div className="w-full mt-4 px-6 py-4 border-t">
        <Button
          type="submit"
          className="!rounded-full !shadow-none"
          loading={isSubmitting || isPending}
        >
          Save
        </Button>
      </div>
    </form>
  );
}

export default EditCooperaativeProfile;

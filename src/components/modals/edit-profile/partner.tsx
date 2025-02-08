import { useForceUpdateMutation, useUpdateUserMutation } from "@/app/_api/user";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import TextArea from "@/components/form/text-area";
import { CloseIcon } from "@/icons";
import {
  EditPartnerProfileSchema,
  EditPartnerProfileSchemaType,
} from "@/schema";
import { userAtom } from "@/stores/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  businessName: "",
  about: "",
};

type EditPartnerProfileProps = {
  close: () => void;
};

function EditPartnerProfile({ close }: EditPartnerProfileProps) {
  const [user, setUser] = useAtom(userAtom);

  const { mutateAsync, isPending } = useUpdateUserMutation();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(EditPartnerProfileSchema),
  });

  const onSubmit = async (data: EditPartnerProfileSchemaType) => {
    const newData = {
      businessName: data.businessName,
      about: data.about,
    };

    mutateAsync(newData, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Profile updated successfully");
          close();
        }
      },
      onError: (error) => {},
    });
  };

  useEffect(() => {
    reset({
      businessName: user?.user?.partnerProfile?.businessName || "",
      about: user?.user?.partnerProfile?.about || "",
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
            placeholder="Enter Business Name"
            inputClassName="!rounded-[10px] !h-[40px]"
            className="!w-full"
            label="Business Name"
            {...register("businessName")}
            error={errors.businessName?.message}
          />

          <TextArea
            placeholder="Enter About"
            textareaClassName=""
            className="w-full"
            label="About Zonal Office"
            {...register("about")}
            error={errors.about?.message}
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

export default EditPartnerProfile;

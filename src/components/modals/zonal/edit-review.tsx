import { useCreateVendorReviewMutation } from "@/app/_api/zonal";
import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import Select from "@/components/form/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal } from "rizzui";
import { toast } from "sonner";
import { z } from "zod";

type EditReviewModalProps = {
  open: boolean;
  close: () => void;
  review: any | null;
};

const editReviewSchema = z.object({
  remark: z.string().min(1, "Remark is required"),
  approvalStatus: z.enum(["valid", "invalid"]),
});

type EditReviewSchemaType = z.infer<typeof editReviewSchema>;

const defaultValues: EditReviewSchemaType = {
  remark: "",
  approvalStatus: "" as any,
};

function EditReviewModal({ open, close, review }: EditReviewModalProps) {
  const createMutation = useCreateVendorReviewMutation();
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(editReviewSchema),
  });

  const isLoading = React.useMemo(() => {
    return createMutation.isPending;
  }, [createMutation.isPending]);

  const onSubmit = (data: EditReviewSchemaType) => {
    const payload = {
      ...data,
      vendorId: review.vendorId,
    };

    createMutation.mutateAsync(payload, {
      onSuccess: () => {
        toast.success("Review updated successfully");
        close();
      },
    });
  };

  return (
    <Fragment>
      <Modal
        isOpen={open}
        onClose={() => {}}
        size={"lg"}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100"
        className="z-[9999] [&_.pointer-events-none]:overflow-visible"
      >
        <div className="bg-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <Input
                label="Remark"
                placeholder="Enter remark"
                error={errors.remark?.message}
                {...register("remark")}
                disabled={isLoading}
              />

              <Controller
                control={control}
                name="approvalStatus"
                render={({ field: { value, onChange } }) => (
                  <Select
                    label="Status"
                    id="approvalStatus"
                    options={[
                      { label: "Valid", value: "valid" },
                      { label: "Invalid", value: "invalid" },
                    ]}
                    value={value}
                    onChange={(e: any) => onChange(e.value)}
                    disabled={isLoading}
                  />
                )}
              />
            </div>

            <div className="w-full px-6 py-4">
              <KadaButton
                type="submit"
                className="rounded-full w-full"
                loading={isLoading}
              >
                Submit
              </KadaButton>
            </div>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
}

export default EditReviewModal;

import {
  useCreateMarketMutation,
  useUpdateMarketMutation,
} from "@/app/_api/market";
import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import { CloseIcon } from "@/icons";
import { IMarket } from "@/interface/market";
import { marketSchema, marketSchemaType } from "@/schema/market";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "rizzui";
import { toast } from "sonner";

type AddMarketModalProps = {
  open: boolean;
  close: () => void;
  market: any | null;
};

const defaultValues = {
  name: "",
  address: "",
  localGovernmentArea: "",
  ward: "",
  coordinates: "",
  size: "" as "Small" | "Medium" | "Large",
  openingDays: "",
  openingTime: "",
};

function AddMarketModal({ open, market, close }: AddMarketModalProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(marketSchema),
  });

  const createMutation = useCreateMarketMutation();
  const updateMutation = useUpdateMarketMutation();

  React.useEffect(() => {
    if (market) {
      reset(market);
    }
  }, [market]);

  const isLoading = React.useMemo(() => {
    return createMutation.isPending || updateMutation.isPending;
  }, [createMutation.isPending, updateMutation.isPending]);

  const onSubmit = (data: marketSchemaType) => {
    if (market === null) {
      createMutation.mutateAsync(
        {
          data: data,
        },
        {
          onSuccess: () => {
            toast.success("Market created successfully");
            reset(defaultValues);
            close();
          },
        }
      );
    } else {
      updateMutation.mutateAsync(
        {
          id: market.id,
          data: data,
        },
        {
          onSuccess: () => {
            toast.success("Market updated successfully");
            close();
          },
        }
      );
    }
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
        <section className="bg-white rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <header className="flex items-center justify-between border-b px-6 py-1 bg-[#F9F9F9] rounded-t-xl">
              <h4 className="text-base font-semibold">Add a market</h4>

              <button onClick={close} type="button">
                <CloseIcon className="w-3 h-3" />
              </button>
            </header>

            <div className="overflow-y-scroll  max-h-[90vh] px-6 py-3">
              <div className="space-y-4">
                <Input
                  label="Name"
                  placeholder="Enter market name"
                  error={errors.name?.message}
                  {...register("name")}
                  disabled={isLoading}
                />

                <Input
                  label="Address"
                  placeholder="Enter market address"
                  error={errors.address?.message}
                  {...register("address")}
                  disabled={isLoading}
                />

                <Input
                  label="Local Government Area"
                  placeholder="Enter market LGA"
                  error={errors.localGovernmentArea?.message}
                  {...register("localGovernmentArea")}
                  disabled={isLoading}
                />

                <Input
                  label="Ward"
                  placeholder="Enter market ward"
                  error={errors.ward?.message}
                  {...register("ward")}
                  disabled={isLoading}
                />

                <Input
                  label="Coordinates"
                  placeholder="Enter market coordinates"
                  error={errors.coordinates?.message}
                  {...register("coordinates")}
                  disabled={isLoading}
                />

                <Input
                  label="Size"
                  placeholder="Enter market size"
                  error={errors.size?.message}
                  {...register("size")}
                  disabled={isLoading}
                />

                <Input
                  label="Opening Days"
                  placeholder="Enter market opening days"
                  error={errors.openingDays?.message}
                  {...register("openingDays")}
                  disabled={isLoading}
                />

                <Input
                  label="Opening Time"
                  placeholder="Enter market opening time"
                  error={errors.openingTime?.message}
                  {...register("openingTime")}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="w-full px-6 py-4">
              <KadaButton
                type="submit"
                className="rounded-full w-full"
                loading={isLoading}
              >
                {market ? "Update" : "Create"} Market
              </KadaButton>
            </div>
          </form>
        </section>
      </Modal>
    </Fragment>
  );
}

export default AddMarketModal;

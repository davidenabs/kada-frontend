import {
  useCreateMarketMutation,
  useUpdateMarketMutation,
} from "@/app/_api/market";
import { KadaButton } from "@/components/form/button";
import DatePicker from "@/components/form/date-picker";
import Input from "@/components/form/input";
import { CloseIcon } from "@/icons";
import { IMarket } from "@/interface/market";
import { marketSchema, marketSchemaType } from "@/schema/market";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import React, { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { Badge, cn, Modal } from "rizzui";
import { toast } from "sonner";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [selectedDays, setSelectedDays] = React.useState<string[]>([]);

  const createMutation = useCreateMarketMutation();
  const updateMutation = useUpdateMarketMutation();
  const {
    control,
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(marketSchema),
  });

  const watchDays = watch("openingDays");

  React.useEffect(() => {
    if (market) {
      reset(market);
    }
  }, [market]);

  const isLoading = React.useMemo(() => {
    return createMutation.isPending || updateMutation.isPending;
  }, [createMutation.isPending, updateMutation.isPending]);

  const onSubmit = (data: marketSchemaType) => {
    if (!startDate || !endDate) {
      toast.error("Please select opening and closing time");
      return;
    }
    const openingTime = `${format(startDate!, "H:mm aa")} - ${format(
      endDate!,
      "H:mm aa"
    )}`;

    data.openingTime = openingTime;
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

                <div className="">
                  <Input
                    label="Opening Days"
                    placeholder="Enter market opening days"
                    error={errors.openingDays?.message}
                    value={watchDays}
                    disabled={true}
                  />
                  <div className="flex flex-wrap gap-1">
                    <Controller
                      control={control}
                      name="openingDays"
                      render={({ field: { value, onChange } }) => (
                        <>
                          {days.map((day, index) => (
                            <Badge
                              key={index}
                              className={cn(
                                "flex items-center gap-1 px-2 py-[1px] text-[10px] font-light cursor-pointer",
                                selectedDays.includes(day)
                                  ? "bg-primary text-white"
                                  : "bg-gray-100 text-gray-500"
                              )}
                              color="primary"
                              variant="outline"
                              onClick={() => {
                                if (selectedDays.includes(day)) {
                                  setSelectedDays((prev) =>
                                    prev.filter((d) => d !== day)
                                  );
                                  onChange(
                                    value
                                      .split(",")
                                      .filter((d) => d !== day)
                                      .join(",")
                                  );
                                } else {
                                  setSelectedDays((prev) => [...prev, day]);
                                  onChange(value ? `${value},${day}` : day);
                                }
                              }}
                            >
                              {day}
                            </Badge>
                          ))}
                        </>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="">
                    <DatePicker
                      selected={startDate}
                      onChange={(date: Date) => setStartDate(date)}
                      dateFormat="h:mm aa"
                      placeholderText="Select Time"
                      showTimeSelect
                      showTimeSelectOnly
                      wrapperClassName="w-full"
                      inputProps={{
                        inputClassName:
                          "!rounded-full border-primary border-[.5px]",
                        label: "Opening Time",
                      }}
                    />
                  </div>

                  <div className="">
                    <DatePicker
                      selected={endDate}
                      onChange={(date: Date) => setEndDate(date)}
                      dateFormat="h:mm aa"
                      placeholderText="Select Time"
                      showTimeSelect
                      showTimeSelectOnly
                      wrapperClassName="w-full"
                      inputProps={{
                        inputClassName:
                          "!rounded-full border-primary border-[.5px]",
                        label: "Closing Time",
                      }}
                    />
                  </div>
                </div>
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

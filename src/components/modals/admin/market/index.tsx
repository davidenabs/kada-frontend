import {
  useCreateMarketMutation,
  useUpdateMarketMutation,
} from "@/app/_api/market";
import { KadaButton } from "@/components/form/button";
import DatePicker from "@/components/form/date-picker";
import Input from "@/components/form/input";
import Select from "@/components/form/select";
import { CloseIcon } from "@/icons";
import { IMarket } from "@/interface/market";
import { lgaOptions } from "@/lib/lga-data";
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
  lga: "",
  ward: "",
  coordinates: "",
  community: "",
  size: "" as "Small" | "Medium" | "Large",
  openingDays: "",
  openingTime: "",
};

function AddMarketModal({ open, market, close }: AddMarketModalProps) {
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [selectedDays, setSelectedDays] = React.useState<string[]>([]);
  const [localGovernmentArea, setLocalGovernmentArea] = React.useState("");
  const [long, setLong] = React.useState();
  const [lat, setLat] = React.useState();

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
      // get coordinates for long and lat
      setLong(market.coordinates.split(",")[0]);
      setLat(market.coordinates.split(",")[1]);

      // set loc
      setLocalGovernmentArea(market.lga?.name);
    }
  }, [market]);

  const isLoading = React.useMemo(() => {
    return createMutation.isPending || updateMutation.isPending;
  }, [createMutation.isPending, updateMutation.isPending]);

  const onSubmit = (data: marketSchemaType) => {
    if (!localGovernmentArea) {
      toast.error("Please select a Local Government Area");
      return;
    }
    if (!long || !lat) {
      toast.error("Please input the coordinates of the market (Longitude and Latitude)");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Please select opening and closing time");
      return;
    }
    const openingTime = `${format(startDate!, "H:mm aa")} - ${format(
      endDate!,
      "H:mm aa"
    )}`;

    data.openingTime = openingTime;
    data.lga = localGovernmentArea;
    data.coordinates = `${long},${lat}`;

    console.log(data);
    
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
        onClose={() => { }}
        size={"lg"}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100"
        className="z-[9999] [&_.pointer-events-none]:overflow-visible"
      >
        <section className="bg-white rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <header className="flex items-center justify-between border-b px-6 py-1 bg-[#F9F9F9] rounded-t-xl">
              <h4 className="text-base font-semibold"> {market ? "Update" : "Add a"} market</h4>

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

                <Select
                  label="Local Government Area (LGA)"
                  id="localGovernmentArea"
                  options={lgaOptions}
                  value={localGovernmentArea}
                  onChange={(e: any) => {
                    setLocalGovernmentArea(e.value);
                  }}
                  disabled={isLoading}
                >
                </Select>

                <Input
                  label="Ward"
                  placeholder="Enter market ward"
                  error={errors.ward?.message}
                  {...register("ward")}
                  disabled={isLoading}
                />

                <Input
                  label="Community"
                  placeholder="Enter market community"
                  error={errors.community?.message}
                  {...register("community")}
                  disabled={isLoading}
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Coordinates"
                    placeholder="Longitude"
                    type="number"
                    error={errors.coordinates?.message}
                    onChange={(e: any) => setLong(e.target.value)}
                    value={long}
                    disabled={isLoading}
                  />
                  <Input
                    label="&nbsp;"
                    placeholder="Latitude"
                    type="number"
                    error={errors.coordinates?.message}
                    onChange={(e: any) => setLat(e.target.value)}
                    value={lat}
                    disabled={isLoading}
                  />
                </div>

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

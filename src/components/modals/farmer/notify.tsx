import { useCreateFarmCroppingMutation } from "@/app/_api/farm";
import { KadaButton } from "@/components/form/button";
import DatePicker from "@/components/form/date-picker";
import Input from "@/components/form/input";
import Select from "@/components/form/select";
import { CloseIcon } from "@/icons";
import { useParams } from "next/navigation";
import React, { Fragment } from "react";
import { Modal } from "rizzui";
import { toast } from "sonner";

type NotifyModalProps = {
  open: boolean;
  close: () => void;
  crops: any[];
};

function NotifyModal({ open, close, crops }: NotifyModalProps) {
  const { farmId } = useParams();
  const [products, setProducts] = React.useState<any[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [crop, setCrop] = React.useState<any | null>(null);
  const [startDate, setStartDate] = React.useState<Date | null | undefined>(
    undefined
  );
  const { mutateAsync, isPending } = useCreateFarmCroppingMutation();

  React.useEffect(() => {
    if (crops.length) {
      setProducts(
        crops.map((crop) => ({
          label: crop.name,
          value: crop.id,
        }))
      );
    }
  }, [crops]);

  const handleNotify = () => {
    if (!crop || !startDate) {
      return toast.error("All fields are required");
    }

    const data = {
      cropId: crop.value as string,
      farmId: farmId as string,
      plantingDate: startDate as Date,
    };

    mutateAsync(data, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Notification set successfully");
          setCrop(null);
          setStartDate(undefined);
          close();
        }
      },
    });
  };

  return (
    <Fragment>
      <Modal
        isOpen={open}
        onClose={() => {}}
        size={"md"}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100"
        className="z-[9999] [&_.pointer-events-none]:overflow-visible"
      >
        <form
          className="flex flex-col w-full rounded-[10px] max-md:max-w-full bg-white p-10"
          onSubmit={(e) => {
            e.preventDefault();
            handleNotify();
          }}
        >
          <header className="flex justify-between bg-[#FFFFFF] border-b border-[#ECF2F6]">
            <h1 className="self-start text-2xl font-bold text-green-800">
              Get Notified
            </h1>
            <button onClick={close}>
              <CloseIcon className="w-4 h-4" />
            </button>
          </header>

          <div className="w-full max-h-[70vh] overflow-y-scroll">
            <div className="flex flex-col space-y-4">
              <Select
                label="Choose Crop"
                searchable={true}
                options={products}
                value={crop}
                onChange={setCrop}
                // clearable={value !== null}
                // onClear={() => {
                //   setValue(null);
                //   setSearch("");
                // }}
                // onSearchChange={(e) => {
                //   setSearch(e);
                // }}
              />

              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                placeholderText="Select Date"
                maxDate={new Date()}
                wrapperClassName="w-full"
                inputProps={{
                  inputClassName: "!rounded-full border-primary border-[.5px]",
                  label: "Select Date",
                }}
              />
            </div>
          </div>

          <div className="w-full mt-4">
            <KadaButton
              type="submit"
              className="!rounded-full !shadow-none"
              loading={isPending}
            >
              Submit
            </KadaButton>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
}

export default NotifyModal;

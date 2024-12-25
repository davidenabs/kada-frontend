import { CloseIcon } from "@/icons";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";
import { Modal } from "rizzui";

type MarketUploadResultsModalProps = {
  open: boolean;
  close: () => void;
  data: any;
};

export default function MarketUploadResultsModal({
  open,
  close,
  data,
}: MarketUploadResultsModalProps) {
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
          <header className="flex items-center justify-between border-b px-6 py-3 bg-[#F9F9F9] rounded-t-xl">
            <h4 className="text-base font-semibold"></h4>

            <button onClick={close} type="button">
              <CloseIcon className="w-3 h-3" />
            </button>
          </header>

          <div className="space-y-4 p-6 max-h-[80vh]">
            <div className="border rounded p-4 space-y-4">
              <div className="flex gap-3">
                <CheckCircleIcon className="w-5" />
                <h4 className="text-md font-semibold">Successful Operations</h4>
              </div>

              <div className="">
                <ul className="list-disc pl-5">
                  {data?.success.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border rounded p-4 space-y-4">
              <div className="flex gap-3">
                <XCircleIcon className="w-5" />
                <h4 className="text-md font-semibold">Failed Operations</h4>
              </div>

              <div className="">
                <ul className="list-disc pl-5">
                  {data?.errors.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Modal>
    </Fragment>
  );
}

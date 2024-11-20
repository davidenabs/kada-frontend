import { CloseIcon } from "@/icons";
import React, { Fragment } from "react";
import { Modal } from "rizzui";

type ConfirmModalProps = {
  open: boolean;
  close: () => void;
  onConfirm: () => void;
  loading: boolean;
};

function ConfirmModal({ open, close, onConfirm, loading }: ConfirmModalProps) {
  return (
    <Fragment>
      <Modal
        isOpen={open}
        onClose={() => {}}
        size={"sm"}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100"
        className="z-[9999] [&_.pointer-events-none]:overflow-visible"
      >
        <section className="bg-white rounded-lg">
          <header className="flex justify-end p-3">
            <button onClick={close} type="button">
              <CloseIcon className="w-3 h-3" />
            </button>
          </header>

          <div className="flex flex-col gap-4 items-center justify-center h-full p-3">
            <h4 className="text-lg font-semibold text-center">
              Are you sure you want to proceed? This action cannot be undone.
            </h4>
            <div className="flex gap-4">
              <button
                onClick={onConfirm}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                disabled={loading}
              >
                Yes
              </button>
              <button
                onClick={close}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                disabled={loading}
              >
                No
              </button>
            </div>
          </div>
        </section>
      </Modal>
    </Fragment>
  );
}

export default ConfirmModal;

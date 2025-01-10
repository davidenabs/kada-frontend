import React, { Fragment, useState } from "react";
import { Modal } from "rizzui";
import { DetailData } from "@/components/main/cropping-calendar/data";

type CreateCroppingInfoProps = {
  open: boolean;
  selected: any | null;
  close: () => void;
};

function ViewCroppingInfoModal({
  open,
  selected,
  close,
}: CreateCroppingInfoProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Fragment>
      <Modal
        isOpen={open}
        onClose={close}
        size={"lg"}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100"
        className="z-[9999] [&_.pointer-events-none]:overflow-visible"
      >
        <section className="w-full bg-white rounded-xl p-4">
          <DetailData data={selected} />
        </section>
      </Modal>
    </Fragment>
  );
}

export default ViewCroppingInfoModal;

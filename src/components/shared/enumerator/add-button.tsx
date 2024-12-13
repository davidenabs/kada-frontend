"use client";
import React, { Fragment } from "react";
import { KadaButton } from "@/components/form/button";
import { useModal } from "@/hooks/use-modal";
import { PlusIcon } from "@heroicons/react/16/solid";
import AddFarmerModal from "@/components/modals/enumerator/add-farmer";

function AddFarmerButton() {
  const { openModal, closeModal } = useModal();
  const handleAddProductService = () => {
    openModal({
      view: <AddFarmerModal close={closeModal} />,
      customSize: "500px",
    });
  };

  return (
    <Fragment>
      <KadaButton
        className="rounded-full"
        leftIcon={<PlusIcon className="w-4 h-4 fill-white mr-1" />}
        onClick={handleAddProductService}
      >
        Add Farmer
      </KadaButton>
    </Fragment>
  );
}

export default AddFarmerButton;

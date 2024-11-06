"use client";
import React, { Fragment } from "react";
import { KadaButton } from "@/components/form/button";
import AddProductServiceModal from "@/components/modals/vendor/add-product-service";
import { useModal } from "@/hooks/use-modal";
import { PlusIcon } from "@heroicons/react/16/solid";

function AddProductServiceButton() {
  const { openModal, closeModal } = useModal();
  const handleAddProductService = () => {
    openModal({
      view: <AddProductServiceModal close={closeModal} />,
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
        Add Product/Service
      </KadaButton>
    </Fragment>
  );
}

export default AddProductServiceButton;

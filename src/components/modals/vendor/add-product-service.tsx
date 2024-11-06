"use client";
import React, { useRef, useState } from "react";
import { CloseIcon } from "@/icons";
import Input from "@/components/form/input";
import Upload from "@/components/common/upload";
import { KadaButton } from "@/components/form/button";
import { Radio } from "rizzui";

type AddProductServiceModalProps = {
  close: () => void;
};

function AddProductServiceModal({ close }: AddProductServiceModalProps) {
  const [type, setType] = useState("product");

  return (
    <section className="flex overflow-hidden flex-col w-full rounded-[10px] bg-white font-inter">
      <header className="flex items-center justify-between border-b px-6 py-4 bg-[#F9F9F9]">
        <h4 className="text-base font-semibold">Add Product or Service</h4>

        <button onClick={close}>
          <CloseIcon className="w-4 h-4" />
        </button>
      </header>

      <div className=" bg-white p-6 divide-y">
        <div className="pb-8">
          <div className="flex justify-between">
            <Radio
              label={
                <div className="">
                  <p className="font-medium text-base text-[#101928]">
                    Product
                  </p>
                  <p className="text-sm text-[#667185]">Sell a product</p>
                </div>
              }
              value="product"
              checked={type === "product"}
              onChange={() => setType("product")}
            />

            <Radio
              label={
                <div className="">
                  <p className="font-medium text-base text-[#101928]">
                    Service
                  </p>
                  <p className="text-sm text-[#667185]">Offer a service</p>
                </div>
              }
              value="service"
              checked={type === "service"}
              onChange={() => setType("service")}
            />
          </div>
        </div>

        <div className="pt-8">
          {type === "product" ? <ProductForm /> : <ServiceForm />}
        </div>
      </div>
    </section>
  );
}

export default AddProductServiceModal;

const ProductForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the file upload here
      console.log("File selected:", file.name);
      // You can add your file upload logic here
    }
  };
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <Input placeholder="Enter product name" label="Name of Product" />

        {/* category */}
        <Input placeholder="Enter product category" label="Category" />

        {/* Amount */}
        <div className="col-span-2">
          <Input placeholder="Enter amount" label="Amount" />
        </div>

        {/* image */}
        <div className="col-span-2">
          <Upload
            fileInputRef={fileInputRef}
            handleClick={handleClick}
            handleFileChange={handleFileChange}
          />
        </div>
      </div>

      <div className="">
        <KadaButton className="!w-full rounded-full">Submit</KadaButton>
      </div>
    </form>
  );
};

const ServiceForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the file upload here
      console.log("File selected:", file.name);
      // You can add your file upload logic here
    }
  };
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <Input placeholder="Enter Service name" label="Name of Service" />

        {/* category */}
        <Input placeholder="Enter Service category" label="Category" />

        {/* Amount */}
        <div className="col-span-2">
          <Input placeholder="Enter amount" label="Amount" />
        </div>

        {/* image */}
        <div className="col-span-2">
          <Upload
            fileInputRef={fileInputRef}
            handleClick={handleClick}
            handleFileChange={handleFileChange}
          />
        </div>
      </div>

      <div className="">
        <KadaButton className="!w-full rounded-full">Submit</KadaButton>
      </div>
    </form>
  );
};

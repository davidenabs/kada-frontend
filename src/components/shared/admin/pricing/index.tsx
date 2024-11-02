"use client";
import Upload from "@/components/common/upload";
import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import Image from "next/image";
import React from "react";

function AdminPricingSharedPage() {
  useDashboardTitle("Setup- Product Pricing information");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
    <section>
      <div className="flex gap-5">
        <div className="border rounded-2xl p-6 flex-1 space-y-4 bg-white">
          <div className="relative h-[107px] w-full">
            <Image
              src="/images/bdo.png"
              alt="bdo"
              fill
              className="object-cover"
            />
          </div>

          <Input placeholder="Select Date" type="date" />

          <div className="">
            <label className="">Upload Price List</label>
            <Upload
              fileInputRef={fileInputRef}
              handleClick={handleClick}
              handleFileChange={handleFileChange}
            />
          </div>

          <div className="">
            <KadaButton className="!w-full rounded-full">Submit</KadaButton>
          </div>
        </div>

        <div className="flex-1 p-6 border rounded-2xl space-y-4 bg-white">
          <h4 className="font-bold text-lg">Upload Log</h4>

          <div className="">
            <div className="flex justify-between items-center bg-[#F7F7F7] rounded-lg p-[10px]">
              <div className="flex gap-2">
                <img
                  src="/images/excel.png"
                  alt="excel"
                  className="w-10 h-10"
                />

                <div className="flex flex-col text-sm text-[#343A3F]">
                  <span>Tue 29th Oct</span>
                  <span>1:00 AM</span>
                </div>
              </div>

              <span className="text-sm text-[#343A3F]">
                Marketpricelist.xsl
              </span>

              <button className="text-sm text-[#343A3F]">View</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminPricingSharedPage;

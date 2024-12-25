"use client";
import Breadcrumb from "@/components/common/breadcrumb";
import Upload from "@/components/common/upload";
import { KadaButton } from "@/components/form/button";
import DatePicker from "@/components/form/date-picker";
import Input from "@/components/form/input";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

function AdminPricingSharedPage() {
  useDashboardTitle("Tools");
  const basePath = "/admin";
  const pathname = usePathname();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = React.useState<Date>();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
    }
  };

  return (
    <section>
      <Breadcrumb
        className="mb-4"
        items={[
          { label: "Tools", link: basePath + "/tools" },
          { label: "Price Calculator" },
        ]}
      />

      <div className="flex gap-5">
        <div className="border rounded-2xl p-6 flex-1 space-y-4 bg-white">
          <h4 className="text-lg font-semibold">
            Setup- Product Pricing information
          </h4>
          <div className="relative h-[107px] w-full rounded-xl">
            <Image
              src="/images/bdo.png"
              alt="bdo"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="">
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

          <div className="">
            <label className="">Upload Price List</label>
            <Upload
              fileInputRef={fileInputRef}
              handleClick={handleClick}
              onChange={handleFileChange}
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

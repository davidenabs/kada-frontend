"use client";
import {
  useGetMarketTemplate,
  useUploadProductFromSheetMutation,
} from "@/app/_api/market";
import Breadcrumb from "@/components/common/breadcrumb";
import Upload from "@/components/common/upload";
import { KadaButton } from "@/components/form/button";
import DatePicker from "@/components/form/date-picker";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { CloseIcon } from "@/icons";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

function AdminMarketInfoSharedPage() {
  useDashboardTitle("Tools");
  const basePath = "/admin";
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = React.useState<Date>();
  const [file, setFile] = React.useState<File | null>(null);
  const [getInfo, setGetInfo] = React.useState(false);
  const handleClick = () => fileInputRef.current?.click();

  const mutatiion = useUploadProductFromSheetMutation();
  const { data, isRefetching, isFetching, isSuccess, isError, isFetched } =
    useGetMarketTemplate({
      enabled: getInfo,
    });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    if (!startDate) {
      toast.error("Please select a date");
      return;
    }

    const formData = new FormData();
    formData.append("productsSheet", file);
    formData.append("priceDate", startDate?.toISOString() || "");
    mutatiion.mutateAsync(
      { data: formData },
      {
        onSuccess: (response) => {
          if (response.success) {
            toast.success("Market information uploaded successfully");
          }
        },
      }
    );
  };

  React.useEffect(() => {
    if (!isFetching && !isRefetching) {
      if (data && data.success) {
        toast.success(data.message);
        const link = document.createElement("a");
        link.href = data.data;
        link.download = "market-info-template.csv";
        link.click();
      }
      setGetInfo(false);
    }
  }, [isFetching, isRefetching, data]);

  const handleTemplateDownload = () => {
    setGetInfo(true);
  };

  return (
    <section>
      <div className="flex justify-between">
        <Breadcrumb
          className="mb-4"
          items={[
            { label: "Tools", link: basePath + "/tools" },
            { label: "Market Information" },
          ]}
        />
        <button onClick={handleTemplateDownload}>Get CSV Template</button>
      </div>

      <div className="flex gap-5">
        <div className="border rounded-2xl p-6 flex-1 space-y-4 bg-white">
          <h4 className="text-lg font-semibold">Market Information</h4>
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
              // value={startDate}
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

          <div className="space-y-2">
            <label className="text-sm">Update Market Information</label>
            <Upload
              fileInputRef={fileInputRef}
              handleClick={handleClick}
              onChange={handleFileChange}
              accept=".xls,.xlsx"
            />
          </div>

          {file && (
            <div className="flex items-center space-x-2">
              <img src="/images/excel.png" alt="excel" className="w-5 h-5" />
              <span className="text-sm">{file.name}</span>
              <button
                onClick={() => setFile(null)}
                className="text-sm text-primary"
              >
                <CloseIcon className="h-3 w-3 fill-red-400" />
              </button>
            </div>
          )}

          <div className="">
            <KadaButton className="!w-full rounded-full" onClick={handleSubmit}>
              Submit
            </KadaButton>
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

export default AdminMarketInfoSharedPage;

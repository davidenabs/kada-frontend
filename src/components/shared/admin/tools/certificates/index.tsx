"use client";
import React, { useRef } from "react";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import Input from "@/components/form/input";
import CertTable from "./table";
import { SealIcon } from "@/icons";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Image from "next/image";
import { KadaButton } from "@/components/form/button";
import { ArrowUpOnSquareStackIcon } from "@heroicons/react/16/solid";

function CertificatesSharedPage() {
  useDashboardTitle("Certificates");
  const certificateRef = useRef<HTMLDivElement>(null);

  //   const handleDownload = async () => {
  //     if (certificateRef.current) {
  //       const canvas = await html2canvas(certificateRef.current, {
  //         scale: 2,
  //         backgroundColor: null,
  //       });

  //       const link = document.createElement("a");
  //       link.download = `certificate.png`;
  //       link.href = canvas.toDataURL("image/png");
  //       link.click();
  //     }
  //   };

  const handleDownload = async () => {
    if (certificateRef.current) {
      try {
        const canvas = await html2canvas(certificateRef.current, {
          scale: 2,
          //   useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
          //   windowWidth: 800,
          //   windowHeight: 566,
          //   onclone: (document, element) => {
          //     document.fonts.ready.then(() => {
          //       console.log("Fonts loaded");
          //     });
          //   },
        });

        // Create PDF with proper dimensions
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });

        // Add the canvas as image to PDF
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        // Download PDF
        pdf.save(`cert-certificate.pdf`);
      } catch (error) {
        console.error("Error generating certificate:", error);
      }
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-5">
        <div className="overflow-hidden bg-white rounded-lg">
          <div className="flex justify-between items-center p-4 bg-[#F0F0F0]">
            <h4 className="text-lg font-semibold">Issue Certificates</h4>
          </div>

          <div className="p-4">
            <Input
              label="Search for Vendor"
              placeholder="Enter Vendor Name"
              inputClassName="rounded-lg"
            />
          </div>
        </div>

        <div className="bg-white overflow-hidden">
          <CertTable />
        </div>
      </div>

      <div className="md:col-start-2 md:row-start-1 md:row-span-2">
        <div className="overflow-hidden bg-white rounded-lg">
          <div className="flex justify-between items-center p-4 bg-[#F0F0F0]">
            <h4 className="text-lg font-semibold">Certificate Preview</h4>
            <SealIcon className="w-6 h-6 stroke-black" />
          </div>

          <div className="py-6">
            {/* <div className="relative">
              <div
                ref={certificateRef}
                className="w-full aspect-[1.4142/1] bg-white rounded-lg shadow-lg p-8 border-8 border-double border-primary/20"
              >
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-serif text-gray-900">
                      Certificate of Achievement
                    </h2>
                    <p className="text-gray-600">This certifies that</p>
                    <p className="text-2xl font-semibold text-primary">
                      {"Recipient Name"}
                    </p>
                    <p className="text-gray-600">has successfully completed</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {"Course Name"}
                    </p>
                    <p className="text-gray-600">on</p>
                    <p className="text-lg text-gray-900">{"Date"}</p>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <div className="text-left">
                      <div className="w-32 h-px bg-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Instructor Signature
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="w-32 h-px bg-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Director Signature
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="relative border w-10/12 mx-auto rounded-xl">
              <div
                className="w-full aspect-[1.4142/1] bg-white rounded-lg p-4"
                ref={certificateRef}
              >
                <div className="flex">
                  <div className="flex flex-col">
                    <div className="flex-1">
                      <div className="">
                        <Image
                          src="/images/logo.svg"
                          alt="logo"
                          width={50}
                          height={50}
                        />
                      </div>
                    </div>

                    <div className="">
                      <div className="text-center">
                        <h6>Valid till</h6>
                        <p className="text-primary">12 June, 2025</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-center uppercase font-railway tracking-[4px] text-gray-400 text-xs mt-10">
                      www.kada.com
                    </h4>

                    <div className="text-center mt-20">
                      <h4 className="text-primary uppercase text-3xl">
                        Certified Kada Vendor
                      </h4>

                      <p className="text-gray-400 text-sm">
                        This is to certify that
                      </p>

                      <p className="text-primary text-2xl">{"Vendor Name"}</p>

                      <p className="text-gray-400 text-sm">
                        is certified and licensed to operate on KADA platform{" "}
                        <br /> based on KADA policy based
                      </p>
                    </div>

                    <div className="text-center mt-20">
                      <div className="w-64 h-px bg-gray-400 mb-2 mx-auto mt-10"></div>

                      <h4>SIGNED</h4>
                      <p>GM, Kaduna State Agriultural Development Agency</p>
                    </div>
                  </div>
                  <div className=""></div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <KadaButton
                variant="outline"
                className="w-fit rounded-full mt-5"
                leftIcon={<ArrowUpOnSquareStackIcon className="w-4 h-4" />}
              >
                Upload a new template
              </KadaButton>
            </div>

            <div className="flex items-center justify-center gap-4 mt-10">
              <span className="underline text-[#00A551]">
                24 Candidates selected
              </span>
              <KadaButton className="rounded-full">Submit</KadaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CertificatesSharedPage;

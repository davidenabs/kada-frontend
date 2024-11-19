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
import Breadcrumb from "@/components/common/breadcrumb";
import { cn } from "rizzui";
import { jetbrains_mono, space_grotesk } from "@/app/fonts";

function CertificatesSharedPage() {
  useDashboardTitle("Tools");
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
    <section className="space-y-3">
      <Breadcrumb
        className="mb-4"
        items={[
          { label: "Tools", link: "/admin/tools" },
          { label: "Certificate Issuance" },
        ]}
      />
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
          <div className="bg-white rounded-lg">
            <div className="flex justify-between items-center p-4 bg-[#F0F0F0]">
              <h4 className="text-lg font-semibold">Certificate Preview</h4>
              <SealIcon className="w-6 h-6 stroke-black" />
            </div>

            <div className="py-6">
              <div className="relative w-10/12 mx-auto">
                <div
                  className="w-full aspect-[1.4142/1] bg-[#E9E9E9] border rounded-lg p-4"
                  ref={certificateRef}
                >
                  <div className="flex">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="">
                          <Image
                            src="/images/logo.svg"
                            alt="logo"
                            width={50}
                            height={50}
                          />
                        </div>
                        <div className="flex-1 text-center">
                          <h4
                            className={cn(
                              space_grotesk.className,
                              "text-center uppercase font-railway tracking-[4px] text-gray-400 text-xs"
                            )}
                          >
                            www.kada.com
                          </h4>
                        </div>
                      </div>

                      <div className="text-center mt-10">
                        <h4
                          className={cn(
                            space_grotesk.className,
                            "text-primary uppercase text-3xl font-bold"
                          )}
                        >
                          Certified Kada Vendor
                        </h4>

                        <div className={cn(jetbrains_mono.className, "mt-2")}>
                          <p className="text-[10px]">This is to certify that</p>

                          <p className="text-primary text-2xl my-2">
                            {"Vendor Name"}
                          </p>

                          <p className={cn("text-[10px]")}>
                            is certified and licensed to operate on KADA
                            platform <br /> based on KADA policy based
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center mt-20">
                        <div className="">
                          <div
                            className={cn(
                              "text-center",
                              jetbrains_mono.className
                            )}
                          >
                            <h6 className="text-gray-400 text-[10px]">
                              Valid till
                            </h6>
                            <p className="text-primary text-xs">
                              12 June, 2025
                            </p>
                          </div>
                        </div>

                        <div
                          className={cn(
                            "text-center flex-1 text-gray-600",
                            jetbrains_mono.className
                          )}
                        >
                          <h4 className="font-light text-[12px]">SIGNED</h4>
                          <p className="text-[10px]">
                            GM, Kaduna State Agriultural Development Agency
                          </p>
                        </div>
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
    </section>
  );
}

export default CertificatesSharedPage;

"use client";
import { jetbrains_mono, space_grotesk } from "@/app/fonts";
import { KadaButton } from "@/components/form/button";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import useCheckUserFields from "@/hooks/user-field";
import { userAtom } from "@/stores/user";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import html2canvas from "html2canvas";
import { useAtomValue } from "jotai";
import React from "react";
import { cn } from "rizzui";
import jsPDF from "jspdf";

function VendorCertificatePage() {
  useDashboardTitle("Certificate");
  useCheckUserFields([
    {
      field: "vendorProfile.isVerified",
      redirectTo: "/dashboard/vendor",
      condition: (value) => value !== true,
    },
  ]);
  const [loaded, setLoaded] = React.useState(false);
  const certificateRef = React.useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = React.useState(false);
  const { user } = useAtomValue(userAtom);

  const downloadAsImage = async () => {
    if (!certificateRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "certificate.png";
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const downloadAsPDF = async () => {
    if (!certificateRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
      });
      const image = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      const imgProps = pdf.getImageProperties(image);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.internal.pageSize.height = pdfHeight;

      pdf.addImage(image, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("certificate.pdf");
    } finally {
      setDownloading(false);
    }
  };

  React.useEffect(() => {
    if (user && user?.vendorProfile?.isVerified) {
      setLoaded(true);
    }
  }, [user]);

  if (!loaded) return null;

  return (
    <section className="flex items-center justify-center">
      <div className="w-7/12">
        <div className="relative w-10/12 mx-auto">
          <div
            className="w-full aspect-[1.5142/1] bg-[#E9E9E9] border rounded-lg p-4"
            ref={certificateRef}
          >
            <div className="flex h-full">
              <div className="flex-1 h-full flex flex-col justify-between">
                <div className="flex items-center">
                  <div className="">
                    <img
                      src="/images/logo.png"
                      alt="kada logo"
                      className="object-contain w-10 h-10"
                    />
                  </div>
                  <div className="flex-1 text-center">
                    <h4
                      className={cn(
                        space_grotesk.className,
                        "text-center uppercase font-railway tracking-[4px] text-gray-700 text-xs"
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
                      {user?.vendorProfile?.vendorName}
                    </p>

                    <p className={cn("text-[10px]")}>
                      is certified and licensed to operate on KADA platform{" "}
                      <br /> based on KADA policy based
                    </p>
                  </div>
                </div>

                <div className="flex items-end mt-20">
                  <div className="">
                    <div
                      className={cn("text-center", jetbrains_mono.className)}
                    >
                      <h6 className="text-gray-400 text-[10px]">Valid till</h6>
                      <p className="text-primary text-xs">12 June, 2025</p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "text-center flex-1 text-gray-600",
                      jetbrains_mono.className
                    )}
                  >
                    <img
                      src="/images/signature.png"
                      alt="signature"
                      width={50}
                      height={50}
                      className="mx-auto"
                    />
                    <div className="w-5/12 h-[1px] bg-gray-400 mx-auto mb-3" />
                    <h4 className="font-light text-[12px]">SIGNED</h4>
                    <p className="text-[10px]">
                      GM, Kaduna State Agriultural Development Agency
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-full w-[15%]">
                <div className="bg-[url('/images/license-img.jpg')] bg-center bg-cover bg-no-repeat h-[80%] rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <KadaButton
            className="w-fit rounded-full mt-5"
            leftIcon={<ArrowDownTrayIcon className="w-4 h-4 mr-2" />}
            onClick={downloadAsImage}
            disabled={downloading}
          >
            Download as Image
          </KadaButton>
          <KadaButton
            className="w-fit rounded-full mt-5 ml-2"
            leftIcon={<ArrowDownTrayIcon className="w-4 h-4 mr-2" />}
            onClick={downloadAsPDF}
            disabled={downloading}
          >
            Download as PDF
          </KadaButton>
        </div>
      </div>
    </section>
  );
}

export default VendorCertificatePage;

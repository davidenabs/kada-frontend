import VendorCertificatePage from "@/components/shared/vendor/certificate";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "License",
};

export default function License() {
  return <VendorCertificatePage />;
}

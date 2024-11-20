import React from "react";
import { Metadata } from "next";
import CertificatesSharedPage from "@/components/shared/admin/tools/certificates";

export const metadata: Metadata = {
  title: "Certificates",
};

export default function Page() {
  return <CertificatesSharedPage />;
}

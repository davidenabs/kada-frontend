import FarmerVendorsSharedPage from "@/components/shared/farmer/vendors";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vendors",
};

export default function VendorPage() {
  return <FarmerVendorsSharedPage />;
}

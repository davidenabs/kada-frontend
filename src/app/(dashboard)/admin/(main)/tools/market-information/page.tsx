import React from "react";
import { Metadata } from "next";
import AdminMarketInfoSharedPage from "@/components/shared/admin/tools/market-info";

export const metadata: Metadata = {
  title: "Market Information - Tools",
  description: "Market Information",
};

export default function AdminMarketInformation() {
  return <AdminMarketInfoSharedPage />;
}

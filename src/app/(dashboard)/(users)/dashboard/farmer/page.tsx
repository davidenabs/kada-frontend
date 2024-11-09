import React from "react";
import FarmerDashboardSharedPage from "@/components/dashboards/farmer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farmer Dashboard",
};

export default function FarmerDashboardPage() {
  return <FarmerDashboardSharedPage />;
}

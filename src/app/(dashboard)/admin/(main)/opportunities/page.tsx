import AdminOpportunitiesPage from "@/components/shared/admin/opportunities";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Opportunities",
};

function Opportunities() {
  return <AdminOpportunitiesPage />;
}

export default Opportunities;

import AdminFarmersSharedPage from "@/components/shared/admin/farmers";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Farmers",
};

export default function Page() {
  return <AdminFarmersSharedPage />;
}

import React from "react";
import AdminCooperativesSharedPage from "@/components/shared/admin/cooperatives";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cooperatives",
};

export default function Page() {
  return <AdminCooperativesSharedPage />;
}

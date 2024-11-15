import React from "react";
import AdminRequestSharedPage from "@/components/shared/admin/request";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Requests",
};

export default function AdminRequestPage() {
  return <AdminRequestSharedPage />;
}

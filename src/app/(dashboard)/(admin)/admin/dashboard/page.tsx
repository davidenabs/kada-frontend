import AdminDashboardSharedPage from "@/components/shared/admin/dashboard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardPage() {
  return <AdminDashboardSharedPage />;
}

import React from "react";
import { Metadata } from "next";
import AdminSubsriptionSharedPage from "@/components/shared/admin/subsriptions";

export const metadata: Metadata = {
  title: "Subscriptions",
};

export default function SubscriptionsPage() {
  return <AdminSubsriptionSharedPage />;
}

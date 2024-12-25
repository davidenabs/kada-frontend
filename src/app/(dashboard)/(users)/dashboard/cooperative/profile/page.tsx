import React from "react";
import CooperativeProfileSharedPage from "@/components/shared/cooperative/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Cooperative Dashboard",
};

export default function CooperativeProfilePage() {
  return <CooperativeProfileSharedPage />;
}

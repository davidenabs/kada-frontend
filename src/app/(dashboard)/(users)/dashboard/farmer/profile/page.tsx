import FarmerProfileSharedPage from "@/components/shared/farmer/profile";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "User Profile",
};

export default function FarmerProfilePage() {
  return <FarmerProfileSharedPage />;
}

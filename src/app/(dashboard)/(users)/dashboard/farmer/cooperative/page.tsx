import FarmerCooperativeSharedPage from "@/components/shared/farmer/cooperative";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cooperative",
};

export default function FarmerCooperativePage() {
  return <FarmerCooperativeSharedPage />;
}

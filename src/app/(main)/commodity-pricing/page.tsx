import React from "react";
import { Metadata } from "next";
import PricingInformation from "@/components/main/pricing-information";

export const metadata: Metadata = {
  title: "Pricing Information",
};

export default function PricingInformationPage() {
  return <PricingInformation />;
}

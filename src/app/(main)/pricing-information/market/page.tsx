import React from "react";
import { Metadata } from "next";
import MarketInsights from "@/components/main/pricing-information/market";

export const metadata: Metadata = {
  title: "Pricing Information",
};

export default function PricingInformationMarketPage() {
  return <MarketInsights />;
}

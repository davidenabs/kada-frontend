import FarmerCooperativeSharedPage from "@/components/shared/farmer/cooperative";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cooperative",
};

type Params = {
  farmerId: string;
};

export default function FarmerCooperativePage({ params }: { params: Params }) {
  const { farmerId } = params;
  return <FarmerCooperativeSharedPage farmerId={farmerId} />;
}

import React from "react";
import { Metadata } from "next";
import GoodAgronomicPractices from "@/components/main/good-agronomic";

export const metadata: Metadata = {
  title: "Good Agronomic Practices",
};

export default function Calendar() {
  return <GoodAgronomicPractices />;
}

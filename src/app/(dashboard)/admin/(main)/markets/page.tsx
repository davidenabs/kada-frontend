import MarketsPages from "@/components/shared/admin/markets";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Markets",
};

export default function PageMarkets() {
  return <MarketsPages />;
}

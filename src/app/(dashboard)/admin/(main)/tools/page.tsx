import ToolsSharedPage from "@/components/shared/admin/tools";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tools",
};

export default function Page() {
  return <ToolsSharedPage />;
}

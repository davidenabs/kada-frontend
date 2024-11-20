import KeyValueArea from "@/components/account-setup/data-enumerator/key";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vendor",
};

export default function Page() {
  return <KeyValueArea />;
}

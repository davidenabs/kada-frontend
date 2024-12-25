import VerificationProfile from "@/components/account-setup/verification-profile";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile",
};

export default function NimcPage() {
  return <VerificationProfile />;
}

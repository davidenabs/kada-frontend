import PartnerDahboardLayout from "@/layouts/dashboard/partner";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PartnerDahboardLayout>{children}</PartnerDahboardLayout>;
}

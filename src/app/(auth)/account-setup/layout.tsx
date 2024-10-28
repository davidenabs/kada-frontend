import AccountSetupLayout from "@/layouts/account-setup";
import React from "react";

export default function MainAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AccountSetupLayout><div className="app_container mt-[10%]">{children}</div></AccountSetupLayout>
  );
}

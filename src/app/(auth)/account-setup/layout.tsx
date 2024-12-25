import AccountSetupLayout from "@/layouts/account-setup";
import React from "react";

export default function MainAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AccountSetupLayout>
      <div className="app_container">{children}</div>
    </AccountSetupLayout>
  );
}

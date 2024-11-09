import React from "react";
import { Metadata } from "next";
import AccountSetupLayout from "@/layouts/account-setup";
import ResetPassword from "@/components/shared/auth/reset-password";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPasswordPage() {
  return (
    <AccountSetupLayout>
      <div className="app_container">
        <div className="flex justify-center items-center">
          <ResetPassword />
        </div>
      </div>
    </AccountSetupLayout>
  );
}

import ForgotPassword from "@/components/shared/auth/forgot-password";
import AccountSetupLayout from "@/layouts/account-setup";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <AccountSetupLayout>
      <div className="app_container">
        <div className="flex justify-center items-center">
          <ForgotPassword />
        </div>
      </div>
    </AccountSetupLayout>
  );
}

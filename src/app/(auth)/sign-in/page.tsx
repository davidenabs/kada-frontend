import SignInForm from "@/components/auth/signin/form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return <SignInForm />;
}

import SignInLayout from "@/layouts/signin";
import React from "react";

export default function MainAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignInLayout>{children}</SignInLayout>
  );
}

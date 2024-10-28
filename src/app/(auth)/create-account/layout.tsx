import CreateAccountLayout from "@/layouts/create-account";
import React from "react";

export default function MainAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CreateAccountLayout>{children}</CreateAccountLayout>
  );
}

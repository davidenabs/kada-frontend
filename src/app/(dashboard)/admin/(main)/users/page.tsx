import AdminUsersSharedPage from "@/components/shared/admin/users";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Users",
};

export default function User() {
  return <AdminUsersSharedPage />;
}

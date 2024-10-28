import React from "react";
import NotFoundPage from "@/components/shared/not-found";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | KADA",
};

export default function NotFound() {
  return <NotFoundPage />;
}

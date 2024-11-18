import CroppingCalendarPage from "@/components/shared/admin/tools/cropping-calendar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cropping Calendar",
};

export default function CroppinCallendar() {
  return <CroppingCalendarPage />;
}

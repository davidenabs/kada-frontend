import React from "react";
import CroppingCalendar from "@/components/main/cropping-calendar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cropping Calendar",
};

const Calendar = () => {
  return <CroppingCalendar />;
};

export default Calendar;

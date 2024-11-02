import CooperativeDahboardLayout from "@/layouts/dashboard/cooperative";
import React from "react";

const MainDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <CooperativeDahboardLayout>{children}</CooperativeDahboardLayout>
    </>
  );
};

export default MainDashboardLayout;

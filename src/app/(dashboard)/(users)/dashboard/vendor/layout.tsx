import VendorDahboardLayout from "@/layouts/dashboard/vendor";
import React from "react";

const MainDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <VendorDahboardLayout>{children}</VendorDahboardLayout>
    </>
  );
};

export default MainDashboardLayout;

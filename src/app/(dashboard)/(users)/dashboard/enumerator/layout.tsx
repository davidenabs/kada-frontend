import EnumeratorDashboardLayout from "@/layouts/dashboard/enumerator";
import React from "react";

const MainDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <EnumeratorDashboardLayout>{children}</EnumeratorDashboardLayout>
    </>
  );
};

export default MainDashboardLayout;

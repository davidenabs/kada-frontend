import FarmerDahboardLayout from "@/layouts/dashboard/farmer";

const MainDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <FarmerDahboardLayout>{children}</FarmerDahboardLayout>
    </>
  );
};

export default MainDashboardLayout;

import CooperativeDashboardPage from "@/components/shared/cooperative/dashboard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home | Cooperative Dashboard",
};

const CooperativeDashboard: React.FC = () => {
  return <CooperativeDashboardPage />;
};

export default CooperativeDashboard;

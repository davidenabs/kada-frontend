import { cooperativeDashboardMetadata } from "@/app/_templates/metadata";
import CooperativeDashboardPage from "@/components/shared/cooperative/dashboard";
import React from "react";

export const metadata = cooperativeDashboardMetadata;

const CooperativeDashboard: React.FC = () => {
  return <CooperativeDashboardPage />;
};

export default CooperativeDashboard;

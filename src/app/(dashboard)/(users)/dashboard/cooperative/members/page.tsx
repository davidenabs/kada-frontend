import CooperativeMembersPage from "@/components/shared/cooperative/members/page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Members | Cooperative Dashboard",
};

const CooperativeDashboard: React.FC = () => {
  return <CooperativeMembersPage />;
};

export default CooperativeDashboard;

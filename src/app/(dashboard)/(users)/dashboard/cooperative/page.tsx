"use client"
import Overview from '@/components/dashboards/cooperative/overview';
import QuickActions from '@/components/dashboards/cooperative/quick-action';
import useDashboardTitle from '@/hooks/use-dashboard-tite';
import React from 'react';

const CooperativeDashboard: React.FC = () => {
  useDashboardTitle("Dashboard");
  return (
    <>
      <Overview />
      <QuickActions /></>
  );
};

export default CooperativeDashboard;
"use client"
import FarmerTable from '@/components/dashboards/admin/farmer-table';
import Overview from '@/components/dashboards/admin/overview';
import useDashboardTitle from '@/hooks/use-dashboard-tite';
import React from 'react';

const CooperativeDashboard: React.FC = () => {
  useDashboardTitle("Dashboard");

  const statisticsData = [
    { backgroundColor: 'bg-cyan-800 text-white ', count: '200', label: 'Registered Farmers', link: '/farmers' },
    { backgroundColor: 'bg-teal-500 text-white ', count: '12', label: 'Registered Cooperatives', link: '/cooperatives' },
    { backgroundColor: 'bg-green-400 text-white ', count: '25', label: 'Registered Vendors', link: '/vendors' },
  ];


  return (
    <>
      <Overview statisticsData={statisticsData} />
      <FarmerTable />
    </>
  );
};

export default CooperativeDashboard;
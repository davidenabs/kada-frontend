"use client"
import Overview from '@/components/dashboards/admin/overview';
import RequestTable from '@/components/dashboards/admin/requests/request-table';
import useDashboardTitle from '@/hooks/use-dashboard-tite';
import React from 'react';

const AdminRequestPage: React.FC = () => {
  useDashboardTitle("Requests");

  const statisticsData = [
    { backgroundColor: 'bg-[#F6F6F6]', count: '200', label: 'License Requested', link: '/farmers' },
    { backgroundColor: 'bg-[#F6F6F6]', count: '12', label: 'License Requested', link: '/cooperatives' },
    { backgroundColor: 'bg-[#F6F6F6]', count: '25', label: 'Registered Vendors', link: '/vendors' },
  ];

  return (
    <div className='space-y-3'>
      <div className="self-start text-sm font-bold text-zinc-700 max-md:hidden">
        License and Certifications
      </div>
      <Overview statisticsData={statisticsData} />
      <RequestTable />
    </div>
  );
};

export default AdminRequestPage;
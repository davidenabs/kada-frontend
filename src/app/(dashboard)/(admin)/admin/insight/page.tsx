"use client"
import FundingInsight from '@/components/dashboards/admin/insights/fund';
import InterventionProgrammes from '@/components/dashboards/admin/insights/intervention';
import GeneralOverview from '@/components/dashboards/admin/insights/overview';
import TotalAmount from '@/components/dashboards/admin/insights/total';
import useDashboardTitle from '@/hooks/use-dashboard-tite';
import React from 'react';

const AdminRequestPage: React.FC = () => {
  useDashboardTitle("Insights");

  const statisticsData = [
    { backgroundColor: 'bg-[#F6F6F6]', count: '200', label: 'License Requested', link: '/farmers' },
    { backgroundColor: 'bg-[#F6F6F6]', count: '12', label: 'License Requested', link: '/cooperatives' },
    { backgroundColor: 'bg-[#F6F6F6]', count: '25', label: 'Registered Vendors', link: '/vendors' },
    { backgroundColor: 'bg-cyan-800 text-white ', count: '200', label: 'Registered Farmers', link: '/farmers' },
    { backgroundColor: 'bg-teal-500 text-white ', count: '12', label: 'Registered Cooperatives', link: '/cooperatives' },
    { backgroundColor: 'bg-green-400 text-white ', count: '25', label: 'Registered Vendors', link: '/vendors' },
  ];

  return (

    <div className="flex flex-col pb-10">
      <section className="w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-4/5 max-md:ml-0 max-md:w-full">
            <GeneralOverview />
          </div>
          <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
            <FundingInsight />
          </div>
        </div>
      </section>
      <section className="mt- max-md:mr-1.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <InterventionProgrammes />
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <TotalAmount />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminRequestPage;
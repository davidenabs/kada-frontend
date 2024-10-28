"use client"
import FarmerTable from '@/components/dashboards/cooperative/members/farm-table';
import Input from '@/components/form/input';
import useDashboardTitle from '@/hooks/use-dashboard-tite';
import React from 'react';

const CooperativeDashboard: React.FC = () => {
  useDashboardTitle("Members");
  return (
    <>
      <div className="flex flex-col items-start leading-tight rounded-none">
        <div className="flex gap-5 text-sm text-black whitespace-nowrap">
          <Input placeholder='Search' className=' !py3 border border-tertiary-400' ></Input>
          <Input placeholder='Filter' className='max-w-[113px] !bg-[#EEEEEE] !py3 ' ></Input>
        </div>
        <h2 className="mt-6 text-base font-medium text-black">
          Farmer's Information
        </h2>
        <FarmerTable />
      </div>

    </>
  );
};

export default CooperativeDashboard;
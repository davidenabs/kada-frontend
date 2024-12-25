"use client"
import BioSection from '@/components/dashboards/admin/farmer/bio';
import FundingHistory from '@/components/dashboards/admin/farmer/fund-history';
import ProfileHeader from '@/components/dashboards/admin/farmer/header';
import ProductsSection from '@/components/dashboards/admin/farmer/product';
import useDashboardTitle from '@/hooks/use-dashboard-tite';
import React from 'react';


const FarmerProfile: React.FC = () => {
  useDashboardTitle('Farmer Information');
  return (
    <div className="flex flex-col">
     
      <ProfileHeader />
      <div className="md:mt-10 w-full max-md:max-w-full">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col w-full">
            <section className="grow md:px-6 md:pt-5 pb-40 w-full bg-white rounded md:border border-solid md:shadow-lg border-zinc-100 max-mdpx-5 max-md:pb-24 max-md:mt-7 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-[27%] max-md:ml-0 max-md:w-full">
                  <img loading="lazy" src={'/images/moses.png'} alt={`Profile picture of`} className="object-contain shrink-0 max-w-full aspect-[0.89] w-[202px] max-md:mt-10" />
                </div>
                <div className="flex flex-col ml-3 w-full max-md:ml-0 max-md:w-full">
                  <BioSection

                  />
                  <FundingHistory />
                </div>
              </div>
            </section>
          </div>
          <ProductsSection />
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
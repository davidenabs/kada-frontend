"use client"
import { UserIcon } from '@/icons';
import React, { useState } from 'react';

const TabNavigation: React.FC = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState('Farmers');

  return (
    <nav className="flex gap-10 items-center mt-10 max-w-full text-base font-bold leading-tight text-teal-700 whitespace-nowrap w-[482px] max-md:mt-10">
      {/* Farmers Tab */}
      <a
        href="#"
        className={`flex overflow-hidden gap-4 self-stretch  py-3 ${
          activeTab === 'Farmers' ? 'bg-emerald-50 border-b border-teal-700 pl-5 pr-16' : ''
        }`}
        onClick={() => setActiveTab('Farmers')}
      >
        {activeTab === 'Farmers' && <UserIcon className="w-4 h-4" />}
        <span>Farmers</span>
      </a>

      {/* Cooperatives Tab */}
      <a
        href="#"
        className={`flex overflow-hidden gap-4 self-stretch  py-3 ${
          activeTab === 'Cooperatives' ? 'bg-emerald-50 border-b border-teal-700 pl-5 pr-16' : ''
        }`}
        onClick={() => setActiveTab('Cooperatives')}
      >
        {activeTab === 'Cooperatives' && <UserIcon className="w-4 h-4" />}
        <span>Cooperatives</span>
      </a>

  
      {/* Vendors Tab */}
      <a
        href="#"
        className={`flex overflow-hidden gap-4 self-stretch  py-3 ${
          activeTab === 'Vendors' ? 'bg-emerald-50 border-b border-teal-700 pl-5 pr-16' : ''
        }`}
        onClick={() => setActiveTab('Vendors')}
      >
        {activeTab === 'Vendors' && <UserIcon className="w-4 h-4" />}
        <span>Vendors</span>
      </a>


     
    </nav>
  );
};

export default TabNavigation;

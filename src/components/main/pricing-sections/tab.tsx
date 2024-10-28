import cn from '@/utils/class_names';
import React from 'react';

const PricingTabs: React.FC<{ tab: string, setTab: (tabName: string) => void; }> = ({ tab, setTab }) => {
  return (
    <>
      <div className="flex gap-5 justify-between self-center max-w-full text-2xl font-medium leading-tight w-[338px]">
        <div onClick={() => setTab('farmers')} className={cn("flex flex-col  cursor-pointer", tab === 'farmers' ? "text-green-800" : "text-black text-opacity-50 ")}>
          <div>For Farmers</div>
          {/* {tab  === 'farmers' && } */}
          <div className={`"shrink-0 mt-1.5 ${tab === 'farmers' ? 'border-green-800' : 'border-black border-opacity-50'}  border-solid border-[3px] h-[3px] z-10`} />
        </div>
        <div onClick={() => setTab('stakeholders')} className={cn("flex flex-col  cursor-pointer", tab === 'stakeholders' ? "text-green-800" : "text-black text-opacity-50 ")}>
          <div>For Stakeholders</div>
          <div className={`"shrink-0 mt-1.5 ${tab === 'stakeholders' ? 'border-green-800' : 'border-black border-opacity-50'}  border-solid border-[3px] h-[3px] z-10`} />
        </div>
      </div>
      <div className="w-full border border-solid border-black border-opacity-20 min-h-[1px] max-md:max-w-full -m-[2px]" /></>
  );
};

export default PricingTabs;
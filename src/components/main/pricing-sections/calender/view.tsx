"use client"
import Select from '@/components/form/select';
import React, { useState } from 'react';

const CalendarView: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("View by Months");
  return (
    <div className="flex gap-5 items-center self-start text-base">
      <div className="self-stretch my-auto">Calender view</div>

      <Select options={[ ]}
        value={selectedOption} setValue={setSelectedOption} className='bg-white  !py-3 !px-3 !border-stone-300 !rounded-[60px] !w-[172px]' />
    </div>
  );
};

export default CalendarView;
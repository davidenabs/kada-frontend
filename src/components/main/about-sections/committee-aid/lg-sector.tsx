
"use client"
import Select from '@/components/form/select';
import React, { useState } from 'react';

const LocalGovernmentSelector: React.FC = () => {

    const [localGovernment, setLocalGovernment] = useState('Sabon Tasha');

    return (
        <div className="flex flex-col md:self-start self-center text-sm">
            <label htmlFor="localGovernment" className="self-start font-bold leading-none text-zinc-700">
                Select Local Government
            </label>
            <div className="flex flex-col mt-3 w-full text-black rounded-none maxw-[391px]">
                <Select options={[]} value={localGovernment} setValue={setLocalGovernment} className='md:w-[391px] w-full !py-2'>
                </Select>
            </div>
        </div>
    );
};

export default LocalGovernmentSelector;
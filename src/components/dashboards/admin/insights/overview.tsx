import React from 'react';
import StatCard from './stat';
// import StatCard from './StatCard';

interface OverviewData {
    title: string;
    count: number;
    bgColor: string;
}

const overviewData: OverviewData[] = [
    { title: 'Registered Farmers', count: 200, bgColor: 'bg-neutral-50' },
    { title: 'Registered Cooperatives', count: 200, bgColor: 'bg-neutral-50' },
    { title: 'Registered Vendors', count: 200, bgColor: 'bg-neutral-50' },
    { title: 'License Requested', count: 35, bgColor: 'bg-green-100' },
    { title: 'License Approved', count: 12, bgColor: 'bg-yellow-100' },
    { title: 'License Rejected', count: 23, bgColor: 'bg-orange-100' },
];

const GeneralOverview: React.FC = () => {
    return (
        <div className="flex flex-col w-full max-md:mt-5 max-md:max-w-full">
            <h2 className="self-start text-lg font-bold leading-tight text-zinc-700">
                General Overview
            </h2>
            <div className="mt-3 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                    {overviewData.slice(0, 3).map((data, index) => (
                        <StatCard key={index} {...data} />
                    ))}
                </div>
            </div>
            <div className="mt-5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                    {overviewData.slice(3).map((data, index) => (
                        <StatCard key={index} {...data} />
                    ))}
                </div>
            </div>
            <h2 className="self-start mt-16 text-lg font-bold leading-tight text-zinc-700 max-md:mt-10">
                Funding Insight
            </h2>
        </div>
    );
};

export default GeneralOverview;
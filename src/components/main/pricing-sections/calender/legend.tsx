import React from 'react';

interface LegendItem {
    color: string;
    description: string;
}

const legendItems: LegendItem[] = [
    { color: 'bg-white border border-solid border-zinc-700', description: 'No or low vegetation/begining of emergence' },
    { color: 'bg-lime-200', description: 'Medium vegetation' },
    { color: 'bg-green-600', description: 'Dense vegetation' },
    { color: 'bg-black', description: 'Flooded' },
    { color: 'bg-green-700', description: 'Dry Vegettaion /Harvesting Stage' },
];

const CalendarLegend: React.FC = () => {
    return (
        <div className="flex flex-wrap gap-5 justify-between items-center py-3 pr-5 pl-20 bg-white max-md:pl-5 max-md:max-w-full">
            <div className="shrink-0 self-start w-px border border-solid border-neutral-200 h-[102px]" />
            <div className="flex flex-col self-stretch my-auto">
                {legendItems.slice(0, 3).map((item, index) => (
                    <div key={index} className={`flex gap-3 items-center ${index > 0 ? 'mt-6' : ''}`}>
                        <div className={`flex shrink-0 self-stretch my-auto w-8 ${item.color} h-[26px]`} />
                        <div className="self-stretch my-auto">{item.description}</div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col self-stretch my-auto">
                {legendItems.slice(3).map((item, index) => (
                    <div key={index} className={`flex gap-3 items-center ${index > 0 ? 'mt-6' : ''}`}>
                        <div className={`flex shrink-0 self-stretch my-auto w-8 ${item.color} h-[26px]`} />
                        <div className="self-stretch my-auto">{item.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarLegend;
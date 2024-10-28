import React from 'react';

interface KeyItem {
  color: string;
  description: string;
}

const keyItems: KeyItem[] = [
  { color: 'bg-white border border-solid border-zinc-700', description: 'No or low vegetation/begining of emergence' },
  { color: 'bg-lime-200', description: 'Medium vegetation' },
  { color: 'bg-green-600', description: 'Dense vegetation' },
  { color: 'bg-black', description: 'Flooded' },
  { color: 'bg-green-700', description: 'Dry Vegettaion /Harvesting Stage' },
];

const CalendarKey: React.FC = () => {
  return (
    <div className="flex flex-col items-start pr-20 pl-9 mt-16 w-full text-xs text-zinc-700 max-md:px-5 max-md:mt-10">
      <h2 className="text-2xl font-semibold text-black">Key</h2>
      {keyItems.map((item, index) => (
        <div key={index} className="flex gap-3 items-center mt-4">
          <div className={`flex shrink-0 self-stretch my-auto w-8 ${item.color} h-[26px]`} />
          <div className="self-stretch my-auto">{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default CalendarKey;
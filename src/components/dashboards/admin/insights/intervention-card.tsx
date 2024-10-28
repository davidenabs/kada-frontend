import React from 'react';

interface InterventionCardProps {
  title: string;
  date: string;
  amount: string;
  imageUrl: string;
}

const InterventionCard: React.FC<InterventionCardProps> = ({ title, date, amount, imageUrl }) => {
  return (
    <div className="flex flex-wrap gap-10 mt-6">
      <div className="flex flex-auto gap-5">
        <img loading="lazy" src={imageUrl} alt={title} className="object-contain shrink-0 w-20 rounded-lg aspect-[1.7]" />
        <div className="flex flex-col my-auto">
          <div className="text-base text-black">{title}</div>
          <div className="self-start mt-1.5 text-sm text-zinc-500">{date}</div>
        </div>
      </div>
      <div className="flex gap-10 my-auto text-black">
        <div className="text-base">{amount}</div>
        <button className="text-sm">View</button>
      </div>
    </div>
  );
};

export default InterventionCard;
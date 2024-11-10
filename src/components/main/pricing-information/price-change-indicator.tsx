import { PriceHighIcon, PriceLowIcon } from '@/icons';
import React from 'react';

interface PriceChangeIndicatorProps {
  type: 'increase' | 'reduction';
}

const PriceChangeIndicator: React.FC<PriceChangeIndicatorProps> = ({ type }) => {
  const label = type === 'increase' ? 'Price increase' : 'Price reduction';
  const icon = type === 'increase' ?
    (<PriceHighIcon className="w-[18px] h-[18px]" />) :
    (<PriceLowIcon className="w-[18px] h-[18px]" />);

  return (
    <div className={`flex gap-2 items-center w-full ${type === 'reduction' ? 'mt-1' : ''}`}>
      {icon}
      <span className="self-stretch my-auto">{label}</span>
    </div>
  );
};

export default PriceChangeIndicator;
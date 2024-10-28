import React from 'react';

interface MonthButtonProps {
  month: string;
  isActive?: boolean;
}

const MonthButton: React.FC<MonthButtonProps> = ({ month, isActive = false }) => {
  const baseClasses = "flex items-center justify-center text-2xl font-semibold rounded-full h-[67px] w-[67px]";
  const activeClasses = isActive ? "bg-green-500" : "bg-zinc-100";

  return (
    <button className={`${baseClasses} ${activeClasses}`} aria-pressed={isActive}>
      {month}
    </button>
  );
};

export default MonthButton;
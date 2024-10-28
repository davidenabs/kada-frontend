import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex gap-2.5 items-start mt-4">
      {[...Array(totalSteps)].map((_, index) => (
        <div 
          key={index}
          className={`flex shrink-0 h-2 rounded-2xl w-[69px] ${
            index < currentStep ? 'bg-green-600' : 'bg-zinc-100'
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
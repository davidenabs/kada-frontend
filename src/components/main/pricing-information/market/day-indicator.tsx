import { DoubleCheckIcon, XCloseIcon } from "@/icons";
import React from "react";

interface DayIndicatorProps {
  day: string;
  isActive: boolean;
}

const DayIndicator: React.FC<DayIndicatorProps> = ({ day, isActive }) => {
  return (
    <div className="flex flex-col self-stretch my-auto w-[29px]">
      <div data-layername={day.toLowerCase()}>{day}</div>
      {isActive ? (
        <DoubleCheckIcon className=" w-5 h-5 mt-1" />
      ) : (
        <XCloseIcon className=" w-5 h-5 mt-1" />
      )}
    </div>
  );
};

export default DayIndicator;

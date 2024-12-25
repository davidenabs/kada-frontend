import { Column } from "@/components/common/table";
import { IMarket } from "@/interface/market";
import { format } from "date-fns";
import React from "react";

const columns: Column<IMarket>[] = [
  {
    label: "Name",
    key: "name",
    render: (item) => (
      <div className="">
        <span>{item.name}</span>
      </div>
    ),
  },
  {
    label: "LGA",
    key: "lga",
    render: (item) => (
      <div className="">
        <span>{item.lga?.name}</span>
      </div>
    ),
  },
  {
    label: "Zone",
    key: "zone",
    render: (item) => (
      <div className="">
        <span>{item.lga?.zone?.name}</span>
      </div>
    ),
  },
  {
    label: "Ward",
    key: "ward",
    render: (item) => (
      <div className="">
        <span>{item.ward}</span>
      </div>
    ),
  },
  {
    label: "Size",
    key: "size",
    render: (item) => (
      <div className="">
        <span>{item.size}</span>
      </div>
    ),
  },
  {
    label: "Opening Days",
    key: "openingDays",
    render: (item) => {
      const days = item.openingDays.split(","); // Split the string into an array
      const maxVisibleDays = 3; // Set the maximum number of days to display
      const totalDays = days.length; // Total number of days
      const [visibleCount, setVisibleCount] = React.useState(maxVisibleDays); // State to manage the number of visible days
  
      const remainingDaysCount = totalDays - visibleCount; // Count the remaining days
  
      const toggleExpand = () => {
        if (remainingDaysCount > 0) {
          // Increment the visible count by the number of remaining days or set it to total days
          setVisibleCount(Math.min(totalDays, visibleCount + remainingDaysCount));
        }
      };
  
      return (
        <div>
          <span
            onClick={toggleExpand}
            style={{ cursor: 'pointer' }}
          >
            {days.slice(0, visibleCount).join(", ")} {/* Show the visible days */}
            {remainingDaysCount > 0 && ` + ${remainingDaysCount} more`} {/* Show remaining days if any */}
          </span>
        </div>
      );
    },
  },
  {
    label: "Opening Time",
    key: "openingTime",
    render: (item) => (
      <div className="">
        <span>{item.openingTime}</span>
      </div>
    ),
  },
  {
    label: "Created At",
    key: "createdAt",
    render: (item) => (
      <div className="">
        <span>{format(new Date(item.createdAt), "dd/MM/yyyy")}</span>
      </div>
    ),
  },
];

export default columns;

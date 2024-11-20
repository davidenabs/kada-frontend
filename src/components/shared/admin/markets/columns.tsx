import { Column } from "@/components/common/table";
import { IMarket } from "@/interface/market";
import { format } from "date-fns";

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
    key: "localGovernmentArea",
    render: (item) => (
      <div className="">
        <span>{item.localGovernmentArea}</span>
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
    render: (item) => (
      <div className="">
        <span>{item.openingDays}</span>
      </div>
    ),
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

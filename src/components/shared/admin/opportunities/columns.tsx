import { Column } from "@/components/common/table";
import { format } from "date-fns";

const columns: Column<any>[] = [
  {
    label: "Date Publish",
    key: "date",
    render: (item) => <div className="">{format(new Date(), "dd/mm/YY")}</div>,
  },
  {
    label: "Source",
    key: "title",
    render: (item) => <div className="">{item.title}</div>,
  },
  {
    label: "Description",
    key: "content",
    render: (item) => <div className="">{item.content}</div>,
  },
  {
    label: "Click Rate",
    key: "cta",
    render: (item) => <div className="">{item.cta}</div>,
  },
  {
    label: "Publish to",
    key: "userType",
    render: (item) => <div className="">{item.userType}</div>,
  },
  {
    label: "Availabilty",
    key: "availability",
    render: (item) => <div className="">{item.availability}</div>,
  },
  {
    label: "Status",
    key: "status",
    render: (item) => <div className="">{item.status}</div>,
  },
];

export default columns;

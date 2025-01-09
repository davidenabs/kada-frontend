import { Column } from "@/components/common/table";
import { format } from "date-fns";
import { Badge, cn } from "rizzui";

const columns: Column<any>[] = [
  {
    label: "Date Publish",
    key: "date",
    render: (item) => <div className="">{format(new Date(), "dd/mm/yy")}</div>,
  },
  {
    label: "Source",
    key: "title",
    render: (item) => <div className="">{item.title}</div>,
  },
  {
    label: "Description",
    key: "content",
    render: (item) => (
      <div className="">
        <div dangerouslySetInnerHTML={{ __html: item.shortDescription }} />
      </div>
    ),
  },
  {
    label: "Click Rate",
    key: "cta",
    render: (item) => <div className="">{item.cta}</div>,
  },
  {
    label: "Availabilty",
    key: "availability",
    render: (item) => <div className="">{item.userType}</div>,
  },
  {
    label: "Status",
    key: "status",
    render: (item) => {
      const isClosed = new Date() > new Date(item.dueDate);
      return (
        <Badge
          variant="outline"
          className={cn(
            "text-xs font-normal",
            isClosed ? "bg-red-500 text-white" : "bg-green-500"
          )}
        >
          {isClosed ? "Closed" : "Open"}
        </Badge>
      );
    },
  },
];

export default columns;

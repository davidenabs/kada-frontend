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
    label: "Title",
    key: "title",
    render: (item) => <div className="">{item.title}</div>,
  },
  {
    label: "Description",
    key: "shortDescription",
    render: (item) => (
      <div className="">
        {item.shortDescription.length > 100 ? item.shortDescription.substring(0, 100) + "..." : item.shortDescription}
      </div>
    ),
  },
  {
    label: "CTA",
    key: "cta",
    render: (item) => <div className="">
      {item.cta.length > 20 ? item.cta.substring(0, 20) + "..." : item.cta}
    </div>,
  },
  {
    label: "Availability",
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

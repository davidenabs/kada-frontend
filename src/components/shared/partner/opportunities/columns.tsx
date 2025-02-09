import { Column } from "@/components/common/table";
import { format } from "date-fns";
import { Badge, cn } from "rizzui";

const columns: Column<any>[] = [
  {
    label: "Image",
    key: "featuredImage",
    render: (item) => (
      <div className="">
        <img
          src={item.featuredImage}
          alt="Featured"
          className="w-16 h-16 object-cover"
        />
      </div>
    ),
  },
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
    label: "Period",
    key: "applicationDate",
    render: (item) => (
      <div className="">
        {item?.applicationDate
          ? `Start: ${format(new Date(item.applicationDate), "dd/MM/yyyy")}`
          : "Start date not available"}{" "}
        -
        {item?.closingDate
          ? ` Close: ${format(new Date(item.closingDate), "dd/MM/yyyy")}`
          : "Closing date not available"}
      </div>
    ),
  },
  // {
  //   label: "CTA",
  //   key: "cta",
  //   render: (item) => (
  //     <div className="">
  //       {/* {item.cta.length > 20 ? item.cta.substring(0, 20) + "..." : item.cta} */}
  //     </div>
  //   ),
  // },
  {
    label: "Post type",
    key: "type",
    render: (item) => (
      <div className="">
        {item.type.charAt(0).toUpperCase() + item.type.slice(1).toLowerCase()}
      </div>
    ),
  },
  {
    label: "Availability",
    key: "availability",
    render: (item) => <div className="">{item.userType}</div>,
  },
  {
    label: "Limit",
    key: "applicationLimit",
    render: (item) => (
      <div className="">
        {item.applicationLimit == null ? "Unlimited" : item.applicationLimit}
      </div>
    ),
  },
  {
    label: "Region",
    key: "zone",
    render: (item) => (
      <div className="">
        <ul className=" list-disc">
          <li>Zone: {item.zone}</li>
          <li>Ward: {item.ward}</li>
          <li>LGA: {item.lga}</li>
        </ul>
      </div>
    ),
  },
  {
    label: "Status",
    key: "isVerified",
    render: (item) => {
      // const isClosed = new Date() > new Date(item.dueDate);
      return (
        <Badge
          variant="outline"
          className={cn(
            "text-xs font-normal",
            !item.isVerified ? "bg-red-500 text-white" : "bg-green-500"
          )}
        >
          {item.isVerified ? "Approved" : "Pending"}
        </Badge>
      );
    },
  },
  // {
  //   label: "Status",
  //   key: "status",
  //   render: (item) => {
  //     const isClosed = new Date() > new Date(item.dueDate);
  //     return (
  //       <Badge
  //         variant="outline"
  //         className={cn(
  //           "text-xs font-normal",
  //           isClosed ? "bg-red-500 text-white" : "bg-green-500"
  //         )}
  //       >
  //         {isClosed ? "Closed" : "Open"}
  //       </Badge>
  //     );
  //   },
  // },
];

export default columns;

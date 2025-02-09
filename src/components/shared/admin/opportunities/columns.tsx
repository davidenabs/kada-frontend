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
  // {
  //   label: "Description",
  //   key: "shortDescription",
  //   render: (item) => (
  //     <div className="">
  //       {item.shortDescription.length > 100 ? item.shortDescription.substring(0, 100) + "..." : item.shortDescription}
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
];

export default columns;

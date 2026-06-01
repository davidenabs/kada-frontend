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
          className="w-10 h-10 object-cover rounded-md"
        />
      </div>
    ),
  },
  {
    label: "Date Publish",
    key: "date",
    render: (item) => (
      <div className="text-sm whitespace-nowrap">
        {item.createdAt ? format(new Date(item.createdAt), "dd/MM/yy") : "N/A"}
      </div>
    ),
  },
  {
    label: "Title",
    key: "title",
    render: (item) => (
      <div className="text-sm max-w-[200px] truncate" title={item.title}>
        {item.title}
      </div>
    ),
  },
  {
    label: "Post type",
    key: "type",
    render: (item) => (
      <div className="text-sm whitespace-nowrap">
        {item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1).toLowerCase() : ""}
      </div>
    ),
  },
  {
    label: "Availability",
    key: "availability",
    render: (item) => <div className="text-sm">{item.userType || "ALL"}</div>,
  },
  {
    label: "Limit",
    key: "applicationLimit",
    render: (item) => (
      <div className="text-sm">
        {item.applicationLimit == null || item.applicationLimit == 0 ? "Unlimited" : item.applicationLimit}
      </div>
    ),
  },
  {
    label: "Applicants",
    key: "applicants",
    render: (item) => (
      <div className="text-sm font-semibold text-green-600">
        {item.applicationsCount ?? item.applications?.length ?? 0}
      </div>
    ),
  },
  {
    label: "Region",
    key: "zone",
    render: (item) => {
      const regionParts = [
        item.zone ? `Zone: ${item.zone}` : null,
        item.lga ? `LGA: ${item.lga}` : null,
        item.ward ? `Ward: ${item.ward}` : null,
      ].filter(Boolean);

      return (
        <div className="text-xs text-gray-500 max-w-[150px] leading-tight">
          {regionParts.length > 0 ? regionParts.join(", ") : "All Regions"}
        </div>
      );
    },
  },
];

export default columns;

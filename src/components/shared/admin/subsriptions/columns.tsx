import { Column } from "@/components/common/table";
import { format } from "date-fns";

const columns: Column<Partial<any>>[] = [
  {
    label: "Name",
    key: "id",
    render: (item) => (
      <div className="flex gap-2 items-center">
        <div>
          <p className="text-sm text-gray-500">{item.name}</p>
        </div>
      </div>
    ),
  },
  {
    label: "Price",
    key: "price",
    render: (item) => (
      <div className="">
        <p className="text-sm text-gray-500">
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(item.price)}
        </p>
      </div>
    ),
  },
  {
    label: "Duration",
    key: "durationInYears",
    render: (item) => (
      <div className="">
        <p className="text-sm text-gray-500">{item.durationInYears} yr(s)</p>
      </div>
    ),
  },
  {
    label: "User Type",
    key: "userType",
    render: (item) => (
      <div className="">
        <p className="text-sm text-gray-500">{item.userType}</p>
      </div>
    ),
  },
  {
    label: "Created At",
    key: "createdAt",
    render: (item) => (
      <div className="">
        <p className="text-sm text-gray-500">
          {format(new Date(item.createdAt), "dd/MM/yyyy")}
        </p>
      </div>
    ),
  },
];

export default columns;

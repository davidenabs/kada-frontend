import { Column } from "@/components/common/table";
import { IRequest } from "@/interface/request";
import { format } from "date-fns";
import Image from "next/image";
import { Badge, cn } from "rizzui";

const columns: Column<Partial<IRequest>>[] = [
  {
    label: "Name",
    key: "vendor",
    render: (item) => (
      <div className="flex gap-2 items-center">
        <div className="relative w-[40px] h-[40px]">
          <Image
            src={item?.vendor?.imagePath || "/images/avatar.png"}
            alt="avatar"
            fill
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        <div>
          <p className="font-medium text-sm">
            {item?.vendor?.vendorProfile?.vendorName}
          </p>
          <p className="text-xs text-gray-500">
            {format(item?.createdAt || new Date(), "dd MMM, yyyy")}
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "Phone Number",
    key: "vendor",
    render: (item) => item.vendor?.phoneNumber,
  },
  {
    label: "Email",
    key: "vendor",
    render: (item) => item.vendor?.email,
  },
  {
    label: "Date Requested",
    key: "createdAt",
    render: (item) => (
      <div className="">{format(item.createdAt || new Date(), "dd/mm/yy")}</div>
    ),
  },
  {
    label: "Status",
    key: "status",
    render: (item) => {
      return (
        <Badge
          variant="outline"
          className={cn(
            "text-xs font-normal capitalize",
            item.status === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-green-500"
          )}
        >
          {item.status}
        </Badge>
      );
    },
  },
];

export default columns;

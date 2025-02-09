import { Column } from "@/components/common/table";
import { IRequest } from "@/interface/request";
import { IUser, UserType } from "@/interface/user";
import { format } from "date-fns";
import Image from "next/image";
import { Badge, cn } from "rizzui";

export const Columns: Column<Partial<any>>[] = [
  {
    label: "Name",
    key: "vendor",
    render: (item) => <div className="">{item.vendor.vendorName}</div>,
  },
  {
    label: "Remark",
    key: "remark",
    render: (item) => item.remark || "- -",
  },
  // {
  //   label: "Phone",
  //   key: "phoneNumber",
  //   render: (item) => item.phoneNumber || "- -",
  // },
  // {
  //   label: "Type",
  //   key: "userType",
  //   render: (item) => item.userType,
  // },
];

export const Vendorcolumns: Column<Partial<IUser>>[] = [
  {
    label: "Name",
    key: "firstName",
    render: (item) => (
      <div className="flex gap-2 items-center">
        <div className="relative w-[40px] h-[40px]">
          <Image
            src={item.imagePath || "/images/avatar.png"}
            alt="avatar"
            fill
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        <div>
          <p className="font-medium text-sm">
            {item?.vendorProfile?.vendorName}
          </p>
          <p className="text-xs text-gray-500">
            {format(item?.createdAt || new Date(), "dd MMM, yyyy")}
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "Email",
    key: "email",
    render: (item) => item.email || "- -",
  },
  {
    label: "Phone",
    key: "phoneNumber",
    render: (item) => item.phoneNumber || "- -",
  },
];

export const requestColumns: Column<Partial<IRequest>>[] = [
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

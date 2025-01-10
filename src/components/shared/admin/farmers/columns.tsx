import { Column } from "@/components/common/table";
import { IUser, UserType } from "@/interface/user";
import { format } from "date-fns";
import Image from "next/image";

const columns: Column<Partial<IUser>>[] = [
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
            {item.userType === UserType.FARMER
              ? (item?.firstName + " " + item?.lastName) || "- -"
              : item.userType === UserType.COOPERATIVE
                ? item?.cooperativeProfile?.cooperativeName || "- -"
                : item?.vendorProfile?.vendorName || "- -"}
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
  {
    label: "Type",
    key: "userType",
    render: (item) => item.userType,
  },
];

export default columns;

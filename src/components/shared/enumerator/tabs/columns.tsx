import { Column } from "@/components/common/table";
import { ICrop } from "@/interface/crop";
import { IFarm } from "@/interface/farm";
import { IUser } from "@/interface/user";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "rizzui";

export const farmersColumns: Column<Partial<IUser>>[] = [
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
            {item?.cooperativeProfile?.cooperativeName}
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
  {
    label: "Status",
    key: "verified",
    render: (item) => {
      return item.verified ? <Badge color="success">Status</Badge> :
        <Badge color="danger">Pending</Badge>;
    },
  },
  {
    label: "Subscribed",
    key: "isSubscribed",
    render: (item) => {
      return item.isSubscribed ? <Badge color="success">Subscribed</Badge> :
        <Badge color="danger">Not Subscribed</Badge>;
    },
  }
];


export const farmColumns: Column<Partial<IFarm>>[] = [
  {
    label: "Farm Name",
    key: "name",
    render: (item) => (
      <div className="flex gap-2 items-center">
        {/* <div className="relative w-[40px] h-[40px]">
          <Image
            src={item.imagePath || "/images/default-farm.png"}
            alt="farm image"
            fill
            objectFit="cover"
            className="rounded-full"
          />
        </div> */}

        <div>
          <p className="font-medium text-sm">{item.name}</p>
          <p className="text-xs text-gray-500">
            {format(item?.createdAt || new Date(), "dd MMM, yyyy")}
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "LGA",
    key: "lga",
    render: (item) => item.lga || "N/A",
  },
  {
    label: "Land Area",
    key: "landArea",
    render: (item) => `${item.landArea || "0"} acres`,
  },
  {
    label: "Crops",
    key: "crops",
    render: (item: any) => {
      const cropNames = item?.crops.map((crop: ICrop) => crop.name).join(", ");
      return cropNames || "N/A";
    },

  },
  // {
  //   label: "Location",
  //   key: "geoLocation",
  //   render: (item) => {
  //     const [showFull, setShowFull] = useState(false);

  //     const handleToggle = () => {
  //       setShowFull(!showFull);
  //     };

  //     const getBriefLocation = (geoLocation: any) => {
  //       // Return a short preview, e.g., the first coordinate pair
  //       return geoLocation.length > 0
  //         ? `[[${geoLocation[0][0]}, ${geoLocation[0][1]}], ...]`
  //         : "N/A";
  //     };

  //     const isGeoLocationValid = Array.isArray(JSON.parse(`${item.geoLocation}`));

  //     return (
  //       <div className="flex flex-col gap-1">
  //         {isGeoLocationValid ? (
  //           <>
  //             <span className="text-sm text-blue-600 cursor-pointer" onClick={handleToggle}>
  //               {showFull
  //                 ? JSON.stringify(item.geoLocation) // Show full content
  //                 : getBriefLocation(item.geoLocation)} {/* Show brief preview */}
  //             </span>
  //             {showFull && (
  //               <button
  //                 className="text-xs text-gray-500 underline mt-1"
  //                 onClick={handleToggle}
  //               >
  //                 Show Less
  //               </button>
  //             )}
  //           </>
  //         ) : (
  //           "N/A"
  //         )}
  //       </div>
  //     );
  //   },
  // },
  {
    label: "Status",
    key: "isVerified",
    render: (item) => {
      return item.isVerified ? <Badge color="success">Verified</Badge> :
        <Badge color="danger">Pending</Badge>;
    },
  },
];


import { getFarmById } from "@/app/api/farm";
import FarmSharedPage from "@/components/shared/farmer/farm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Farm Details",
};

interface PageProps {
  params: {
    farmId: string;
  };
}

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   try {
//     const farm = await getFarmById(params.farmId);
//     return {
//       title: `${farm.name} - Farm Detailssdsd`,
//       description: farm.description,
//       openGraph: {
//         title: `${farm.name} - Farm Details`,
//         description: farm.description,
//         images: [
//           {
//             url: farm.imageUrl,
//             width: 1200,
//             height: 630,
//             alt: farm.name,
//           },
//         ],
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: `${farm.name} - Farm Details`,
//         description: farm.description,
//         images: [farm.imageUrl],
//       },
//     };
//   } catch (error) {
//     console.log(error, "error");
//     return {
//       title: "Farm Details",
//       description: "View detailed information about this farm",
//     };
//   }
// }

export default function FarmsPage() {
  return <FarmSharedPage />;
}

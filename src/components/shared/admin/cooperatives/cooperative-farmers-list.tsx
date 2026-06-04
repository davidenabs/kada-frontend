import React, { useState } from "react";
import { useGetUsersQuery } from "@/app/_api/user";
import { Loader, Text } from "rizzui";
import { Pagination } from "@/components/common/table/pagination";
import { UserType } from "@/interface/user";
import Image from "next/image";

export default function CooperativeFarmersList({ cooperativeId }: { cooperativeId: string | number }) {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetUsersQuery({
    enabled: !!cooperativeId,
    params: {
      userType: UserType.FARMER,
      cooperativeId,
      page,
      limit,
    },
  });

  const farmers = data?.data?.users || [];
  const total = data?.data?.total || 0;

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <Text className="text-sm text-red-500">Failed to load farmers.</Text>;
  }

  if (farmers.length === 0) {
    return <Text className="text-sm text-gray-500">No farmers registered.</Text>;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {farmers.map((farmer: any) => (
          <div key={farmer.id} className="border p-4 rounded-xl flex flex-col gap-3 text-sm bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image
                    src={farmer.imagePath || "/images/avatar.png"}
                    alt="avatar"
                    fill
                    objectFit="cover"
                    className="rounded-full border"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {farmer.firstName} {farmer.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{farmer.phoneNumber || "No phone"}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-600 uppercase tracking-wider">
                  {farmer.publicId || "NO ID"}
                </span>
              </div>
            </div>

            {/* Additional Info Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex flex-col">
                <span className="font-medium text-gray-400 text-[10px] uppercase tracking-wider">LGA</span>
                <span className="font-medium text-gray-800 mt-0.5">{farmer.lga || "-"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-400 text-[10px] uppercase tracking-wider">Ward</span>
                <span className="font-medium text-gray-800 mt-0.5">{farmer.ward || "-"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-400 text-[10px] uppercase tracking-wider">Community</span>
                <span className="font-medium text-gray-800 mt-0.5">{farmer.community || farmer.farmerProfile?.homeAddress || "-"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-400 text-[10px] uppercase tracking-wider">NIN</span>
                <span className="font-medium text-gray-800 mt-0.5">{farmer.farmerProfile?.nationalIdentificationNumber || "-"}</span>
              </div>
              <div className="col-span-2 flex flex-col">
                <span className="font-medium text-gray-400 text-[10px] uppercase tracking-wider">Farm Crops</span>
                <span className="font-medium text-gray-800 mt-0.5 text-gray-500 italic">
                  {farmer.farmerProfile?.farms?.length ? 
                    farmer.farmerProfile.farms.map((f: any) => f.crops?.map((c: any) => c.name).join(", ")).join("; ") 
                    : "Data not available in this view"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {total > limit && (
        <div className="flex justify-end pt-2">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(total / limit)}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      )}
    </div>
  );
}

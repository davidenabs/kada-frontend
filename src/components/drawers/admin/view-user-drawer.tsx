import React from "react";
import { Drawer, Button, ActionIcon, Title, Text, Badge, Loader } from "rizzui";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useGetUserQuery } from "@/app/_api/user";
import { useGetFarmsQuerry } from "@/app/_api/farm";
import { useGetUserApplicationsQuery } from "@/app/_api/cms";
import { UserType } from "@/interface/user";

export default function ViewUserDrawer({
  open,
  close,
  userId,
}: {
  open: boolean;
  close: () => void;
  userId: number | null;
}) {
  const { data: userData, isLoading: isLoadingUser } = useGetUserQuery({
    id: userId?.toString(),
    enabled: !!userId && open,
  });

  const user = userData?.data;

  // Only fetch farms and apps if user is a farmer
  const isFarmer = user?.userType === UserType.FARMER;

  const { data: farmsData, isLoading: isLoadingFarms } = useGetFarmsQuerry({
    enabled: !!userId && isFarmer && open,
    params: { farmerId: userId },
  });

  const { data: appsData, isLoading: isLoadingApps } = useGetUserApplicationsQuery(
    userId,
    !!userId && isFarmer && open
  );

  const farms = farmsData?.data?.farms || [];
  const applications = Array.isArray(appsData?.data) 
    ? appsData?.data 
    : (appsData?.data?.data || []);

  return (
    <Drawer
      isOpen={open}
      onClose={close}
      placement="right"
      className="max-w-md w-full"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b bg-white">
        <Title as="h5">User Details</Title>
        <ActionIcon variant="text" onClick={close}>
          <XMarkIcon className="w-5 h-5" />
        </ActionIcon>
      </div>

      <div className="p-5 overflow-y-auto h-[calc(100vh-65px)] bg-white">
        {isLoadingUser ? (
          <div className="flex justify-center p-10"><Loader size="lg" /></div>
        ) : !user ? (
          <Text className="text-center text-gray-500">User not found</Text>
        ) : (
          <div className="space-y-6">
            {/* Profile Section */}
            <section className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <Title as="h6">Profile Information</Title>
                <Badge color="success">{user.userType}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">First Name</p>
                  <p className="font-medium">{user.firstName || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Last Name</p>
                  <p className="font-medium">{user.lastName || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Public ID</p>
                  <p className="font-medium">{user.publicId || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium">{user.phoneNumber || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{user.email || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium">{user.lga || "-"}, {user.ward || "-"}</p>
                </div>
              </div>
            </section>

            {/* Farm Details (Farmers Only) */}
            {isFarmer && (
              <section>
                <Title as="h6" className="mb-3">Registered Farms ({farms.length})</Title>
                {isLoadingFarms ? (
                  <Loader />
                ) : farms.length === 0 ? (
                  <Text className="text-sm text-gray-500">No farms registered.</Text>
                ) : (
                  <div className="space-y-3">
                    {farms.map((farm: any) => (
                      <div key={farm.id} className="border p-3 rounded-lg text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">{farm.name || "Unnamed Farm"}</span>
                          <span>{farm.landArea} ha</span>
                        </div>
                        <div className="text-gray-500 mt-1">
                          Crops: {farm.crops?.map((c: any) => c.name).join(", ") || "None"}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Applications (Farmers Only) */}
            {isFarmer && (
              <section>
                <Title as="h6" className="mb-3">Program Applications ({applications.length})</Title>
                {isLoadingApps ? (
                  <Loader />
                ) : applications.length === 0 ? (
                  <Text className="text-sm text-gray-500">No applications found.</Text>
                ) : (
                  <div className="space-y-3">
                    {applications.map((app: any) => (
                      <div key={app.id} className="border p-3 rounded-lg text-sm flex justify-between items-center">
                        <span className="font-medium">{app.post?.title || "Unknown Program"}</span>
                        <Badge variant="flat" color="info">{new Date(app.createdAt).toLocaleDateString()}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        )}
      </div>
    </Drawer>
  );
}

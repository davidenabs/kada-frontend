"use client";
import React, { Suspense } from "react";
import Header from "@/components/dashboards/farmer/header";
import Sidebar from "@/components/dashboards/sidebar";
import AppLoader, { FullPageLoader } from "@/components/shared/loader";
import BottomNavigation from "@/components/dashboards/cooperative/bottom-nav";
import NextProgress from "@/components/common/next-progress";
import useCheckUserFields from "@/hooks/user-field";
import { useGetProfileQuery } from "@/app/_api/user";
import { useAtom, useSetAtom } from "jotai";
import { userAtom } from "@/stores/user";
import { useModal } from "@/hooks/use-modal";
import EditCooperaativeProfile from "@/components/modals/edit-profile/cooperative";

export default function CooperativeDahboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user has verified their account
  useCheckUserFields([
    {
      field: "verified",
      redirectTo: "/account-setup/verify-account",
      condition: (value) => value === false,
    },
  ]);
  const [loaded, setLoaded] = React.useState(false);
  const [user, setUser] = useAtom(userAtom);
  const { closeModal, openModal } = useModal();

  const { isFetching, isRefetching, data } = useGetProfileQuery({
    enabled: loaded,
  });

  React.useEffect(() => {
    if (data?.data && data.success && !isFetching && !isRefetching) {
      setUser((prevUser) => ({ ...prevUser, user: data.data }));
    }
  }, [data, isFetching, isRefetching, setUser]);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  // * open modal to edit profile if user has not set up their profile
  React.useEffect(() => {
    if (loaded && user.user?.cooperativeProfile?.name == null) {
      openModal({
        view: <EditCooperaativeProfile close={() => {}} />,
        customSize: "50%",
      });
    }

    if (loaded && user.user?.cooperativeProfile?.name) {
      closeModal();
    }
  }, [loaded, user.user?.cooperativeProfile?.name]);

  if (!loaded || isFetching || isRefetching) {
    return <FullPageLoader />;
  }

  return (
    <>
      <Suspense
        fallback={
          <div className="my-auto">
            <AppLoader />
          </div>
        }
      >
        <NextProgress />
        <div className="flex flex-col">
          <div className="flex overflow-hidden w-full bg-white">
            <Sidebar />
            <div className="w-full lg:ml-[254px] max-md:ml-0 ">
              <Header />
              <div className="z-10 mt-0 w-full pt-8 max-md:max-w-full max-md:px-5">
                <div className="flex flex-col w-full">
                  <div className="dashboard_container my-auto w-full max-md:mt-1 max-md:max-w-full">
                    {children}
                    <BottomNavigation />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

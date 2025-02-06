"use client";
import React, { Suspense } from "react";
import Header from "@/components/dashboards/farmer/header";
import Sidebar from "@/components/dashboards/sidebar";
import AppLoader, { FullPageLoader } from "@/components/shared/loader";
import NextProgress from "@/components/common/next-progress";
import useCheckUserFields from "@/hooks/user-field";
import { useGetProfileQuery } from "@/app/_api/user";
import { useAtom, useSetAtom } from "jotai";
import { userAtom } from "@/stores/user";
import { useModal } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";
import { UserType } from "@/interface/user";
import Unauthorized from "@/components/common/unauthorized";

export default function EnumeratorDashboardLayout({
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
    // {
    //     field: "vendorProfile.isVerified",
    //     redirectTo: "/account-setup/profile/vendor",
    //     condition: (value) => value === false,
    // },
  ]);

  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const { closeModal, openModal } = useModal();
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false); // *is DOM loading

  const { isFetching, isRefetching, data } = useGetProfileQuery({
    enabled: loaded,
  });

  React.useEffect(() => {
    if (data?.data && data.success && !isFetching && !isRefetching) {
      setUser((prevUser) => ({ ...prevUser, user: data.data }));
    }
  }, [data, isFetching, isRefetching, setUser]);

  React.useEffect(() => {
    const checkAuth = () => {
      if (!isLoading) return;

      // *if user is not authenticated or token is not set, redirect to sign-in page
      if (!user || !user.authenticated || !user.token) {
        setLoaded(false);
        router.push("/sign-in");
        return;
      }

      const userType = user.user?.userType;
      // *if user type is not allowed, show to unauthorized page
      if (userType !== UserType.ENUMERATOR) {
        React.startTransition(() => {
          setIsAuthorized(false);
          setLoaded(true);
        });
        return;
      }

      // *if user type is allowed, show the component
      React.startTransition(() => {
        setIsAuthorized(true);
        setLoaded(true);
      });
    };

    checkAuth();
  }, [router, user, isLoading]);

  React.useEffect(() => {
    setIsLoading(true);
  }, []);

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
        <div className="flex flex-col transition-all duration-300 ease-in-out">
          <div className="flex overflow-hidden w-full bg-white">
            <Sidebar />
            <div className="w-full lg:ml-[254px] max-md:ml-0 transition-all duration-300 ease-in-out">
              <Header />
              <div className="z-10 mt-0 w-full pt-8 max-md:max-w-full max-md:px-5">
                <div className="flex flex-col w-full">
                  <div className="dashboard_container my-auto w-full max-md:mt-1 max-md:max-w-full">
                    {!isAuthorized ? <Unauthorized /> : children}
                    {/* <BottomNavigation /> */}
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

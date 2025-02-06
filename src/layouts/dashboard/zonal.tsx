"use client";
import NextProgress from "@/components/common/next-progress";
import Unauthorized from "@/components/common/unauthorized";
import BottomNavigation from "@/components/dashboards/cooperative/bottom-nav";
import Header from "@/components/dashboards/header";
import Sidebar from "@/components/dashboards/sidebar";
import AppLoader, { FullPageLoader } from "@/components/shared/loader";
import { UserType } from "@/interface/user";
import { userAtom } from "@/stores/user";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import React, { startTransition, Suspense, useEffect, useState } from "react";

export default function ZonalDahboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAtomValue(userAtom);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // *is DOM loading

  useEffect(() => {
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
      if (userType !== UserType.ZONAL) {
        startTransition(() => {
          setIsAuthorized(false);
          setLoaded(true);
        });
        return;
      }

      // *if user type is allowed, show the component
      startTransition(() => {
        setIsAuthorized(true);
        setLoaded(true);
      });
    };

    checkAuth();
  }, [router, user, isLoading]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!loaded) {
    return <FullPageLoader />;
  }

  return (
    <>
      <Suspense
        fallback={
          <div className="my-auto">
            <FullPageLoader />
          </div>
        }
      >
        <NextProgress />
        <div className="flex flex-col transition-all duration-300 ease-in-out">
          <div className="flex w-full bg-[#F9F9F9]">
            <Sidebar />
            <div className="w-full ml-[254px] max-lg:ml-0 min-h-screen overflow-auto transition-all duration-300 ease-in-out">
              <Header />
              <div className="w-full py-8 px-10 max-md:max-w-full max-md:px-5">
                <div className="flex flex-col w-full">
                  <div className="flex flex-col self-stretch my-auto w-full max-md:mt-1 max-md:max-w-full">
                    {!isAuthorized ? <Unauthorized /> : children}
                    <div className="max-md:py-10"></div>
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

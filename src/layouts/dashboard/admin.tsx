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

export default function AdminDahboardLayout({
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
      if (!user || !isLoading) return;

      // *if user is not authenticated or token is not set, redirect to sign-in page
      if (!user.authenticated || !user.token) {
        setLoaded(false);
        router.push("/admin/auth");
        return;
      }

      const userType = user.user?.userType;
      // *if user type is not allowed, show to unauthorized page
      if (userType !== UserType.SUPERADMIN) {
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

  if (!isAuthorized) {
    return <Unauthorized />;
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
          <div className="flex overflow-hidden w-full bg-[#F9F9F9]">
            <Sidebar />
            <div className="w-full ml-[254px] max-md:ml-0 min-h-screen overflow-auto">
              <Header />
              <div className="w-full py-8 px-10 max-md:max-w-full max-md:px-5">
                <div className="flex flex-col w-full">
                  <div className="flex flex-col self-stretch my-auto w-full max-md:mt-1 max-md:max-w-full">
                    {children}
                    <div className="max-md:py-10"></div>
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

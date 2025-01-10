"use client";
import { useGetProfileQuery } from "@/app/_api/user";
import NextProgress from "@/components/common/next-progress";
import Unauthorized from "@/components/common/unauthorized";
import Header from "@/components/dashboards/farmer/header";
import Navigation from "@/components/dashboards/farmer/nav";
import { FullPageLoader } from "@/components/shared/loader";
import useCheckUserFields from "@/hooks/user-field";
import { UserType } from "@/interface/user";
import { userAtom } from "@/stores/user";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import React, { startTransition, Suspense } from "react";

export default function FarmerDahboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  // const user = useAtomValue(userAtom);
  const [user, setUser] = useAtom(userAtom);
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false); // *is DOM loading

  // *check if user is verified and NIN is verified
  useCheckUserFields([
    {
      field: "verified",
      redirectTo: "/account-setup/verify-account",
      condition: (value) => value === false,
    },
    {
      field: "farmerProfile.isNinVerified",
      redirectTo: "/account-setup/profile/nimc",
      condition: (value) => value === false,
    },
  ]);

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
      if (userType !== UserType.FARMER) {
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

  React.useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!loaded) {
    return <FullPageLoader />;
  }

  return (
    <Suspense
      fallback={
        <div className="my-auto">
          <FullPageLoader />
        </div>
      }
    >
      <NextProgress />
      <div className="min-h-screen bg-[#F9F9F9]">
        <Header />
        <main className="mb-6 w-full max-md:px-5 max-md:max-w-full">
          <Navigation />
          <div className="mt-4 w-full px-8">
            <div className="gap-5">
              {!isAuthorized ? <Unauthorized /> : children}
            </div>
          </div>
        </main>
      </div>
    </Suspense>
  );
}

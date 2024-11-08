"use client";
import NextProgress from "@/components/common/next-progress";
import Header from "@/components/dashboards/farmer/header";
import Navigation from "@/components/dashboards/farmer/nav";
import AppLoader, { FullPageLoader } from "@/components/shared/loader";
import useCheckUserFields from "@/hooks/user-field";
import React, { Suspense } from "react";

export default function FarmerDahboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <FullPageLoader />;
  }

  return (
    <Suspense
      fallback={
        <div className="my-auto">
          <AppLoader />
        </div>
      }
    >
      <NextProgress />
      <div className="min-h-screen bg-[#F9F9F9]">
        <Header />
        <main className="mb-6 w-full max-md:px-5 max-md:max-w-full">
          <Navigation />

          <div className="mt-4 w-full px-8">
            <div className="gap-5">{children}</div>
          </div>
        </main>
      </div>
    </Suspense>
  );
}

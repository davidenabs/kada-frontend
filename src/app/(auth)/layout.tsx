import AppLoader from "@/components/shared/loader";
import React, { Suspense } from "react";

export default function MainAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className=""><AppLoader /></div>}>
      {children}
    </Suspense>
  );
}

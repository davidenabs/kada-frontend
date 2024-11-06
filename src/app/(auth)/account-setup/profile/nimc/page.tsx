import NimcVerification from "@/components/account-setup/nimc/nimc-verification";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Nimc Verification",
};

const NimcPage: React.FC = () => {
  return (
    <div className="app_container">
      <NimcVerification />
    </div>
  );
};

export default NimcPage;

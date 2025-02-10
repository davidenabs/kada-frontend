"use client";
// import Overview from "@/components/dashboards/cooperative/overview";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import React from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/stores/user";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import EditPartnerProfile from "@/components/modals/edit-profile/partner";
import { KadaButton } from "@/components/form/button";
import PartnerOverview from "@/components/dashboards/partner/overview";

function PartnerDashboardPage() {
  useDashboardTitle("Dashboard");
  const user = useAtomValue(userAtom);
  const router = useRouter();
  const { closeModal, openModal } = useModal();

  const handleEditClick = () => {
    openModal({
      view: <EditPartnerProfile close={closeModal} />,
      customSize: "50%",
    });
  };
  // Overview
  const name = React.useMemo(() => {
    return user.user?.partnerProfile?.businessName == null ? (
      <button onClick={handleEditClick}> Set up your profile </button>
    ) : (
      user.user?.partnerProfile?.businessName
    );
  }, [user.user?.partnerProfile?.businessName]);

  return (
    <>
      <div className="flex justify-between gap-2 items-center selfend text-sm leading-tight">
        <div className="rounded-full px-4 py-1 bg-[#F0EFEC]">
          👍🏾 Welcome Back, {name}
        </div>
        <div className="flex"><KadaButton onClick={handleEditClick} className="rounded-full"> Profile </KadaButton></div>
      </div>

      <PartnerOverview />
    </>
  );
}

export default PartnerDashboardPage;

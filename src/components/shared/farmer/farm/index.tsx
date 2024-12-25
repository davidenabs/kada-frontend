"use client";
import React from "react";
import FarmInfo from "@/components/dashboards/farmer/farm-info";
import { useParams } from "next/navigation";
import { useGetFarmQuery } from "@/app/_api/farm";
import { withAuth } from "@/components/common/auth";
import { UserType } from "@/interface/user";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { KadaButton } from "@/components/form/button";
import { useModal } from "@/hooks/use-modal";
import NotificationsModal from "@/components/modals/farmer/notifications";
import CreateFarmModal from "@/components/modals/create-farm";

interface NavigationItemProps {
  text: string;
  active: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ text, active }) => {
  return (
    <div
      className={`flex gap- items-start whitespace-nowrap ${
        active ? "font-semibold" : ""
      }`}
    >
      <div>{text}</div>
      {!active && (
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b089a829b16881d1044a1ebf60c9e247c9802df648e211e831798d4d8d0a4cf5?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3"
          className="object-contain shrink-0 w-4 aspect-square"
          alt=""
        />
      )}
    </div>
  );
};

function FarmSharedPage() {
  useDashboardTitle("Farm");
  const { farmId } = useParams();
  const { data, isFetching } = useGetFarmQuery({
    enabled: true,
    id: farmId as string,
  });
  const { closeModal, openModal } = useModal();

  const navigationItems = [
    { text: "Dashboard", active: false },
    { text: "Farms", active: false },
    { text: "FGSC Farms", active: true },
  ];

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const handleEditFarmModal = () => {
    openModal({
      customSize: "654px",
      view: <CreateFarmModal close={closeModal} farm={data?.data} />,
    });
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <nav className="flex gap-3 justifybetween max-w-full text-xs font-light text-neutral-700 w[262px]">
          {navigationItems.map((item, index) => (
            <NavigationItem key={index} text={item.text} active={item.active} />
          ))}
        </nav>

        <div className="">
          <KadaButton
            className="!rounded-full h-[30px] !bg-slate-400"
            onClick={handleEditFarmModal}
          >
            
            Modify Farm
          </KadaButton>
        </div>
      </div>
      <FarmInfo {...data?.data} farmId={farmId} />
    </div>
  );
}

export default FarmSharedPage;

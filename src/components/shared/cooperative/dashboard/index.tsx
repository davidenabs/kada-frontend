"use client";
import Overview from "@/components/dashboards/cooperative/overview";
import QuickActions from "@/components/dashboards/cooperative/quick-action";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import React from "react";
import Button from "@/components/form/button";
import Select from "@/components/form/select";

function CooperativeDashboardPage() {
  useDashboardTitle("Dashboard");
  return (
    <>
      <div className="flex justify-between gap-2 items-center self-end text-sm leading-tight">
        <div className="rounded-full px-4 py-1 bg-[#F0EFEC]">
          👍🏾 Welcome Back, Agrogrid Cooperative
        </div>

        <div className="flex">
          <Button className="!w-fit !py-2.5 text-white !bg-green-600 !rounded-full !shadow-none ">
            Add Member
          </Button>
          <Select
            className="!py-2.5 !px-3 !border border-tertiary-700"
            options={[]}
            value={"Import"}
            setValue={() => {}}
          />
        </div>
      </div>

      <Overview />
      {/* <QuickActions /> */}
    </>
  );
}

export default CooperativeDashboardPage;

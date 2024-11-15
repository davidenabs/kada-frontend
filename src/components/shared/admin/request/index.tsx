"use client";
import Input from "@/components/form/input";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { SearchIcon } from "@/icons";
import React from "react";
import RequestTable from "./table";

function AdminRequestSharedPage() {
  useDashboardTitle("Requests");
  return (
    <>
      <section className="space-y-3 border rounded-2xl p-4 bg-white">
        <h4 className="text-sm font-bold text-zinc-700">License Requests</h4>

        <div className="">
          <Input
            placeholder="Search here..."
            inputClassName="!rounded-[10px] !h-[36px]"
            className="!w-[500px]"
            prefix={<SearchIcon className="fill-black" />}
          />
        </div>

        <div className="border-x">
          <RequestTable />
        </div>
      </section>
    </>
  );
}

export default AdminRequestSharedPage;

"use client";
import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import AddUserModal from "@/components/modals/admin/user";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import useDebounce from "@/hooks/use-debounce";
import { SearchIcon } from "@/icons";
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";

function AdminUsersSharedPage() {
  useDashboardTitle("Users");
  const [loaded, setLoaded] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState<"approved" | "rejected">(
    "approved"
  );
  const [search, setSearch] = React.useState("");
  const debouncedSearchQuery = useDebounce(search);
  const [activeTab, setActiveTab] = React.useState("Vendors");

  return (
    <>
      {open && <AddUserModal open={open} close={() => setOpen(false)} />}
      <section className="space-y-3 border rounded-2xl p-4 bg-white">
        <h4 className="text-sm font-bold text-zinc-700">Users</h4>

        <div className="flex items-center justify-between">
          <Input
            placeholder="Search here..."
            inputClassName="rounded-[10px] h-[36px]"
            className="w-full lg:w-[500px]"
            prefix={<SearchIcon className="fill-black" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            clearable
            onClear={() => setSearch("")}
          />

          <div className="">
            <KadaButton
              className="rounded-full"
              leftIcon={<PlusIcon className="w-4 h-4 fill-white mr-1" />}
              onClick={() => setOpen(true)}
            >
              Add Market
            </KadaButton>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminUsersSharedPage;

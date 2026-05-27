import { useGetCmsPostsQuery, useAssignUsersMutation } from "@/app/_api/cms";
import { useGetUsersQuery } from "@/app/_api/user";
import { KadaButton } from "@/components/form/button";
import { CloseIcon, SearchIcon } from "@/icons";
import React, { Fragment, useState, useMemo } from "react";
import { cn, Drawer, Input, Select, Checkbox } from "rizzui";
import { lgaOptions, wardOptionsByLga } from "@/lib/lga-data";
import { toast } from "sonner";

type AssignUsersDrawerProps = {
  close: () => void;
  open: boolean;
};

const userTypeOptions = [
  { value: "FARMER", label: "Farmer" },
  { value: "COOPERATIVE", label: "Cooperative" },
  { value: "VENDOR", label: "Vendor" },
  { value: "ENUMERATOR", label: "Enumerator" },
  { value: "ZONAL", label: "Zonal Officer" },
  { value: "PARTNER", label: "Partner" }
];

function AssignUsersDrawer({ close, open }: AssignUsersDrawerProps) {
  // Filters and state management
  const [search, setSearch] = useState("");
  const [selectedLga, setSelectedLga] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);
  const [selectedUserType, setSelectedUserType] = useState<any>(null);
  const [page, setPage] = useState(1);
  const limit = 15;

  const [selectedUsers, setSelectedUsers] = useState<Record<number, boolean>>({});
  const [selectedPrograms, setSelectedPrograms] = useState<Record<string, boolean>>({});

  // API hooks
  const { data: usersResponse, isLoading: isLoadingUsers } = useGetUsersQuery({
    enabled: open,
    params: {
      search,
      lga: selectedLga?.value || undefined,
      ward: selectedWard?.value || undefined,
      userType: selectedUserType?.value || undefined,
      page,
      limit
    }
  });

  const { data: programsResponse, isLoading: isLoadingPrograms } = useGetCmsPostsQuery({
    enabled: open,
    params: {
      filter: "active",
      limit: 100
    }
  });

  const { mutateAsync: assignUsers, isPending: isAssigning } = useAssignUsersMutation();

  const users = usersResponse?.data?.users || [];
  const totalUsers = usersResponse?.data?.total || 0;
  const totalPages = Math.ceil(totalUsers / limit);

  const programs = useMemo(() => {
    const posts = programsResponse?.data?.posts || [];
    // Only return programs or interventions
    return posts.filter(
      (p: any) => p.type === "program" || p.type === "interventions"
    );
  }, [programsResponse]);

  // LGA Ward options mapping
  const wardOptions = useMemo(() => {
    if (!selectedLga?.value) return [];
    return wardOptionsByLga(selectedLga.value);
  }, [selectedLga]);

  // Checkbox selections toggling
  const toggleUserSelect = (id: number) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleProgramSelect = (id: string) => {
    setSelectedPrograms((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectAllUsers = (isChecked: boolean) => {
    const nextSelected = { ...selectedUsers };
    users.forEach((u: any) => {
      nextSelected[u.id] = isChecked;
    });
    setSelectedUsers(nextSelected);
  };

  const selectedUserIdsArray = useMemo(() => {
    return Object.entries(selectedUsers)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => Number(id));
  }, [selectedUsers]);

  const selectedProgramIdsArray = useMemo(() => {
    return Object.entries(selectedPrograms)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => id);
  }, [selectedPrograms]);

  const isAllUsersOnPageSelected = useMemo(() => {
    if (users.length === 0) return false;
    return users.every((u: any) => selectedUsers[u.id]);
  }, [users, selectedUsers]);

  // Execute Direct Bulk Registration
  const handleAssign = async () => {
    if (selectedUserIdsArray.length === 0) {
      toast.error("Please select at least one user to assign.");
      return;
    }
    if (selectedProgramIdsArray.length === 0) {
      toast.error("Please select at least one program/opportunity.");
      return;
    }

    try {
      const result = await assignUsers({
        userIds: selectedUserIdsArray,
        postIds: selectedProgramIdsArray
      });

      if (result.success || result.status !== "failure") {
        toast.success(`Successfully assigned ${selectedUserIdsArray.length} users to the selected programs!`);
        setSelectedUsers({});
        setSelectedPrograms({});
        close();
      } else {
        toast.error(result.message || "Failed to assign users.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to assign users.");
    }
  };

  return (
    <Drawer
      isOpen={open}
      onClose={close}
      placement={"right"}
      size={"xl"}
      overlayClassName="bg-opacity-40 backdrop-blur-sm"
      containerClassName={cn("bg-gray-50 rounded-l-2xl")}
      className="z-[9999]"
    >
      <section className="h-full bg-gray-50 flex flex-col overflow-hidden">
        {/* Header Title Section */}
        <div className="bg-white flex justify-between items-center px-6 py-5 border-b border-gray-200">
          <div className="space-y-1">
            <h4 className="font-bold text-lg font-inter text-gray-900">
              Bulk Direct Program Assignment
            </h4>
            <p className="text-xs text-gray-500">
              Select one or multiple programs and assign deep-filtered users in a single transaction.
            </p>
          </div>
          <button
            onClick={close}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* STEP 1: SELECT PROGRAMS */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-3">
            <h5 className="font-bold text-sm text-gray-800 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00A551] text-[11px] font-bold text-white">
                1
              </span>
              Select Target Programs / Interventions
            </h5>
            
            {isLoadingPrograms ? (
              <div className="text-xs text-gray-500 animate-pulse">Loading active programs...</div>
            ) : programs.length === 0 ? (
              <div className="text-xs text-gray-500">No active KADA programs or interventions available.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1 max-h-[160px] overflow-y-auto pr-2">
                {programs.map((prog: any) => (
                  <div
                    key={prog.id}
                    onClick={() => toggleProgramSelect(prog.id)}
                    className={cn(
                      "p-3 rounded-lg border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between",
                      selectedPrograms[prog.id]
                        ? "border-[#00A551] bg-[#00A551]/5 text-[#00A551]"
                        : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                    )}
                  >
                    <span className="truncate pr-2">{prog.title}</span>
                    <Checkbox
                      checked={!!selectedPrograms[prog.id]}
                      onChange={() => toggleProgramSelect(prog.id)}
                      color="primary"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* STEP 2: SEARCH AND FILTER DEEP USER RECORDS */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h5 className="font-bold text-sm text-gray-800 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00A551] text-[11px] font-bold text-white">
                2
              </span>
              Deep-Filter and Select Users ({selectedUserIdsArray.length} selected)
            </h5>

            {/* Deep filters mapping */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end bg-gray-50 p-4 rounded-lg border border-gray-150">
              <div className="w-full">
                <label className="text-[10px] font-bold text-gray-600 mb-1 block">
                  Search Name, Email, Phone
                </label>
                <Input
                  placeholder="Search user details..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  prefix={<SearchIcon className="fill-gray-400" />}
                  clearable
                  onClear={() => setSearch("")}
                  inputClassName="!rounded-[8px] !h-[36px] bg-white border-gray-200"
                />
              </div>

              <div className="w-full">
                <label className="text-[10px] font-bold text-gray-600 mb-1 block">
                  Filter User Type
                </label>
                <Select
                  options={userTypeOptions}
                  value={selectedUserType}
                  onChange={(val) => {
                    setSelectedUserType(val);
                    setPage(1);
                  }}
                  placeholder="All Roles"
                  clearable
                  onClear={() => setSelectedUserType(null)}
                  selectClassName="!rounded-[8px] !h-[36px] bg-white border-gray-200"
                />
              </div>

              <div className="w-full">
                <label className="text-[10px] font-bold text-gray-600 mb-1 block">
                  Filter LGA
                </label>
                <Select
                  options={lgaOptions}
                  value={selectedLga}
                  onChange={(val) => {
                    setSelectedLga(val);
                    setSelectedWard(null);
                    setPage(1);
                  }}
                  placeholder="All LGAs"
                  clearable
                  onClear={() => {
                    setSelectedLga(null);
                    setSelectedWard(null);
                  }}
                  selectClassName="!rounded-[8px] !h-[36px] bg-white border-gray-200"
                />
              </div>

              <div className="w-full">
                <label className="text-[10px] font-bold text-gray-600 mb-1 block">
                  Filter Ward
                </label>
                <Select
                  options={wardOptions}
                  value={selectedWard}
                  onChange={(val) => {
                    setSelectedWard(val);
                    setPage(1);
                  }}
                  placeholder="All Wards"
                  disabled={!selectedLga}
                  clearable
                  onClear={() => setSelectedWard(null)}
                  selectClassName="!rounded-[8px] !h-[36px] bg-white border-gray-200"
                />
              </div>
            </div>

            {/* Deep Users Table */}
            {isLoadingUsers ? (
              <div className="py-12 flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#00A551] border-t-transparent"></div>
              </div>
            ) : users.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-500 bg-gray-50 rounded-lg">
                No users match the filtered criteria.
              </div>
            ) : (
              <div className="border border-gray-150 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-150">
                        <th className="p-3 w-[50px] text-center">
                          <Checkbox
                            checked={isAllUsersOnPageSelected}
                            onChange={(e) => handleSelectAllUsers(e.target.checked)}
                          />
                        </th>
                        <th className="p-3 text-xs font-bold text-gray-700 tracking-wider">
                          Full Profile
                        </th>
                        <th className="p-3 text-xs font-bold text-gray-700 tracking-wider">
                          Role & Status
                        </th>
                        <th className="p-3 text-xs font-bold text-gray-700 tracking-wider">
                          Spatial Location (Ward & LGA)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs">
                      {users.map((u: any) => (
                        <tr
                          key={u.id}
                          className={cn(
                            "hover:bg-gray-50/70 transition-all",
                            selectedUsers[u.id] && "bg-[#00A551]/5"
                          )}
                        >
                          <td className="p-3 text-center">
                            <Checkbox
                              checked={!!selectedUsers[u.id]}
                              onChange={() => toggleUserSelect(u.id)}
                            />
                          </td>
                          <td className="p-3 space-y-0.5">
                            <div className="font-semibold text-gray-900">
                              {u.firstName || "N/A"} {u.lastName || "N/A"}
                            </div>
                            <div className="text-[11px] text-gray-500">
                              {u.email || "N/A"}
                            </div>
                            <div className="text-[11px] text-gray-500">
                              {u.phoneNumber || "N/A"}
                            </div>
                          </td>
                          <td className="p-3 space-y-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                              {u.userType}
                            </span>
                            {u.verified && (
                              <div className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                                Verified Profile ✓
                              </div>
                            )}
                          </td>
                          <td className="p-3 space-y-0.5">
                            <div className="font-medium text-gray-700">
                              Ward: {u.ward || "N/A"}
                            </div>
                            <div className="text-gray-500">LGA: {u.lga || "N/A"}</div>
                            <div className="text-gray-500">Community: {u.community || "N/A"}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Server-side Pagination controls */}
                <div className="bg-gray-50 border-t border-gray-150 px-4 py-3 flex items-center justify-between">
                  <div className="text-xs text-gray-500 font-medium">
                    Showing {(page - 1) * limit + 1} to{" "}
                    {Math.min(page * limit, totalUsers)} of {totalUsers} users
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                      className="px-2.5 py-1.5 border border-gray-300 rounded bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Prev
                    </button>
                    <span className="px-3 py-1.5 text-xs font-bold text-gray-700 flex items-center bg-gray-100 rounded">
                      Page {page} of {totalPages || 1}
                    </span>
                    <button
                      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={page >= totalPages}
                      className="px-2.5 py-1.5 border border-gray-300 rounded bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Footer Section */}
        <div className="bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center shadow-lg">
          <div className="text-xs font-semibold text-gray-600">
            Selected: <span className="text-[#00A551] font-bold">{selectedUserIdsArray.length} users</span>{" "}
            &rarr; <span className="text-[#00A551] font-bold">{selectedProgramIdsArray.length} programs</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={close}
              className="py-2 px-5 border border-gray-300 rounded-full text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <KadaButton
              onClick={handleAssign}
              loading={isAssigning}
              disabled={selectedUserIdsArray.length === 0 || selectedProgramIdsArray.length === 0}
              className="py-2 px-6 rounded-full text-white bg-[#00A551] hover:bg-[#008f45] transition-colors"
            >
              Assign Selected Users
            </KadaButton>
          </div>
        </div>
      </section>
    </Drawer>
  );
}

export default AssignUsersDrawer;

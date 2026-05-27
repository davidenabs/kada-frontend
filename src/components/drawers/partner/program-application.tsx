import { useGetPostApplicantsQuery } from "@/app/_api/cms";
import { CloseIcon, SearchIcon } from "@/icons";
import React, { Fragment, useState, useMemo } from "react";
import { cn, Drawer, Input, Select } from "rizzui";
import { format } from "date-fns";
import { lgaOptions, wardOptionsByLga } from "@/lib/lga-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  Legend
} from "recharts";

type ProgramApplicationsDrawerProps = {
  close: () => void;
  open: boolean;
  postId: string | number;
};

// Golden angle HSL generator for charting colors
const generateColor = (index: number): string => {
  const hue = (index * 137.508) % 360;
  return `hsl(${hue}, 70%, 55%)`;
};

function ProgramApplicationsDrawer({
  close,
  open,
  postId,
}: ProgramApplicationsDrawerProps) {
  const [activeTab, setActiveTab] = useState<"list" | "insights">("list");
  const [search, setSearch] = useState("");
  const [selectedLga, setSelectedLga] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);

  // Fetch enriched applicants data from gateway
  const { data: response, isLoading } = useGetPostApplicantsQuery(postId, open);
  const applicants = response?.data || [];

  // Client-side filtering & search
  const filteredApplicants = useMemo(() => {
    return applicants.filter((app: any) => {
      const user = app.user || {};
      const meta = app.meta || {};
      const firstName = (user.firstName || meta.firstName || "").toLowerCase();
      const lastName = (user.lastName || meta.lastName || "").toLowerCase();
      const email = (user.email || meta.email || "").toLowerCase();
      const phone = (user.phoneNumber || meta.phoneNumber || "").toLowerCase();
      const searchLower = search.toLowerCase();

      const matchesSearch =
        firstName.includes(searchLower) ||
        lastName.includes(searchLower) ||
        email.includes(searchLower) ||
        phone.includes(searchLower);

      const matchesLga = !selectedLga || user.lga === selectedLga.value;
      const matchesWard = !selectedWard || user.ward === selectedWard.value;

      return matchesSearch && matchesLga && matchesWard;
    });
  }, [applicants, search, selectedLga, selectedWard]);

  // Ward options dynamically filtered by LGA
  const wardOptions = useMemo(() => {
    if (!selectedLga?.value) return [];
    return wardOptionsByLga(selectedLga.value);
  }, [selectedLga]);

  // Insights Calculations
  const insightsData = useMemo(() => {
    const lgaStats: Record<string, number> = {};
    const wardStats: Record<string, number> = {};
    const timelineStats: Record<string, number> = {};
    const cropStats: Record<string, number> = {};

    applicants.forEach((app: any) => {
      const user = app.user || {};
      const farms = app.farms || [];

      // LGA Stats
      const lga = user.lga || "Unspecified";
      lgaStats[lga] = (lgaStats[lga] || 0) + 1;

      // Ward Stats
      const ward = user.ward || "Unspecified";
      wardStats[ward] = (wardStats[ward] || 0) + 1;

      // Timeline Stats (by Date)
      if (app.createdAt) {
        try {
          const dateStr = format(new Date(app.createdAt), "yyyy-MM-dd");
          timelineStats[dateStr] = (timelineStats[dateStr] || 0) + 1;
        } catch (_) {}
      }

      // Crop Stats
      farms.forEach((f: any) => {
        f.crops?.forEach((c: any) => {
          if (c.name) {
            cropStats[c.name] = (cropStats[c.name] || 0) + 1;
          }
        });
      });
    });

    const lgaChart = Object.entries(lgaStats).map(([name, count]) => ({
      name,
      count
    }));

    const wardChart = Object.entries(wardStats).map(([name, count]) => ({
      name,
      count
    }));

    const timelineChart = Object.entries(timelineStats)
      .map(([date, count]) => ({
        date,
        count
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const cropChart = Object.entries(cropStats).map(([name, count]) => ({
      name,
      count
    }));

    return { lgaChart, wardChart, timelineChart, cropChart };
  }, [applicants]);

  // Premium Exporter to structured CSV Spreadsheet format
  const exportToCSV = () => {
    const headers = [
      "Applicant ID",
      "User ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone Number",
      "Community",
      "Ward",
      "LGA",
      "Zone",
      "Address",
      "Farms Count",
      "Total Land Area (ha)",
      "Crops Grown",
      "Livestock Raised",
      "Application Date"
    ];

    const rows = filteredApplicants.map((app: any) => {
      const user = app.user || {};
      const farms = app.farms || [];
      const cropNames = farms
        .flatMap((f: any) => f.crops?.map((c: any) => c.name) || [])
        .filter(Boolean);
      const uniqueCrops = Array.from(new Set(cropNames)).join("; ");

      const livestockNames = farms
        .flatMap((f: any) => f.livestocks?.map((l: any) => l.name) || [])
        .filter(Boolean);
      const uniqueLivestock = Array.from(new Set(livestockNames)).join("; ");

      const totalLand = farms.reduce(
        (acc: number, f: any) => acc + (Number(f.landArea) || 0),
        0
      );

      return [
        app.id,
        app.userId,
        user.firstName || app.meta?.firstName || "N/A",
        user.lastName || app.meta?.lastName || "N/A",
        user.email || app.meta?.email || "N/A",
        user.phoneNumber || app.meta?.phoneNumber || "N/A",
        user.community || "N/A",
        user.ward || "N/A",
        user.lga || "N/A",
        user.zone || "N/A",
        user.address || "N/A",
        farms.length,
        totalLand,
        uniqueCrops || "None",
        uniqueLivestock || "None",
        app.createdAt ? format(new Date(app.createdAt), "dd/MM/yyyy") : "N/A"
      ];
    });

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [
        headers.join(","),
        ...rows.map((r) =>
          r.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")
        )
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `program_applicants_post_${postId}_${format(new Date(), "dd-MM-yyyy")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        {/* Header Section */}
        <div className="bg-white flex justify-between items-center px-6 py-5 border-b border-gray-200">
          <div className="space-y-1">
            <h4 className="font-bold text-lg font-inter text-gray-900">
              Program Applicants Insight
            </h4>
            <p className="text-xs text-gray-500">
              Granular demographics, spatial location zones, farm counts, and CSV export capabilities.
            </p>
          </div>
          <button
            onClick={close}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="bg-white border-b border-gray-200 px-6 flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("list")}
              className={cn(
                "py-4 text-sm font-semibold border-b-2 transition-all px-2",
                activeTab === "list"
                  ? "border-[#00A551] text-[#00A551]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              )}
            >
              Applicant List ({filteredApplicants.length})
            </button>
            <button
              onClick={() => setActiveTab("insights")}
              className={cn(
                "py-4 text-sm font-semibold border-b-2 transition-all px-2",
                activeTab === "insights"
                  ? "border-[#00A551] text-[#00A551]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              )}
            >
              Analytical Insights
            </button>
          </div>

          {filteredApplicants.length > 0 && activeTab === "list" && (
            <button
              onClick={exportToCSV}
              className="py-1.5 px-3.5 bg-[#00A551] hover:bg-[#008f45] text-white text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Export to CSV
            </button>
          )}
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center bg-white m-6 rounded-xl border border-gray-200">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#00A551] border-t-transparent"></div>
              <p className="text-sm font-medium text-gray-600">
                Fetching granular applicants insights...
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === "list" ? (
              <Fragment>
                {/* Advanced Search and Demographics Filters */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1 w-full">
                    <label className="text-xs font-bold text-gray-700 mb-1.5 block">
                      Search Applicant
                    </label>
                    <Input
                      placeholder="Search Name, Email, Phone..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      prefix={<SearchIcon className="fill-gray-400" />}
                      clearable
                      onClear={() => setSearch("")}
                      inputClassName="!rounded-[8px] !h-[38px] bg-gray-50 border-gray-200"
                    />
                  </div>

                  <div className="w-full md:w-[200px]">
                    <label className="text-xs font-bold text-gray-700 mb-1.5 block">
                      Filter LGA
                    </label>
                    <Select
                      options={lgaOptions}
                      value={selectedLga}
                      onChange={(val) => {
                        setSelectedLga(val);
                        setSelectedWard(null);
                      }}
                      placeholder="All LGAs"
                      clearable
                      onClear={() => {
                        setSelectedLga(null);
                        setSelectedWard(null);
                      }}
                      selectClassName="!rounded-[8px] !h-[38px] bg-gray-50 border-gray-200"
                    />
                  </div>

                  <div className="w-full md:w-[200px]">
                    <label className="text-xs font-bold text-gray-700 mb-1.5 block">
                      Filter Ward
                    </label>
                    <Select
                      options={wardOptions}
                      value={selectedWard}
                      onChange={(val) => setSelectedWard(val)}
                      placeholder="All Wards"
                      disabled={!selectedLga}
                      clearable
                      onClear={() => setSelectedWard(null)}
                      selectClassName="!rounded-[8px] !h-[38px] bg-gray-50 border-gray-200"
                    />
                  </div>
                </div>

                {/* Granular Participant List Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="p-4 text-xs font-bold text-gray-700 tracking-wider">
                            Applicant Profile
                          </th>
                          <th className="p-4 text-xs font-bold text-gray-700 tracking-wider">
                            Location (Ward & LGA)
                          </th>
                          <th className="p-4 text-xs font-bold text-gray-700 tracking-wider">
                            Farms Summary
                          </th>
                          <th className="p-4 text-xs font-bold text-gray-700 tracking-wider">
                            Applied
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {filteredApplicants.length > 0 ? (
                          filteredApplicants.map((app: any) => {
                            const user = app.user || {};
                            const meta = app.meta || {};
                            const farms = app.farms || [];

                            const cropNames = farms
                              .flatMap((f: any) => f.crops?.map((c: any) => c.name) || [])
                              .filter(Boolean);
                            const uniqueCrops = Array.from(new Set(cropNames));

                            const livestockNames = farms
                              .flatMap((f: any) => f.livestocks?.map((l: any) => l.name) || [])
                              .filter(Boolean);
                            const uniqueLivestock = Array.from(new Set(livestockNames));

                            const totalLand = farms.reduce(
                              (acc: number, f: any) => acc + (Number(f.landArea) || 0),
                              0
                            );

                            return (
                              <tr
                                key={app.id}
                                className="hover:bg-gray-50 transition-colors"
                              >
                                {/* Participant Basic Info */}
                                <td className="p-4 space-y-1">
                                  <div className="font-semibold text-gray-900">
                                    {user.firstName || meta.firstName || "N/A"}{" "}
                                    {user.lastName || meta.lastName || "N/A"}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {user.email || meta.email || "N/A"}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {user.phoneNumber || meta.phoneNumber || "N/A"}
                                  </div>
                                  <div className="flex gap-1.5 mt-1">
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 capitalize">
                                      {user.userType || "FARMER"}
                                    </span>
                                    {user.verified && (
                                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                        Verified Profile
                                      </span>
                                    )}
                                  </div>
                                </td>

                                {/* spatial demographic location */}
                                <td className="p-4 space-y-1">
                                  <div className="font-medium text-gray-800">
                                    Ward: {user.ward || "N/A"}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    LGA: {user.lga || "N/A"}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Community: {user.community || "N/A"}
                                  </div>
                                  {user.address && (
                                    <div className="text-[11px] text-gray-400 max-w-[200px] truncate">
                                      Addr: {user.address}
                                    </div>
                                  )}
                                </td>

                                {/* Farm crops, livestocks and sizes */}
                                <td className="p-4 space-y-1">
                                  <div className="font-medium text-gray-800 flex items-center gap-1.5">
                                    <span>Farms count:</span>
                                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded font-semibold text-xs">
                                      {farms.length}
                                    </span>
                                  </div>
                                  {farms.length > 0 && (
                                    <Fragment>
                                      <div className="text-xs text-gray-500">
                                        Total Land Area: {totalLand.toFixed(2)} ha
                                      </div>
                                      {uniqueCrops.length > 0 && (
                                        <div className="text-[11px] text-gray-400 max-w-[220px] truncate">
                                          Crops: {uniqueCrops.join(", ")}
                                        </div>
                                      )}
                                      {uniqueLivestock.length > 0 && (
                                        <div className="text-[11px] text-gray-400 max-w-[220px] truncate">
                                          Livestock: {uniqueLivestock.join(", ")}
                                        </div>
                                      )}
                                    </Fragment>
                                  )}
                                </td>

                                {/* Submission Time */}
                                <td className="p-4 text-xs text-gray-500 font-medium">
                                  {app.createdAt
                                    ? format(new Date(app.createdAt), "dd/MM/yyyy HH:mm")
                                    : "N/A"}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="p-8 text-center text-sm text-gray-500"
                            >
                              No applicants match your search and location criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {/* Visual analytical charts view */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LGA Demographics Chart */}
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col h-[380px]">
                    <div className="mb-4">
                      <h5 className="font-bold text-sm text-gray-800">
                        Applicants Distribution by LGA
                      </h5>
                      <p className="text-[11px] text-gray-500">
                        Local government demographic mapping of all joined users.
                      </p>
                    </div>
                    <div className="flex-1 min-h-0">
                      {insightsData.lgaChart.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={insightsData.lgaChart}>
                            <XAxis
                              dataKey="name"
                              tick={{ fontSize: 10 }}
                              interval={0}
                              angle={-20}
                              textAnchor="end"
                              height={50}
                            />
                            <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                              {insightsData.lgaChart.map((_, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={generateColor(index)}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex items-center justify-center text-xs text-gray-500">
                          Insufficient demographics data.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Crops / Agricultural Summary Chart */}
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col h-[380px]">
                    <div className="mb-4">
                      <h5 className="font-bold text-sm text-gray-800">
                        Applicants Crop Production Summary
                      </h5>
                      <p className="text-[11px] text-gray-500">
                        Crop distribution based on applicant registered farms.
                      </p>
                    </div>
                    <div className="flex-1 min-h-0">
                      {insightsData.cropChart.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={insightsData.cropChart}>
                            <XAxis
                              dataKey="name"
                              tick={{ fontSize: 10 }}
                              interval={0}
                              angle={-20}
                              textAnchor="end"
                              height={50}
                            />
                            <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                              {insightsData.cropChart.map((_, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={generateColor(index + 3)}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex items-center justify-center text-xs text-gray-500">
                          No agricultural farm details found.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Application Timeline Rate Chart */}
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col h-[380px] md:col-span-2">
                    <div className="mb-4">
                      <h5 className="font-bold text-sm text-gray-800">
                        Application Submission Velocity
                      </h5>
                      <p className="text-[11px] text-gray-500">
                        Rate of registration timeline events mapped daily.
                      </p>
                    </div>
                    <div className="flex-1 min-h-0">
                      {insightsData.timelineChart.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={insightsData.timelineChart}>
                            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                            <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="count"
                              stroke="#00A551"
                              strokeWidth={3}
                              activeDot={{ r: 6 }}
                              name="Registrations"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex items-center justify-center text-xs text-gray-500">
                          Timeline dataset is empty.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        )}
      </section>
    </Drawer>
  );
}

export default ProgramApplicationsDrawer;

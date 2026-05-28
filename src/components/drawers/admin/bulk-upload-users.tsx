import React, { useState, useMemo, useEffect } from "react";
import { ActionIcon, Button, Drawer, MultiSelect } from "rizzui";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useBulkUploadUsersMutation, useGetBulkUploadJobQuery } from "@/app/_api/user";
import { useGetCmsPostsQuery } from "@/app/_api/cms";

export default function BulkUploadDrawer({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [selectedPrograms, setSelectedPrograms] = useState<any[]>([]);
  const [jobId, setJobId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("activeBulkUploadJobId");
    }
    return null;
  });

  useEffect(() => {
    if (jobId) {
      localStorage.setItem("activeBulkUploadJobId", jobId);
    } else {
      localStorage.removeItem("activeBulkUploadJobId");
    }
  }, [jobId]);

  const { data: postsData, isLoading: isLoadingPosts } = useGetCmsPostsQuery({
    params: { limit: 100, filter: "active" },
  });

  const { mutate: uploadFile, isPending } = useBulkUploadUsersMutation();

  const { data: jobData } = useGetBulkUploadJobQuery(jobId as string, !!jobId);

  const programs = useMemo(() => {
    const posts = postsData?.data?.posts || [];
    return posts
      .filter((p: any) => p.type === "program" || p.type === "interventions")
      .map((p: any) => ({
        label: p.title,
        value: p.id,
      }));
  }, [postsData]);

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    selectedPrograms.forEach((p) => {
      formData.append("programIds", p.value ? p.value : p);
    });

    uploadFile(formData, {
      onSuccess: (res) => {
        if (res?.data?.id) {
          toast.success("Upload started!");
          setJobId(res.data.id);
        } else {
          toast.error("Failed to start upload.");
        }
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "An error occurred.");
      },
    });
  };

  const jobInfo = jobData?.data;

  return (
    <Drawer isOpen={open} onClose={close} size="lg" placement="right">
      <div className="flex items-center justify-between px-5 py-4 border-b bg-white ">
        <h3 className="font-bold text-lg">Bulk Upload Farmers</h3>
        <ActionIcon variant="text" onClick={close}>
          <XMarkIcon className="w-5 h-5" />
        </ActionIcon>
      </div>
      <div className="p-5 space-y-6 bg-white px-6 h-full">
        <div>
          <label className="block text-sm font-medium mb-1">CSV File</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full border rounded-md p-2 text-sm"
            disabled={isPending || !!jobId}
          />
          <p className="text-xs text-gray-500 mt-1">
            Ensure the CSV follows the standard template format. Required headers include PHONE NO., NIN, EMAIL, etc.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Assign to Programs (Optional)</label>
          <MultiSelect
            options={programs}
            value={selectedPrograms}
            onChange={(vals) => setSelectedPrograms(vals as any[])}
            disabled={isPending || !!jobId}
            placeholder="Select programs..."
            className="w-full"
            clearable={true}
            onClear={() => setSelectedPrograms([])}
          />
        </div>

        {!jobId ? (
          <Button
            className="w-full"
            isLoading={isPending}
            onClick={handleUpload}
            disabled={!file}
          >
            Start Upload
          </Button>
        ) : (
          <div className="border p-4 rounded-lg bg-gray-50 space-y-3">
            <h4 className="font-semibold">Upload Status: {jobInfo?.status || "LOADING..."}</h4>
            <div className="text-sm">
              <p>Total Records: {jobInfo?.totalRecords || 0}</p>
              <p>Processed: {jobInfo?.processedRecords || 0}</p>
              <p className="text-green-600">Successful: {jobInfo?.successfulRecords || 0}</p>
              <p className="text-red-600">Failed: {jobInfo?.failedRecords || 0}</p>
            </div>
            
            {jobInfo?.status === "PROCESSING" && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all" 
                  style={{ width: `${(jobInfo.processedRecords / (jobInfo.totalRecords || 1)) * 100}%` }}
                ></div>
              </div>
            )}

            {(jobInfo?.status === "COMPLETED" || jobInfo?.status === "FAILED") && (
              <div className="flex gap-3 mt-4">
                <Button className="w-full" variant="outline" onClick={() => setJobId(null)}>Start New Upload</Button>
                <Button className="w-full" onClick={close}>Close</Button>
              </div>
            )}

            {jobInfo?.errors && jobInfo.errors.length > 0 && (
              <div className="mt-4">
                <h5 className="font-semibold text-red-600 mb-2">Errors:</h5>
                <div className="max-h-40 overflow-y-auto text-xs space-y-1 bg-white p-2 border rounded">
                  {jobInfo.errors.map((e: any, idx: number) => (
                    <p key={idx} className="text-red-500">
                      {e.row ? `Row ${e.row}: ` : ""}{e.error}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Drawer>
  );
}

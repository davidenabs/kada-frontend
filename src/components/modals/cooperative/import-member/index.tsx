import { useAddFarmersFromCsvMutation } from "@/app/_api/user";
import { KadaButton } from "@/components/form/button";
import { CloseIcon } from "@/icons";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";
import React from "react";
import { toast } from "sonner";

type ImportMemberModalProps = {
  close: () => void;
};

function ImportMemberModal({ close }: ImportMemberModalProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const mutation = useAddFarmersFromCsvMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleTemplateDownload = () => {
    const link = document.createElement("a");
    link.href = "/templates/farmer.xlsx";
    link.download = "farmer-template.xlsx";
    link.click();
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    mutation.mutateAsync(formData, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Process completed successfully");
          const { errors, success } = response.data;

          if (errors.length) {
            errors.map((error: any) => toast.error(error));
          }

          if (success.length) {
            success.map((s: any) => toast.success(s));
          }
        }
      },
    });
  };
  return (
    <section className="flex overflow-hidden flex-col w-full rounded-[10px] bg-white font-inter">
      <header className="flex items-center justify-between border-b px-6 py-2">
        <h4 className="text-base font-semibold">Import List</h4>

        <div className="flex items-center gap-8">
          <button onClick={handleTemplateDownload}>Get CSV Template</button>

          <button onClick={close}>
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className=" bg-white p-6">
        <div className="flex justify-center items-center h-[225px]">
          <div className="text-center">
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept={
                "application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              }
              onChange={handleFileChange}
            />
            <h4 className="text-lg">Import file with farmer data</h4>
            <KadaButton
              className=""
              leftIcon={<CloudArrowUpIcon className="w-4 h-4" />}
              variant="outline"
              onClick={handleClick}
            >
              Browse file
            </KadaButton>

            {/* display file */}
            {file && (
              <div className="flex items-center gap-2 mt-4">
                <span>{file.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                  }}
                >
                  <CloseIcon className="w-3 h-3 fill-red-500" />
                </button>
              </div>
            )}
          </div>
        </div>

        <KadaButton
          className="w-full rounded-full"
          // disabled={!file}
          loading={mutation.isPending}
          onClick={handleSubmit}
        >
          Submit
        </KadaButton>
      </div>
    </section>
  );
}

export default ImportMemberModal;

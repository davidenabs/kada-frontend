import { KadaButton } from "@/components/form/button";
import { CloseIcon } from "@/icons";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";
import React from "react";

type ImportMemberModalProps = {
  close: () => void;
};

function ImportMemberModal({ close }: ImportMemberModalProps) {
  return (
    <section className="flex overflow-hidden flex-col w-full rounded-[10px] bg-white font-inter">
      <header className="flex items-center justify-between border-b px-6 py-2">
        <h4 className="text-base font-semibold">Import List</h4>

        <div className="flex items-center gap-8">
          <button>Get CSV Template</button>

          <button onClick={close}>
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className=" bg-white p-6">
        <div className="flex justify-center items-center h-[225px]">
          <div className="text-center">
            <h4 className="text-lg">Import file with farmer data</h4>
            <KadaButton
              className=""
              leftIcon={<CloudArrowUpIcon className="w-4 h-4" />}
              variant="outline"
            >
              Browse file
            </KadaButton>
          </div>
        </div>

        <KadaButton disabled className="w-full rounded-full">
          Fetch Data
        </KadaButton>
      </div>
    </section>
  );
}

export default ImportMemberModal;

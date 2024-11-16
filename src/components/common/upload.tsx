import { CloudArrowUpIcon } from "@heroicons/react/16/solid";
import React, { Fragment } from "react";
import { KadaButton } from "../form/button";

// type UploadProps = {
//   handleClick: () => void;
//   handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   fileInputRef: React.RefObject<HTMLInputElement>;
// };

interface UploadProps extends React.HTMLProps<HTMLInputElement> {
  handleClick: () => void;
  // handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

function Upload({
  handleClick,
  fileInputRef,
  accept = ".svg,.png,.jpg,.jpeg,.gif",
  ...prop
}: UploadProps) {
  return (
    <Fragment>
      <div
        className="flex border border-dotted rounded-2xl justify-between items-center p-4 relative cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center space-x-2">
          <div className="">
            <CloudArrowUpIcon className="w-6 h-6" />
          </div>

          <div className="">
            <p className="text-[#101928] font-inter">Tap to Upload</p>
            <p className="text-[#98A2B3] text-[11px]">
              SVG, PNG, JPG, GIF | 10MB max.
            </p>
          </div>
        </div>

        <div className="">
          <KadaButton className="!bg-black">Upload</KadaButton>
        </div>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          accept={accept}
          {...prop}
        />
      </div>
    </Fragment>
  );
}

export default Upload;

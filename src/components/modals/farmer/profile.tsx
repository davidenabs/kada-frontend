import React, { Fragment } from "react";
import { CloseIcon } from "@/icons";
import { formatKey, isValidValue, renderValue } from "@/utils/utils";

type ProfileProps = {
    close: () => void;
    profile: any;
};

function ProfileModal({ close, profile }: ProfileProps) {
    return (
        <Fragment>
            <div className="w-full rounded-[10px] max-md:max-w-full bg-white">
                <header className="flex justify-between bg-[#FFFFFF] border-b border-[#ECF2F6] px-4 py-2 rounded-t-[10px]">
                    <h1 className="self-start text-lg font-bold">Profile</h1>
                    <button onClick={close}>
                        <CloseIcon className="w-4 h-4" />
                    </button>
                </header>

                <div className="w-full max-h-[70vh] overflow-y-scroll p-4">
                    <div className="flex flex-col items-center">
                        {/* Render Image */}
                        {isValidValue(profile?.photo) && (
                            <div className="mb-4">
                                <img
                                    src={`data:image/jpeg;base64,${profile?.photo}`}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border border-gray-200"
                                />
                            </div>
                        )}

                        {/* Profile Details */}
                        <div className="grid grid-cols-1 gap-3 w-full sm:grid-cols-2 overflow-y-auto max-h-[300px]">
                            {Object.entries(profile)
                                .filter(([key, value]) => isValidValue(value))
                                .map(([key, value], index) => {
                                    if (key !== "photo")
                                        return (
                                            <div key={index} className="border p-3 rounded-lg">
                                                <strong>{formatKey(key)}:</strong> {renderValue(value)}
                                            </div>
                                        );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ProfileModal;

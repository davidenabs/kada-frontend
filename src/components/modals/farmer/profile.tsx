import React, { Fragment } from "react";
import { CloseIcon } from "@/icons";
import { isValidValue } from "@/utils/utils";

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
                        <div className="grid grid-cols-1 gap-3 w-full sm:grid-cols-2">
                            {isValidValue(profile?.firstname) && (
                                <div className="border p-3 rounded-lg">
                                    <strong>First Name:</strong> {profile?.firstname}
                                </div>
                            )}
                            {isValidValue(profile?.middlename) && (
                                <div className="border p-3 rounded-lg">
                                    <strong>Middle Name:</strong> {profile?.middlename}
                                </div>
                            )}
                            {isValidValue(profile?.surname) && (
                                <div className="border p-3 rounded-lg">
                                    <strong>Surname:</strong> {profile?.surname}
                                </div>
                            )}
                            {isValidValue(profile?.gender) && (
                                <div className="border p-3 rounded-lg">
                                    <strong>Gender:</strong> {profile?.gender.toUpperCase()}
                                </div>
                            )}
                            {isValidValue(profile?.birthdate) && (
                                <div className="border p-3 rounded-lg">
                                    <strong>Birth Date:</strong> {profile?.birthdate}
                                </div>
                            )}
                            {isValidValue(profile?.state_of_origin) && (
                                <div className="border p-3 rounded-lg">
                                    <strong>State of Origin:</strong> {profile?.state_of_origin}
                                </div>
                            )}
                            {isValidValue(profile?.lga_origin) && (
                                <div className="border p-3 rounded-lg">
                                    <strong>LGA of Origin:</strong> {profile?.lga_origin}
                                </div>
                            )}
                            {isValidValue(profile?.profession) && (
                                <div className="border p-3 rounded-lg">
                                    <strong>Profession:</strong> {profile?.profession}
                                </div>
                            )}
                            {isValidValue(profile?.telephoneno) && (
                                <div className="border p-3 rounded-lg">
                                    <strong>Telephone:</strong> {profile?.telephoneno}
                                </div>
                            )}
                            {isValidValue(profile?.email) && (
                                <div className="border p-3 rounded-lg">
                                    <strong>Email:</strong> {profile?.email}
                                </div>
                            )}
                            {isValidValue(profile?.maritalstatus) && (
                                <div className="border p-3 rounded-lg">
                                    <strong>Marital Status:</strong> {profile?.maritalstatus}
                                </div>
                            )}
                            {/* Add additional fields dynamically as needed */}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ProfileModal;

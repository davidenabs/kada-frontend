import { isValidValue } from "@/utils/utils";
import React from "react";

const ProfileDetail = ({ data }: { data: any }): React.JSX.Element => {
    // const details = [
    //     { label: "First Name", value: data.firstname },
    //     { label: "Middle Name", value: data.middlename },
    //     { label: "Surname", value: data.surname },
    //     { label: "Gender", value: data.gender?.toUpperCase() },
    //     { label: "Birth Date", value: data.birthdate },
    //     { label: "State of Origin", value: data.state_of_origin },
    //     { label: "LGA of Origin", value: data.lga_origin },
    //     { label: "Profession", value: data.profession },
    //     { label: "Telephone", value: data.telephoneno },
    //     { label: "Email", value: data.email },
    //     { label: "Marital Status", value: data.maritalstatus },
    // ];

    return (
        <div className="details-grid">

            <div className="flex flex-col items-center">
                {/* Render Farmer Profile Image */}
                {isValidValue(data.photo) && (
                    <div className="mb-4">
                        <img
                            src={`data:image/jpeg;base64,${data.photo}`}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border border-gray-200"
                        />
                    </div>
                )}

                {/* Profile Details */}
                <div className="grid grid-cols-1 gap-3 w-full sm:grid-cols-2">
                    {isValidValue(data.firstname) && (
                        <div className="border p-3 rounded-lg">
                            <strong>First Name:</strong> {data.firstname}
                        </div>
                    )}
                    {isValidValue(data.middlename) && (
                        <div className="border p-3 rounded-lg">
                            <strong>Middle Name:</strong> {data.middlename}
                        </div>
                    )}
                    {isValidValue(data.surname) && (
                        <div className="border p-3 rounded-lg">
                            <strong>Surname:</strong> {data.surname}
                        </div>
                    )}
                    {isValidValue(data.gender) && (
                        <div className="border p-3 rounded-lg">
                            <strong>Gender:</strong> {data.gender.toUpperCase()}
                        </div>
                    )}
                    {isValidValue(data.birthdate) && (
                        <div className="border p-3 rounded-lg">
                            <strong>Birth Date:</strong> {data.birthdate}
                        </div>
                    )}
                    {isValidValue(data.state_of_origin) && (
                        <div className="border p-3 rounded-lg">
                            <strong>State of Origin:</strong> {data.state_of_origin}
                        </div>
                    )}
                    {isValidValue(data.lga_origin) && (
                        <div className="border p-3 rounded-lg">
                            <strong>LGA of Origin:</strong> {data.lga_origin}
                        </div>
                    )}
                    {isValidValue(data.profession) && (
                        <div className="border p-3 rounded-lg">
                            <strong>Profession:</strong> {data.profession}
                        </div>
                    )}
                    {isValidValue(data.telephoneno) && (
                        <div className="border p-3 rounded-lg">
                            <strong>Telephone:</strong> {data.telephoneno}
                        </div>
                    )}
                    {isValidValue(data.email) && (
                        <div className="border p-3 rounded-lg">
                            <strong>Email:</strong> {data.email}
                        </div>
                    )}
                    {isValidValue(data.maritalstatus) && (
                        <div className="border p-3 rounded-lg">
                            <strong>Marital Status:</strong> {data.maritalstatus}
                        </div>
                    )}
                </div>
            </div>
            {/* {details.map((detail, index) => (
                detail.value && (
                    <div key={index} className="detail-item">
                        <strong>{detail.label}:</strong> {detail.value}
                    </div>
                )
            ))} */}
        </div>
    );
};

export default ProfileDetail;

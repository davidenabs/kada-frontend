import React from "react";

type UserData = {
    name: any;
    email: any;
    phone: any;
    publicId: any;
    address: any;
    profileImage: any;
};

type IDCardProps = {
    userData: UserData;
};

const IDCard: React.FC<IDCardProps> = ({ userData }) => {
    const {
        name,
        email,
        phone,
        publicId,
        address,
        profileImage,
    } = userData;

    return (
        <div className="max-w-md w-full mx-auto border rounded-lg shadow-lg bg-white p-4">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-xl font-bold text-gray-700">ID Card</h1>
                <p className="text-xs text-gray-500">Issued by: KADA</p>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center mt-4">
                <img
                    src={profileImage || ""}
                    alt={`${name}'s Profile`}
                    className="w-24 h-24 rounded-full border-2 border-gray-300"
                />
                <h2 className="mt-2 text-lg font-semibold text-gray-800">{name}</h2>
            </div>

            {/* Information Section */}
            <div className="mt-4">
                <ul className="text-sm text-gray-600 space-y-2">
                    <li>
                        <strong>Public ID:</strong> {publicId}
                    </li>
                    <li>
                        <strong>Email:</strong> {email || "N/A"}
                    </li>
                    <li>
                        <strong>Phone:</strong> {phone || "N/A"}
                    </li>
                    <li>
                        <strong>Address:</strong> {address || "N/A"}
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div className="mt-6 border-t pt-4 text-center">
                <p className="text-xs text-gray-500">
                    This ID card is the property of KADA. If found, please contact us at admin@kada.com.
                </p>
            </div>
        </div>
    );
};

export default IDCard;

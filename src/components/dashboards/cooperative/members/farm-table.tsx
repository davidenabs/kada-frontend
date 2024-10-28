import React from 'react';

const FarmerTableHeader: React.FC = () => {
    return (
        <thead className="bg-white text-sm font-medium text-black">
            <tr className="px-5 py-6 w-full">
                <th className="px-5 py-4 text-left">
                    <div className="flex gap-10 items-center">
                        <div className="w-4 h-4 rounded border border-black border-solid" />
                        <span>Name</span>
                    </div>
                </th>
                <th className="px-5 py-4 text-left">Phone number</th>
                <th className="px-5 py-4 text-left">Email</th>
                <th className="px-5 py-4 text-left">Location</th>
                <th className="px-5 py-4 text-left">Category</th>
                <th className="px-5 py-4 text-left">Funding</th>
                <th className="px-5 py-4 text-left">Date Joined</th>
                <th className="px-5 py-4 text-left">Action</th>
            </tr>
        </thead>
    );
};

interface FarmerData {
    name: string;
    phone: string;
    email: string;
    location: string;
    category: string;
    funding: string;
    dateJoined: string;
}

interface FarmerTableRowProps {
    farmer: FarmerData;
    isEven: boolean;
}

const FarmerTableRow: React.FC<FarmerTableRowProps> = ({ farmer, isEven }) => {
    return (
        <tr className={`px-4 py-5 ${isEven ? 'bg-white' : 'bg-neutral-50'}`}>
            <td className="px-5 py-4">
                <div className="flex gap-10 items-center">
                    <div className="w-4 h-4 rounded border border-solid border-zinc-700" />
                    <span className="font-semibold">{farmer.name}</span>
                </div>
            </td>
            <td className="px-5 py-4">{farmer.phone}</td>
            <td className="px-5 py-4">{farmer.email}</td>
            <td className="px-5 py-4">{farmer.location}</td>
            <td className="px-5 py-4">{farmer.category}</td>
            <td className="px-5 py-4">{farmer.funding}</td>
            <td className="px-5 py-4">{farmer.dateJoined}</td>
            <td className="px-5 py-4">
                <button
                    className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    aria-label={`View details for ${farmer.name}`}
                >
                    view
                </button>
            </td>
        </tr>
    );
};

const farmerData: FarmerData[] = [
    {
        name: "Sadiq Umar O.",
        phone: "08023456789",
        email: "sadiqumar@gmail.com",
        location: "Birnin Gwari",
        category: "Livestock",
        funding: "N/A",
        dateJoined: "22 Jan, 2024"
    },

    // Add more farmer entries here...
];

const FarmerTable: React.FC = () => {
    return (
        <section className="overflow-hidden mt-3 w-full bg-white rounded border border-gray-200 max-md:max-w-full">
            <table className="min-w-full text-zinc-700 text-sm overflow-scroll">
                <FarmerTableHeader />
                <tbody>
                    {Array(10).fill(null).map((_, index) => (
                        <FarmerTableRow
                            key={index}
                            farmer={farmerData[index % farmerData.length]} // Repeat the data in a loop if needed
                            isEven={index % 2 === 0}
                        />
                    ))}

                </tbody>
            </table>
        </section>
    );
};

export default FarmerTable;

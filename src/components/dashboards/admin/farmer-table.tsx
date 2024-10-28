import Input from '@/components/form/input';
import { SearchIcon } from '@/icons';
import Link from 'next/link';
import React from 'react';

interface FarmerData {
  id: number;
  name: string;
  nin: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  fundingStatus: string;
  products: string;
}

const farmerData: FarmerData[] = [
  {
    id: 1,
    name: "Dada Emmanuel Itopa",
    nin: "12345643222**",
    coordinates: {
      latitude: "N11 34' 42 ' 21",
      longitude: "E7 7' 42 ' 12.93"
    },
    fundingStatus: "N/A",
    products: "Rice, Wheat, Beans"
  },
  {
    id: 2,
    name: "Dada Emmanuel Itopa",
    nin: "12345643222**",
    coordinates: {
      latitude: "N11 34' 42 ' 21",
      longitude: "E7 7' 42 ' 12.93"
    },
    fundingStatus: "Funded",
    products: "Rice, Wheat, Beans"
  },
  // Add more farmer data objects here...
];

const FarmerTable: React.FC = () => {
  return (
    <section className="mt-10 w-full leading-tight max-w[1023px] text-zinc-700 max-md:max-w-full">
      <div className="flex justify-between items-center w-full mt-2.5">
        <h2 className="text-base">Farmer Information</h2>
        <Input placeholder="Search for an item" prefix={<SearchIcon />} />
      </div>

      {/* <div className="shrink-0 self- mr-20 max-w-full h-0 border-slate-500 w-[254px] max-md:mr-2.5" /> */}

      <table className="w-full mt-3.5 ml6 border-collapse border border-gray-200 text-sm max-md:max-w-full overflow-auto">
        <thead className="bg-stone-50 text-slate-500">
          <tr>
            <th className="py-5 pr-16 pl-6 text-left">S/N</th>
            <th className="py-5 pr-16 text-left">Farmer Name</th>
            <th className="py-5 pr-16 text-left">NIN</th>
            <th className="py-5 pr-16 text-left">Coordinates</th>
            <th className="py-5 pr-16 text-left">Funding Status</th>
            <th className="py-5 pr-16 text-left">Products</th>
            <th className="py-5 pr-16 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {farmerData.map((farmer) => (
            <tr key={farmer.id} className="border-b border-gray-200">
              <td className="py-4 pl-6">{farmer.id}</td>
              <td className="py-4">{farmer.name}</td>
              <td className="py-4">{farmer.nin}</td>
              <td className="py-4">
                <div>{farmer.coordinates.latitude}</div>
                <div>{farmer.coordinates.longitude}</div>
              </td>
              <td className="py-4">
                <div className={`px-2.5 py-1 rounded-[60px] w-fit border ${farmer.fundingStatus === 'Funded' ? 'text-teal-700 bg-green-50 border-teal-700' : 'bg-zinc-100'}`}>
                  {farmer.fundingStatus}
                </div>
              </td>
              <td className="py-4">{farmer.products}</td>
              <td className="py-4">
                <Link href="/admin/profile/farmers" className="text-teal-700">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default FarmerTable;

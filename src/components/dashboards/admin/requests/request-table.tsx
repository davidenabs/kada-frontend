import Input from '@/components/form/input';
import { SearchIcon } from '@/icons';
import Link from 'next/link';
import React from 'react';

interface RequestData {
  id: number;
  vendorName: string;
  dateRequested: string;
  amountPaid: string;
  description: string;
}

const vendorData: RequestData[] = [
  {
    id: 1,
    vendorName: "ABCD Agro Enterprise",
    dateRequested: "03 Jan 2024",
    amountPaid: "NGN 20,000.00",
    description: "Request License/Cert"
  },
  // Add more vendor data objects here...
];

const RequestTable: React.FC = () => {
  return (
    <section className="mt-10 w-full leading-tight max-w[1023px] text-zinc-700 max-md:max-w-full">
      <div className="flex justify-between items-center w-full mt-2.5">
        <h2 className="text-base">Request Information</h2>
        <Input placeholder="Search for a vendor" prefix={<SearchIcon />} />
      </div>

      <table className="w-full mt-3.5 border-collapse border border-gray-200 text-sm max-md:max-w-full overflow-auto">
        <thead className="bg-stone-50 text-slate-500">
          <tr>
            <th className="py-5 pr-16 pl-6 text-left">S/N</th>
            <th className="py-5 pr-16 text-left">Request Name</th>
            <th className="py-5 pr-16 text-left">Date Requested</th>
            <th className="py-5 pr-16 text-left">Amount Paid</th>
            <th className="py-5 pr-16 text-left">Description</th>
            <th className="py-5 pr-16 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendorData.map((vendor) => (
            <tr key={vendor.id} className="border-b border-gray-200">
              <td className="py-4 pl-6">{vendor.id}</td>
              <td className="py-4">{vendor.vendorName}</td>
              <td className="py-4">{vendor.dateRequested}</td>
              <td className="py-4">{vendor.amountPaid}</td>
              <td className="py-4">{vendor.description}</td>
              <td className="py-4">
                <div className="flex gap-4">
                  <button className="text-green-700">Approve</button>
                  <button className="text-red-600">Reject</button>
                  <Link href="/admin/submissions/vendor" className="underline">View Submission</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default RequestTable;

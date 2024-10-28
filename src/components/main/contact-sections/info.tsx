import { OfficeIcon } from '@/icons';
import React from 'react';

interface OfficeDetails {
  name: string;
  address: string;
}

interface OfficeInfoProps {
  offices: OfficeDetails[];
}

const OfficeInfo: React.FC<OfficeInfoProps> = ({ offices }) => {
  return (
    <section className="flex flex-col items-center px16 py-11 mt-14 max-w-full leading-tight text-white border border-white border-solid bg-tertiary-600 w-[880px] max-md:px-5 max-md:mt-10">
      <OfficeIcon className="w-[50px] h-[50px]" />
      <h3 className="mt-4 text-xl">Offices</h3>
      
      {/* Table Structure */}
      <table className="mt-6 w-full table-auto text-left">
        <tbody>
          {offices.map((office, index) => (
            <tr key={index} className="">
              <td className="px-4 py-2 text-sm text-right">{office.name}</td>
              <td className="px-4 py-2 text-sm">{office.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default OfficeInfo;

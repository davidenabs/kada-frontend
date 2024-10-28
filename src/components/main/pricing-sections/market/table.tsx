import React from 'react';

interface MarketData {
  id: number;
  name: string;
  lga: string;
  days: string;
}

const marketData: MarketData[] = Array.from({ length: 22 }, (_, index) => ({
  id: index + 1,
  name: 'Kajuma Market',
  lga: 'Chikun',
  days: 'Wed, Fri,',
}));

const MarketTable: React.FC = () => {
  return (
    <div className="overflow-x-auto pr-2.5 pb-24 mt-6 w-full bg-white max-md:mr-0.5 max-md:max-w-full">
      <table className="w-full border-collapse max-md:max-w-full">
        <thead>
          <tr className="bg-green-50 text-green-800 border-b border-green-800">
            <th className="px-6 py-4 font-semibold text-left">S/N</th>
            <th className="px-6 py-4 font-semibold text-left">NAME OF MARKET</th>
            <th className="px-6 py-4 font-semibold text-left">LGA</th>
            <th className="px-6 py-4 font-semibold text-left">COMMUNITY</th>
            <th className="px-6 py-4 font-semibold text-left">WARD</th>
            <th className="px-6 py-4 font-semibold text-left">COORDINATES</th>
            <th className="px-6 py-4 font-semibold text-left">MARKET DAYS</th>
            <th className="px-6 py-4 font-semibold text-left">TYPE OF MARKET</th>
            <th className="px-6 py-4 font-semibold text-left">SIZE</th>
          </tr>
        </thead>
        <tbody>
          {marketData.map((market) => (
            <tr key={market.id} className="borderb text-black">
              <td className="px-6 py-4">{market.id}</td>
              <td className="px-6 py-4">{market.name}</td>
              <td className="px-6 py-4">{market.lga}</td>
              <td className="px-6 py-4">-</td>
              <td className="px-6 py-4">-</td>
              <td className="px-6 py-4">-</td>
              <td className="px-6 py-4">{market.days}</td>
              <td className="px-6 py-4">-</td>
              <td className="px-6 py-4">-</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;

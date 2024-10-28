import React from 'react';

interface FundingRecord {
  provider: string;
  amount: string;
  date: string;
}

const fundingData: FundingRecord[] = [
  { provider: "Bank of Industry", amount: "NGN 500,000", date: "20 Dec, 2023" },
  { provider: "Bank of Industry", amount: "NGN 500,000", date: "20 Dec, 2023" },
  { provider: "Bank of Industry", amount: "NGN 500,000", date: "20 Dec, 2023" },
];

const FundingHistory: React.FC = () => {
  return (
    <>
      <h2 className="mt-12 text-base font-bold text-zinc-700 max-md:mt-10">Funding History</h2>
      {fundingData.map((record, index) => (
        <div key={index} className="flex flex-wrap gap-10 self-stretch py-4 pr-7 pl-3.5 mt-3.5 w-full rounded-lg bg-neutral-50 max-md:pr-5 max-md:max-w-full">
          <div className="flex gap-4">
            <div className="flex shrink-0 my-auto w-3 h-3 bg-teal-700 rounded-full" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-500">Provider:</span>
              <span className="mt-2 text-sm text-black">{record.provider}</span>
            </div>
          </div>
          <div className="flex flex-auto gap-10">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500">Amount</span>
              <span className="mt-2 text-sm font-bold text-black">{record.amount}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500">Date of Disbursement</span>
              <time className="mt-2 text-sm text-black" dateTime={record.date}>{record.date}</time>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FundingHistory;
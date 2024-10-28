import React from 'react';

const BioSection: React.FC = () => {
  return (
    <>
  <h2 className="text-base font-bold text-zinc-700">Bio</h2>
  <hr className="shrink-0 self-stretch mt-4 w-full h-0 border-neutral-200" />
  <div className="grid grid-cols-2 gap-y-4 -gap-x0 mt-3.5 text-xs text-zinc-700">
    <span className="font-medium">Date joined:</span>
    <time dateTime="2023-12-20">20 Dec, 2023</time>

    <span className="font-medium">Mobile Number:</span>
    <a href="tel:+2348100000000" className="text-emerald-600">+234 810 000 0000</a>

    <span className="font-medium">State of Residence:</span>
    <span>Kaduna</span>

    <span className="font-medium">Community:</span>
    <span>Birnin Gwari</span>
  </div>
</>

  );
};

export default BioSection;
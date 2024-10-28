import React from 'react';

const FundingInsight: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col justify-center py-px mt-9 rounded max-md:mt-10">
      <div className="flex flex-col pt-20 pr-3 pb9 pl-8 w-full bg-[url('/images/future.png')] bg-contain bg-no-repeat h-full max-md:pl-5">
      
      <div className="w-96 h-96"></div>
      
        {/* <div className="flex gap-1 items-start self-start text-2xl font-bold leading-6 text-white">
          <div className="flex relative z-10 flex-col self-start pt-0 pb-9 aspect-[1.164] w-[85px] max-md:pr-0">
            <img loading="lazy" src="/images/future.png" alt="Securing a green future" className="object-cover absolute inset-0 size-full" />
            Securing <br />a green{" "}
          </div>
          <img loading="lazy" src="/images/future.png" alt="" className="object-contain shrink-0 self-end mt-9 aspect-[1.16] w-[85px]" />
        </div>
        <div className="self-center mt-2 ml-3.5 text-4xl leading-tight text-amber-300">
          Future!
        </div> */}
      </div>
    </div>
  );
};

export default FundingInsight;
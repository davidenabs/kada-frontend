import React from 'react';

const PricingInfo: React.FC = () => {
    return (
        <>

            <div className='text-center flex flex-col justify-center'>
                <div className="gap-2.5 self-center p-2.5 mt-14 text-base font-medium rounded-md border border-solid border-stone-400 border-opacity-20 text-stone-900 text-opacity-90 max-md:mt-10 w-fit">
                    ₦15,000 per 0.5 hectares per Farming season
                </div>
                <p className="self-center mt-8 text-base font-medium leading-tight text-black text-opacity-60 max-md:max-w-full">
                    All features including Farm Mapping, Crop Calendar, Expense Tracker, Health Scanner and lots more.
                </p>
            </div>
        </>
    );
};

export default PricingInfo;
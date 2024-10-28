import React from 'react';
import DiscountTable from './discount-table';
import PriceCalculator from './calculator';
import PricingInfo from './info';


const LandPricing: React.FC = () => {
    return (
        <div>
            <PricingInfo />
            <div className="max-md:mr-0.5 max-md:max-w-full mt-24">
                <div className="flex gap-5 max-md:flex-col">
                    <DiscountTable />
                    <PriceCalculator />
                </div>
            </div>
        </div>
    );
};

const Stakeholders: React.FC = () => {
    return (
        <div>
            <div className=" mt-24 ml-10 max-w-full font-medium leading-tight text-center max-md:mt-10 flex flex-col items-center">
                <h2 className='font-bold mb-3'>Who is a Stakeholder?</h2>
                <div className='text-base font-thin space-y-3'>
                    <p>
                        You are a stakeholder if you manage, monitor or support other farmers. Examples we are cooperative societies, development partners (NGO, INGOS e.t.c).
                    </p>

                    <p>
                        with this account you can do this and Lorem ipsum do this and Lorem with this account you can do this and Lorem ipsum do this and Lorem with this account you can do this and Lorem ipsum do this and Lorem with this account you can do this and Lorem ipsum do this and Lorem
                    </p>
                </div>


                <div className="flex gap-3 items-center justify-between pl-5 mt-10 max-w-full bg-neutral-200 bg-opacity-30 rounded-[60px] w-[462px]">
                    <input type="text" placeholder='Let us understand your need' className='bg-transparent border-none outline-none border-transparent focus:border-transparent focus:ring-0 w-60' />
                    <button className="overflow-hidden gap-2.5 self-end items-end px-5 py-3.5 my-auto text-sm font-bold text-white bg-green-800 rounded-[60px] w-[152px]">
                        Get Started
                    </button>
                </div>
            </div>

        </div>
    );
};

export { LandPricing, Stakeholders };

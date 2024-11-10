"use client"
import { Brick } from '@/icons';
import React, { useState } from 'react';
import MarketDetails from './market-details';
import MarketMap from './market-map';
import MarketActions from './market-actions';


interface MarketInformationProps {
    showDetails: boolean;
}

const MarketInformation: React.FC<MarketInformationProps> = ({ showDetails }) => {
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  
    return (
        <section className="flex flex-col ml-5 w-[59%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-2.5 pt-2.5 leading-tight min-h-[638px] max-md:mt-7 max-md:max-w-full">
                <h2 className="overflow-hidden p-6 w-full text-lg font-semibold text-green-600 uppercase bg-white rounded-t-2xl border border-solid border-slate-100 max-md:px-5 max-md:max-w-full">
                    MARKET INFORMATION
                </h2>
                <div className="flex overflow-hidden flex-col justify-center px-6 py-6 w-full text-center bg-white rounded-b-2xl border border-solid border-slate-100 min-h-[558px] max-md:px-5 max-md:py-24 max-md:max-w-full">
                    <div className="flex flex-col w-full max-md:max-w-full">
                        {!showDetails ? (<div className="flex flex-col items-center w-full max-md:max-w-full">
                            <div className="flex flex-col justify-center max-w-full w-[362px]">
                                <Brick className="w-[137px] h-[137px] self-center " />
                                <div className="flex flex-col justify-center mt-3 w-full">
                                    <h3 className="text-lg font-bold text-green-800">
                                        No market information to show yet!
                                    </h3>
                                    <p className="mt-1 text-sm text-neutral-700">
                                        Select a market to see related information
                                    </p>
                                </div>
                            </div>
                        </div>) :
                            (<div className="flex overflow-hidden flex-col =">
                                <div className="max-md:max-w-full">
                                    <div className="flex gap-5 max-md:flex-col">
                                        <MarketDetails />
                                        <MarketMap />
                                    </div>
                                </div>
                                <MarketActions />
                            </div>)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketInformation;
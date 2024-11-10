import { MapNavIcon } from '@/icons';
import React from 'react';

interface MarketMapProps { }

const MarketMap: React.FC<MarketMapProps> = () => {
    return (
        <div className="flex flex-col ml-5 w-[44%] max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden flex-col justify-end p-px w-full rounded-lg border border-solid border-slate-100 text-neutral-700 max-md:mt-10">
                <img
                    loading="lazy"
                    src="/images/market-products.png"
                    className="object-contain w-full rounded-lg aspect-[1.62]"
                    alt="Map of Kaduna Central Market"
                />
                <div className="flex flex-col bg-white">
                    <div className="overflow-hidden px-3 py-5 text-xs leading-5 bg-white">
                        Kaduna Central Market Ahmadu Bello Way, Kaduna City, Kaduna State, Nigeria.
                    </div>
                    <button className="flex overflow-hidden flex-col justify-center px-px py-3 text-sm font-semibold leading-none text-center bg-gray-200 rounded-lg">
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex gap-2 justify-center items-center self-stretch my-auto min-w-[240px] w-[257px]">
                                    <span className="self-stretch my-auto">
                                        Get Direction
                                    </span>
                                    <MapNavIcon className="my-auto w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarketMap;
"use client"
import React, { useState } from 'react';

const PriceCalculator: React.FC = () => {
    const [hectares, setHectares] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);

    const calculatePrice = (value: number) => {
        let discountPercentage = 0;
        if (value >= 5 && value < 20) {
            discountPercentage = 2;
        } else if (value >= 20 && value < 100) {
            discountPercentage = 5;
        } else if (value >= 100 && value < 250) {
            discountPercentage = 7;
        }
        setDiscount(discountPercentage);

        const basePrice = 15000 * (value / 0.5);
        const discountedPrice = basePrice * (1 - discountPercentage / 100);
        setTotalCost(discountedPrice);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setHectares(value);
        calculatePrice(value);
    };

    return (
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden flex-col px-7 py-10 w-full font-medium leading-tight text-black border border-neutral-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <h2 className="self-start text-2xl max-md:ml-2">Price Calculator</h2>
                <label htmlFor="hectares" className="self-start mt-4 text-base max-md:ml-2">
                    Enter your farm size in hectares
                </label>
                <div className="flex overflow-hidden flex-col mt-6 w-full whitespace-nowrap rounded border[0.1px] border-solid border-slate-300 max-md:max-w-full">
                    <div className="flex overflow-hidden gap-5 justify-between items-start px-6 py-3.5 rounded border border-solid border-slate-300 max-md:px-5 max-md:max-w-full h[57px]">
                        <input
                            type="number"
                            id="hectares"
                            value={hectares}
                            onChange={handleInputChange}
                            className="flex flex-col self-start text-2xl bg-transparent border-none outline-none border-transparent focus:border-transparent focus:ring-0"
                            aria-label="Hectares input"
                        />
                        <div className="flex flex-col my-auto text-base">
                            <div>Hectares</div>
                        </div>
                    </div>
                </div>
                <div className="gap-2.5 self-start px-2.5 py-1 mt-2.5 text-sm text-teal-700 bg-emerald-50 rounded-lg">
                    {discount}% discount applied
                </div>
                <div className="mt-6 max-w-full w-full h-px bg-none"
                    style={{ background: 'repeating-linear-gradient(to right, black 0, black 10px, transparent 10px, transparent 20px)' }}
                />

                <div className="flex gap-5 justify-between mt-8 text-base max-md:max-w-full">
                    <div>Total Cost for 1 Season</div>
                    <div>{!isNaN(totalCost) ? totalCost.toFixed(2) : '0.00'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceCalculator;
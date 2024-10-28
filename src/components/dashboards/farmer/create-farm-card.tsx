"use client"
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import React, { useState } from 'react';

interface FarmCardProps {
    name: string;
    hectares: number;
    location: string;
    season: string;
    crops: string[];
}

const FarmCard: React.FC<FarmCardProps> = ({ name, hectares, location, season, crops }) => {
    return (
        <div className="flex overflow-hidden flex-col grow pt-28 text-sm font-light leading-none rounded-lg shadow-[10px_10px_30px_rgba(199,199,199,0.25)] max-md:pt-24 max-md:mt-9 bg-[url('/images/crop-thumb.png')] bg-norepeat bg-cov">
            <div className="flex overflow-hidden flex-col items-start px-4 py-5 w-full rounded-lg bg-zinc-50 max-md:pr-5">
                <h3 className="text-lg font-bold text-teal-700 max-md:ml-1">{name}</h3>
                <p className="mt-1 font-semibold uppercase text-neutral-500 max-md:ml-1">{hectares} Hectares</p>
                <p className="mt-6 leading-4 text-zinc-700 max-md:ml-1">{location}</p>
                <div className="flex gap-1.5 items-center mt-11 text-teal-700 max-md:mt-10">
                    <div className="flex shrink-0 self-stretch my-auto w-2 h-2 bg-teal-700 rounded-full" />
                    <p className="self-stretch my-auto">{season}</p>
                </div>
                <div className="flex gap-1.5 self-stretch mt-5 w-full text-black whitespace-nowrap max-md:mr-1">
                    {crops.map((crop, index) => (
                        <span key={index} className="gap-2.5 self-stretch px-2.5 py-1 rounded border-zinc-300 border-[0.5px]">
                            {crop}
                        </span>
                    ))}
                </div>
                <Link href="/dashboard/farmer/FGSC-Farm" className="self-end mt-8 text-green-800">View</Link>
            </div>
        </div>
    );
};

interface Farm {
    name: string;
    hectares: number;
    location: string;
    season: string;
    crops: string[];
}

interface FarmListProps {
    farms: Farm[];
}

const FarmList: React.FC<FarmListProps> = ({ farms }) => {
    return (
        <section className="flex flex-col rounded-none max-w-full">
            <div className="flex flex-col px-8 pt-9 pb-16 w-full bg-white rounded-3xl border border-solid border-teal-700 border-opacity-30 max-md:px-5 max-md:max-w-full ">
                <header className="flex flex-wrap gap-5 justify-between w-full font-bold text-black max-md:max-w-full">
                    <h2 className="flex gap-2 items-start text-lg leading-none">
                        Your farms <span>({farms.length})</span>
                    </h2>
                    <button className="text-sm leading-tight">See all</button>
                </header>
                <div className="mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col">
                        {farms.map((farm, index) => (
                            <div key={index} className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                                <FarmCard {...farm} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const farms = [
    {
        name: 'FGSC Farm',
        hectares: 234,
        location: 'Close to FGSC along, lorem ipsumn road, kaduna',
        season: 'Wet season',
        crops: ['Rice', 'Millet', 'Wheat'],
    },
    {
        name: 'FGSC Farm',
        hectares: 234,
        location: 'Close to FGSC along, lorem ipsumn road, kaduna',
        season: 'Wet season',
        crops: ['Rice', 'Millet', 'Wheat'],
    },
    {
        name: 'FGSC Farm',
        hectares: 234,
        location: 'Close to FGSC along, lorem ipsumn road, kaduna',
        season: 'Wet season',
        crops: ['Rice', 'Millet', 'Wheat'],
    },
];



const CreateFarmCard: React.FC = () => {
    const [isClick, setIsClick] = useState(false);

    if (isClick)
        return <FarmList farms={farms} />
    else
        return (
            <div className="flex flex-col grow justify-center items-center px-20 py-48 w-full bg-white rounded-3xl border border-solid border-teal-700 border-opacity-30 max-md:px-5 max-md:py-24 max-md:mt-5 max-md:max-w-full">
                <div className="flex flex-col items-center max-w-full w-[291px]">
                    <div className="flex flex-col items-center bg-green-100 rounded-full h-[76px] w-[76px]">
                        <img loading="lazy" src="/images/vector-moon.svg" alt="Create Farm Icon" className="object-contain w-full aspect-square" />
                    </div>
                    <div className="flex flex-col justify-center items-center self-stretch mt-4 leading-none text-black">
                        <h3 className="text-xl font-bold">You are yet to create a farm</h3>
                        <p className="mt-2 text-sm font-light">Farm information will appear here once created</p>
                    </div>
                    <button onClick={() => setIsClick(true)} className="flex gap-0.5 items-start mt-5 text-sm leading-none text-green-800">
                        <span>Create Farm</span>
                        <ArrowRightIcon className="w-4 h-4 fill-green-800" />
                    </button>
                </div>
            </div>
        );
};

export default CreateFarmCard;

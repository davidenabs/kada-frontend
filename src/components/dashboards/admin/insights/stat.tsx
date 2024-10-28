import React from 'react';

interface StatCardProps {
    title: string;
    count: number;
    bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, bgColor }) => {
    return (
        <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className={`flex overflow-hidden flex-col grow items-start pt-7 pr-3 pb-4 pl-7 w-full text-3xl font-bold leading-tight text-black rounded ${bgColor} max-md:pl-5 max-md:mt-5`}>
                <div className="z- mt-0">{count}</div>
                <div className="mt-2 text-base font-light">{title}</div>
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d4da2b843626f197c26d7518b76e15434422a1cf6b96f428448379abaab21a7?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" alt="" className="object-contain self-end aspect-square w-[18px]" />
            </div>
        </div>
    );
};

export default StatCard;
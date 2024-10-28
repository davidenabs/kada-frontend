import Input from '@/components/form/input';
import { SearchIcon } from '@/icons';
import React from 'react';

interface VendorProps {
    name: string;
    description: string;
    imageUrl: string;
}

const Vendor: React.FC<VendorProps> = ({ name, description, imageUrl }) => {
    return (
        <div className="flex gap-3 mt-8">
            <img loading="lazy" src={imageUrl} alt={`${name} thumbnail`} className="object-contain rounded-xl aspect-[1.29] w-[135px]" />
            <div className="flex flex-col my-auto text-sm leading-tight text-black">
                <div className="flex flex-col max-md:mr-1">
                    <div className="font-bold">{name}</div>
                    <div className="mt-1.5 font-light">{description}</div>
                </div>
                <div className="gap-2.5 self-start p-1 mt-3.5 font-light  text-sm whitespace-nowrap rounded bg-stone-50 border-[0.5px] border-zinc-400">
                    Available
                </div>
            </div>
        </div>
    );
};

const VendorList: React.FC = () => {
    const vendors = [
        { name: "MJ Sadir Enterprises", description: "Ferterlizer Depot", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d5fce550305ddf7e2e68ea414b889885ca020b10df55e35bd846e250a464c42?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" },
        { name: "Yohanna Enterprises", description: "Livestock feeds", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/65fc0ba1713f0925eb5cfc694e35ebfe73569066b68dad64676a4e9abddf2395?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" },
        { name: "MaiAgro", description: "Enginnering Services", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f9d0d2204361e122c58dfe8261cf6da0d0cfe6534757c5847cd7bf6e223c5da?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" },
        { name: "MaiAgro", description: "Enginnering Services", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f9d0d2204361e122c58dfe8261cf6da0d0cfe6534757c5847cd7bf6e223c5da?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" },
        { name: "MaiAgro", description: "Enginnering Services", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f9d0d2204361e122c58dfe8261cf6da0d0cfe6534757c5847cd7bf6e223c5da?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" },
    ];

    return (
        <div className="flex overflow-hidden gap-3 py-9 pr-1.5 pl-6 w-full bg-white rounded-3xl border border-solid border-neutral-300 shadow-[0px_0px_30px_rgba(189,189,189,0.25)] max-md:pl-5 max-md:mt-5">
            <div className="flex flex-col grow shrink-0 items-start basis-0 w-fit self-stretch">
                <h2 className="text-xl font-bold leading-tight text-green-800">Vendors</h2>

                <Input placeholder="Search for service provider" className='self-stretch !w-[333px] !py-3' suffix={<SearchIcon />} />
                <div className="self-stretch overflow-auto max-h-[552px]">
                    {vendors.map((vendor, index) => (
                        <Vendor key={index} {...vendor} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col justify-center py-52 my-auto rounded bg-neutral-100 max-md:py-24">
                <div className="flex shrink-0 h-6 rounded bg-zinc-300" />
            </div>
        </div>
    );
};

export default VendorList;
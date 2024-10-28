import React from 'react';
import Link from 'next/link';
import Button from '@/components/form/button';
import ProgressBar from '../cooperative/progress';
import FeatureCard from './steps/card';

const VendorWelcome: React.FC = () => {
    const features = [
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/990fb37ee8005e177b09d6559ffe2bdadb140b33507aad30aca08f465592b991?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
            title: "Mechanized Cultivation",
            price: "N15,000.00",
            unit: "Per hour"
        },
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d324aa61d088a5de5d8eba24be4e48c4365ca08b1405f69ab886ef98b8b78445?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
            title: "Add products and services and make them visible to farmers and cooperatives",
            description: "Add products and services and make them visible to farmers and cooperatives"
        }
    ];

    return (
        <div className="flex flex-col items-center rounded-none max-w-[882px] mx-auto">
            <header className="text-lg font-medium leading-tight text-black">
                Welcome, ABCD Enterprise
            </header>
            <h1 className="mt-7 text-2xl font-bold leading-7 text-center text-black w-[315px]">
                As a Vendor on Kada you do these and even more
            </h1>
            <section className="self-stretch mt-11 w-full max-md:mt-10 max-md:max-w-full bg-[url('/images/bdo.png')] bg-contain bg-no-repeat max-md:rounded-t-lg  rounded-lg overflow-hidden">
                <div className="flex gap-5 max-md:flex-col">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </section>
            <ProgressBar totalSteps={4} currentStep={3} />
            <Link href={'/account-setup/profile/data-enumerator/welcome/certificate'}>
                <Button className='!px-10 !py-3 mt-10 text-sm font-bold !w-fit !rounded-full'>Continue</Button></Link>
        </div>
    );
};

export default VendorWelcome;
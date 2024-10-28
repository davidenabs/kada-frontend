"use client"
import Button from '@/components/form/button';
import Input from '@/components/form/input';
import React from 'react';

const NimcVerification: React.FC = () => {

    return (
        <section className="flex overflow-hidden flex-col justify-center items-center px-10 py-12 bg-white rounded-lg border-[0.5px] border-zinc-400 border-opacity-50 max-w-[624px] max-md:px-5 mx-auto my-auto">
            <div className="flex flex-col items-center max-w-full w-[365px]">
                <img src="/images/nimc-logo.png" alt="NIMC Verification Logo" className="object-contain aspect-square w-[87px]" />

                <h2 className="text-2xl font-bold leading-tight text-zinc-700">
                    NIMC Verification
                </h2>

                <form className="flex flex-col self-stretch mt-11 w-full font-medium max-md:mt-10 max-md:max-w-full">

                    <div className="flex flex-col self-stretch">
                        <label htmlFor="dob" className="text-sm font-medium text-zinc-700 pb-1">What's your date of birth</label>
                        <Input type="date" id="dob" placeholder="What is your company name" className='!py-3  h-[40px]' />

                    </div>

                    <div className="flex flex-col mt-5 self-stretch">
                        <label htmlFor="dob" className="text-sm font-medium text-zinc-700 pb-1">Enter your NIN</label>
                        <Input type="number" id="dob" placeholder="11 digits" className='!py-3  h-[40px]' />

                    </div>

                </form>

                <Button className=' mt-8 !w-fit !py-3 !rounded-full !px-10'>Submit</Button>
            </div>
        </section>
    );
};

export default NimcVerification;
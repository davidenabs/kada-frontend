"use client"
import Button from '@/components/form/button';
import Input from '@/components/form/input';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CertificationLicensePayment: React.FC = () => {
    const [isPaid, setIsPaid] = useState(false);

    const router = useRouter()

    const route = '/dashboard/cooperative';

    if (isPaid)
        return (<section className="flex flex-col items-center font-bold rounded-none max-w-[467px] mx-auto">
            <h1 className="text-2xl leading-tight text-black">Payment Successful</h1>
            <p className="mt-3.5 text-lg font-medium leading-6 text-center text-zinc-700">
                Your payment for license was completed.
                <br />
                please proceed to dashboard
            </p>
            <img

                src="/images/payement-successful.png"
                alt="Payment success illustration"
                className="object-contain self-stretch mt-9 w-full aspect-[1.7]"
            />
            <Button
                className="!py-3 mt-14 !w-full min-h-[48px] !rounded-[60px]"
                handleClick={() => {
                    router.push(route);
                }}
            >
                Go to Dashboard
            </Button>
        </section>);

    else
        return (
            <section className="flex flex-col md:items-start items-center w-full md:text-left text-center pb-10">
                <h2 className="text-lg font-medium leading-tight text-tertiary-800 md:text-teal-700 uppercase text-center md:text-left">
                    CERTIFICATION & LICENSE
                </h2>
                <p className="mt-4 text-2xl font-bold leading-7 text-zinc-700 w[315px] md:w-[451px] max-md:max-w-full">
                    Please complete the following
                </p>
                <div className="self-stretch md:mt-12 w-full max-md:mt-5 max-md:max-w-full">
                    <div className="flex gap-5 flex-1 max-md:flex-col">
                        <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full ">
                            <div className="flex flex-col items-start py-10 px-6 mx-auto w-full text-sm font-medium leading-4 rounded-2xl border-[0.5px] bg-[#FCFCFC] border-[#D9D9D9] text-zinc-500 max-md:pr-5 max-md:mt-10 max-md:max-w-full">
                                <h3 className="text-lg font-bold leading-tight text-black">KADA Vendor License</h3>

                                <h3 className="text-lg self-end font-bold leading-tight text-primary-600 pt-3">N50,000.00</h3>


                                <div className="flex flex-col mt-5 self-stretch  whitespace-nowrap">
                                    <label htmlFor="phone" className="text-sm font-medium text-zinc-700 text-left">Name of Organization</label>

                                    <Input type="text" id="phone" placeholder="What is the name of your organization" className='!py-3 h-[40px] !border' />

                                </div>

                                <div className="flex flex-col mt-5 self-stretch  whitespace-nowrap">
                                    <label htmlFor="" className="text-sm font-medium text-zinc-700 text-left">When was it established</label>

                                    <Input type="date" id="" placeholder="What is the name of your organization" className='!py-3 h-[40px] !border' />

                                </div>

                                <div className="flex flex-col mt-5 self-stretch  whitespace-nowrap">
                                    <label htmlFor="phone" className="text-sm font-medium text-zinc-700  text-left">Are you fully registered with CAC</label>

                                    <Input type="text" id="phone" placeholder="What is the name of your organization" className='!py-3 h-[40px] !border' />

                                </div>

                                <Button handleClick={() => setIsPaid(true)} className="!py-3.5 mt-14 font-bold min-h-[48px] !rounded-[60px] max-md:px-5 max-md:mt-10 w-full">
                                    Pay N50,000.00
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col md:ml-5 w-[54%] max-md:ml-0 max-md:w-full">
                            <img

                                src="/images/vendor-cert.png"
                                alt="Certification and License illustration"
                                className="object-contain mt-4 w-full rounded-3xl aspect-[1.54] max-md:mt-8 max-md:max-w-full"
                            />

                            <div className='flex flex-col items-start mt-10 py-6 px-8 mx-auto w-full leading-5 text-[16px] rounded-3xl text-tertiary-700 font-thin max-md:pr-5 max-md:mt-10 max-md:max-w-full text-center bg-[#F7F7F7]'>
                                <p>Please note that license/certificate takes 24-48 hours for review and approval. Thank you</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        );
};

export default CertificationLicensePayment;
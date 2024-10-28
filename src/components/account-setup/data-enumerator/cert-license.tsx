"use client"
import Button from '@/components/form/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Title } from 'rizzui';

const CertificationLicense: React.FC = () => {
  const perks = [
    "Access to over 200+ organized cooperatives and farmers",
    "Access to over 200+ organized cooperatives and farmers",
    "Access to over 200+ organized cooperatives and farmers",
    "Access to over 200+ organized cooperatives and farmers"
  ];

  const router = useRouter();

  return (
    <section className="flex flex-col md:items-start items-center w-full md:text-left text-center pb-10">
      <h2 className="text-lg font-medium leading-tight text-tertiary-800 md:text-teal-700 uppercase text-center md:text-left">
        CERTIFCATION & LICENSE
      </h2>
      <p className="mt-4 text-2xl font-bold leading-7 text-zinc-700 w[315px] md:w-[451px] max-md:max-w-full">
        Get Licensed and Certified to trade on KADA, earn more with over 200+ farmer and cooperative on board
      </p>
      <div className="self-stretch md:mt-12 w-full max-md:mt-5 max-md:max-w-full">
        <div className="flex gap-5 flex-1 max-md:flex-col">
          <div className="md:flex flex-col w-[46%] max-md:ml-0 max-md:w-full hidden">
            <div className="flex flex-col items-start py-10 px-16 mx-auto w-full text-sm font-medium leading-4 rounded-2xl border-[0.5px] bg-[#FCFCFC] border-[#D9D9D9] text-zinc-500 max-md:pr-5 max-md:mt-10 max-md:max-w-full">
              <h3 className="text-lg font-bold leading-tight text-black">PERKS</h3>
              {perks.map((perk, index) => (
                <p key={index} className="self-stretch mt-5 max-md:ml-2">
                  &bull; {perk}
                </p>
              ))}
              <Button handleClick={() => router.push('/account-setup/profile/data-enumerator/welcome/payment')} className="!py-3.5 mt-14 font-bold min-h-[48px] !rounded-[60px] max-md:px-5 max-md:mt-10 w-full">
                Apply for License
              </Button>
            </div>
          </div>
          <div className="flex flex-col md:ml-5 w-[54%] max-md:ml-0 max-md:w-full">
            <img

              src="/images/vendor-cert.png"
              alt="Certification and License illustration"
              className="object-contain mt-4 w-full rounded-3xl aspect-[1.54] max-md:mt-8 max-md:max-w-full"
            />
          </div>

          <div className='md:hidden'>
            <div className='flex flex-col items-start py-6 px-8 mx-auto w-full text-sm font-medium leading-4 rounded-2xl border-[0.5px] bg-[#FCFCFC] border-[#D9D9D9] text-zinc-500 max-md:pr-5 max-md:mt-10 max-md:max-w-full'>
              <Title as="h3" className='text-tertiary-800'>PARKS</Title>
            </div>
            <Button handleClick={() => router.push('/account-setup/profile/data-enumerator/welcome/payment')} className="!py-3.5 mt-14 font-bold min-h-[48px] !rounded-[60px] max-md:px-5 max-md:mt-10 w-full">
              Apply for License
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationLicense;
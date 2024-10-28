import React from 'react';
import InterventionCard from './intervention-card';
import { ChevronRightIcon } from '@/icons';

interface InterventionData {
  title: string;
  date: string;
  amount: string;
  imageUrl: string;
}

const interventionData: InterventionData[] = [
  {
    title: 'World food programme',
    date: '22, January 2023',
    amount: 'NGN 12,000,000',
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5d08c27d5005832fec8780ed1bedbbd47b873100a33f984eb7ffd5abbabcb95f?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3',
  },
  {
    title: 'World food programme',
    date: '22, January 2023',
    amount: 'NGN 12,000,000',
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5d08c27d5005832fec8780ed1bedbbd47b873100a33f984eb7ffd5abbabcb95f?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3',
  },
  {
    title: 'World food programme',
    date: '22, January 2023',
    amount: 'NGN 12,000,000',
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5d08c27d5005832fec8780ed1bedbbd47b873100a33f984eb7ffd5abbabcb95f?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3',
  },
];

const InterventionProgrammes: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-md:mt-5 max-md:max-w-full">
      <div className="max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden flex-col grow items-start pt-7 pr-3 pb-4 pl-7 w-full leading-tight text-black bg-white border-[0.5px] border-zinc-200 rounded-lg shadow-lg max-md:pl-5 max-md:mt-5">
              <div className="text-3xl font-bold">12</div>
              <div className="mt-2 text-base font-light">Intervention Programmes</div>
              <ChevronRightIcon className="self-end aspect-square w-3 h-3" />
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden flex-col grow items-start pt-7 pr-3 pb-4 pl-7 w-full leading-tight text-black whitespace-nowrap bg-white border-[0.5px] border-zinc-200 rounded-lg shadow-lg max-md:pl-5 max-md:mt-5">
              <div className="text-3xl font-bold">1223</div>
              <div className="mt-2 text-base font-light">Beneficiary</div>
              <ChevronRightIcon className="self-end aspect-square w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-7 py-6 px-6 mt-6 max-w-full bg-white border-[0.5px] border-zinc-200 rounded-lg shadow-lg w[578px] max-md:pl-5 max-md:mr-0.5">
        <div className="flex flex-col grow shrink-0 leading-tight basis-0 w-fit max-md:max-w-full">
          <div className="flex gap-10 items-end max-md:max-w-full">
            <div className="flex flex-col self-stretch">
              <div className="self-start text-sm text-black">Interventions</div>
              {interventionData.map((intervention, index) => (
                <InterventionCard key={index} {...intervention} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col self-start pt-36 pb-16 rounded-lg bg-zinc-100 max-md:pt-24">
          <div className="flex shrink-0 bg-teal-700 rounded-lg h-[22px]" />
        </div>
      </div>
    </div>
  );
};

export default InterventionProgrammes;
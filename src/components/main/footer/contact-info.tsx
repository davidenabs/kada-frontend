import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/16/solid';
import React from 'react';

interface ContactItem {
  icon: React.ReactNode;
  text: string;
}

const contactItems: ContactItem[] = [
  { icon: <EnvelopeIcon className='h-4 w-4' />, text: "kadphq@yahoo.com," },
  { icon: <EnvelopeIcon className='h-4 w-4' />, text: "muhammad.rii@kdsg.gov.ng" },
  { icon: <PhoneIcon className='h-4 w-4' />, text: "+2348091947789" },
  { icon: <PhoneIcon className='h-4 w-4' />, text: "+2348023023039" }
];

const ContactInformation: React.FC = () => {
  return (
    <div className="flex relative flex-col items-start pt-3 pr-11 pb-16 pl-5 max-w-full text-sm leading-snug rounded-lg bg-teal-700 bg-opacity-80 w-[279px] max-md:pr-5">
      <h3 className="text-base font-bold leading-tight text-amber-300">Contact Information</h3>
      {contactItems.map((item, index) => (
        <div key={index} className="flex gap-4 items-center mt-6 tracking-wide whitespace-nowrap">
          {item.icon}
          <p className="basis-auto">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactInformation;
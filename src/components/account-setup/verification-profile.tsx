"use client"
import Button from '@/components/form/button';
import { useRouter } from 'next/navigation';
import React from 'react';

interface VerificationOptionProps {
    imageSrc: string;
    title: string;
    description: string;
    id: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const VerificationOption: React.FC<VerificationOptionProps> = ({ imageSrc, title, description, id, isSelected, onSelect }) => {
    return (
        <button
            onClick={() => onSelect(id)}
            className={`flex overflow-hidden gap-3.5 self-stretch py-5 pr-9 pl-4 mt-4 rounded-lg ${isSelected ? 'bg-white border border-teal-700 border-solid' : 'bg-neutral-50'} max-md:pr-5 transition-all ease-in-out`}>
            <img src={imageSrc} alt={`${title} icon`} className="object-contain shrink-0 aspect-square w-[62px]" />
            <div className="flex flex-col self-start items-start mt-1.5">
                <h3 className={`self-start text-base font-bold leading-tight ${isSelected ? 'text-green-800' : 'text-zinc-700'}`}>
                    {title}
                </h3>
                <p className="text-xs font-medium text-left tracking-wide leading-4 text-zinc-600">
                    {description}
                </p>
            </div>
        </button>
    );
};

interface VerificationData {
    id: string;
    imageSrc: string;
    title: string;
    description: string;
}

const VerificationProfile: React.FC = () => {
    const verificationOptions: VerificationData[] = [
        {
            id: "nimc",
            imageSrc: "/images/nimc-logo.png",
            title: "NIMC Verification",
            description: "Verify your profile by providing your NIMC capture data"
        },
        {
            id: "bio",
            imageSrc: "/images/bio.png",
            title: "Biometric Verification",
            description: "Verify your profile by biometric validation"
        }
    ];

    const [activeType, setActiveType] = React.useState("nimc");
    const router = useRouter();

    return (
        <section className="flex overflow-hidden flex-col justify-center items-center px-20 py-12 bg-white rounded-lg border-[0.5px] border-zinc-400 border-opacity-50 max-w-[624px] max-md:px-5 mx-auto my-auto">
            <div className="flex flex-col items-center max-w-full w-[365px]">
                <h2 className="text-2xl font-bold leading-tight text-zinc-700">
                    Verify your profile!
                </h2>
                <p className="mt-3.5 text-sm font-medium leading-relaxed text-center text-zinc-500">
                    How would you like to be verified?
                </p>
                {verificationOptions.map((option, index) => (
                    <VerificationOption
                        key={index}
                        imageSrc={option.imageSrc}
                        title={option.title}
                        description={option.description}
                        id={option.id}
                        isSelected={option.id === activeType}
                        onSelect={setActiveType}
                    />
                ))}

                <Button handleClick={() => router.push('/account-setup/profile/nimc')} className=' mt-8 !w-fit !py-3 !rounded-full !px-10'>Continue</Button>
            </div>
        </section>
    );
};

export default VerificationProfile;
import React from 'react';

export interface InfoCardProps {
    iconSrc: string;
    title: string;
    description: string;
    extraImage?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ iconSrc, title, description }) => {
    return (
        <div className="flex flex-col w[33%] min-h-[327px] max-md:ml-0 w-full z-10">
            <div className="flex overflow-hidden relative flex-col items-start px-8 pt-7 pb-20 w-full bg-white rounded-lg max-md:px-5 max-md:mt-8">
                <img src={iconSrc} alt="" className="object-contain rounded-md aspect-[1.11] w-[50px]" />
                <h2 className="mt-4 text-xl font-bold leading-none text-zinc-700">{title}</h2>
                <p className="self-stretch mt-8 text-xs font-thin leading-6 text-tertiary-700">{description}</p>
            </div>
        </div>
    );
};

interface WhatWeStandForProps {
    title: string;
    logoSrc: string;
    cards: InfoCardProps[];
}

const WhatWeStandFor: React.FC<WhatWeStandForProps> = ({ title, logoSrc, cards }) => {
    return (
        <section className="app_container relative py-[123px] md:py-[165px] items-center flex flex-col md:flex-row bg-slate-800 bg-[url('/images/what-we-stand-for.png')] bg-cover bg-center ">
            <div className="flex flex-col w-full max-md:max-w-full">
                <div className=" max-w-full text-3xl font-bold leading-none text-center text-white max-md:hidden">
                    <img src={logoSrc} alt="" className="object-contain w-52 aspect-[2.5] absolute -left-5 " />
                    <h1 className="self- text-center mt16 max-md:mt-10">{title}</h1>
                </div>
                <div className=" mt-20 mb-0 w-full max-md:mt-0 max-md:mb-2.5 max-md:max-w-full">
                    <div className="flex max-md:gap-0 gap-5 max-md:flex-col">
                        {cards.map((card, index) => (
                            <InfoCard key={index} {...card} />
                        ))}
                    </div>
                </div>

                <img src={"/images/what-we-stand-for-vector.svg"} alt="" className="object-contain self-end max-w-full aspect-[1.63] w-[130px] absolute bottom-[225px] max-md:hidden" />
            </div>
        </section>
    );
};

export default WhatWeStandFor;
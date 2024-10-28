"use client"
import React, { useState } from "react";
import {
    CooperativesSection,
    FarmerSection,
    IndividualsSection,
    KadunaSection,
    NationalDevelopmentSection
} from "./contents";
import CategoryButtons from "./category";


const AboutKada: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>("farmers");

    return (
        <div className="app_container overflow-x-hidden pt-[123px] md:py-[165px] relative bg-[#fefffd]">
            <img src="/images/woman-baby.png" alt="" className="w-[736.29px] h-[635.14px] absolute -right-[370px] top-56 z-10 max-md:hidden" />
            <div className="flex flex-col">
                <div className="flex relative max-md:pb-10 pb-20 flex-col items-center self-center leading-none text-center max-md:max-w-[335px]">
                    <div className="text-xl font-semibold text-green-600 uppercase">About Kada</div>
                    <div className="mt-6 text-2xl md:text-3xl font-bold text-zinc-700 max-md:max-w-full">Fostering growth and development for all</div>
                </div>
                <div className=" self-end mb-0 w-full max-md:mb-2.5 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col items-center w-full">
                        <CategoryButtons activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

                        {activeCategory === "farmers" && <FarmerSection />}
                        {activeCategory === "individuals" && <IndividualsSection />}
                        {activeCategory === "cooperatives" && <CooperativesSection />}
                        {activeCategory === "kaduna" && <KadunaSection />}
                        {activeCategory === "nationalDevelopment" && <NationalDevelopmentSection />}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutKada;

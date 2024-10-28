import React from "react";
import Button from "@/components/form/button";

const FosteringSection: React.FC = () => {
    return (
        <div className="app_container pt-[123px] md:py-[165px] overflow-x-hidden items-center flex flex-col md:flex-row relative bg-[#fefffd]  w-full  max-md:px-5 ">
            <div className="absolute bg-[#F2F9F5] w-[1871.08px] h-[652.1px] left-[-283px] top-[50px] rotate-[10deg] rounded-[50%]"></div>

            <div className="flex gap-20 max-md:flex-col">
                <div className="flex flex-col md:w-[32%] w-full">
                    <div className="flex relative flex-col   max-md:text-center items-center md:items-start my-auto md:w-full font-bold max-md:mt-10 mx-auto w-[345px]">
                        <h1 className="text-2xl md:text-3xl leading-8 text-tertiary-700 md:w-[279px]">
                            Fostering growth and development for all categories
                        </h1>
                        <p className="mt-9 text-base leading-6 text-tertiary-700 font-thin">
                            Development Agency paves the way for a sustainable future in Kaduna. Kaduna State Agricultural Development Agency paves the way for a sustainable future in Kaduna.
                        </p>
                        <Button className=" mt-12  max-md:mt-10 !w-fit !rounded-full !py-3 !px10">
                            Sign up now
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col md:ml-5 md:w-[68%] max-md:ml-0 max-md:w-full max-md:-mt-20">
                    <div className="relative grow max-md:mt-0 max-md:max-w-full">
                        <div className="flex gap-5 ">
                            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                                <img src="/images/fostering-g-1.png" alt="Agricultural development visual" className="object-contain grow w-full aspect-[0.7] max-md:mt-9 rounded-[32px]" />
                            </div>
                            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                                <img src="/images/fostering-g-2.png" alt="Sustainable farming practices" className="object-contain grow w-full aspect-[0.7] rounded-[32px] max-md:mt-9" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FosteringSection;

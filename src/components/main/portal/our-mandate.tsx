import React from "react";

const OurMandate = () => {
    return (
        <div className="app_container py-[123px] md:py-[165px] items-center flex flex-col md:flex-row relative bg-[#fefffd] max-md:border-b-0 border-b-[12px] border-[#0BCE6B]">
            <img src="/images/vector-leaf-bg.svg" className="absolute top-44 -left-28 w-[523px] hidden md:block" alt="" />
            <div className="flex max-md:flex-col max-md:justify-center max-md:text-center justify-around items-center pt-1 w-full">
                <div className="md:w-[450px]">
                    <h3 className="text-primary-400 font-normal">OUR MANDATE</h3>
                    <h2 className="font-extrabold text-black text-2xl mt-4">Fostering growth and<br></br>development for all</h2>
                </div>

                <div className="flex gap-10 max-md:flex-col justify-around items-center wfull mt-11">
                    {/* First image item */}
                    <div className="flex justify-center flex-col bg-white rounded-lg shadow-lg p-3">
                        <div className="relative flex justify-center items-center">
                            <img src="/images/uba.png" alt="img-2" className="rounded-lg w-[371px] h-[396px]" />
                        </div>

                        <div className="pt-1 flex flex-col text-sm pl-4">
                            <span className="font-bold">His Excellence</span>
                            <span className="text-green-700 font-bold">UBA SANI</span>
                            <p className="text-tertiary-400 font-thin">Executive Governor
                                of Kaduna State</p>
                        </div>
                    </div>

                    <div className="flex justify-center flex-col bg-white rounded-lg shadow-lg p-3">
                        <div className="relative flex justify-center items-center">
                            <img src="/images/rili.png" alt="img-2" className="rounded-lg w-[371px] h-[396px]" />
                        </div>

                        <div className="pt-1 flex flex-col text-sm pl-4">
                            <span className="font-bold">His Excellence</span>
                            <span className="text-green-700 font-bold">UBA SANI</span>
                            <p className="text-tertiary-400 font-thin">Executive Governor
                                of Kaduna State</p>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default OurMandate;
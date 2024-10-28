import React from "react";

const OurMandate = () => {
    return (
        <div className="app_container py-[123px] md:py-[165px] items-center flex flex-col md:flex-row relative bg-[#fefffd] max-md:border-b-0 border-b-[12px] border-[#0BCE6B]">
        <img src="/images/vector-leaf-bg.svg" className="absolute -top-10 right-28 w-[523px] hidden md:block" alt="" />
        <div className="flex max-md:flex-col max-md:justify-center max-md:text-center justify-around items-center pt-1 w-full">
            <div className="md:w-[450px]">
                <h3 className="text-primary-400 font-bold">OUR MANDATE</h3>
                <h2 className="font-extrabold text-black text-2xl mt-4">To Pave way for
                    <br />a sustainable future for<br /> Agriculture</h2>
                <p className="mt-5 text-sm leading-6 text-gray-400"> Kaduna State  Agricultural Development<br /> Agency paves the way for a sustainable <br />future in Kaduna.</p>
            </div>

            <div className="flex gap-10 max-md:flex-col justify-around items-center wfull mt-11">
                {/* First image item */}
                <div className="text-center flex justify-center flex-col items-center">
                    <div className="relative flex justify-center items-center">
                        <img src="/images/vector-bg.png" alt="img-1" className="rounded-full w-[250px] mb-0" />

                        <img src="/images/uba.png" alt="img-2" className="rounded-full w-[184px] h-[184px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-0" />
                    </div>

                    <div className="pt-6 max-w-[148px] items-center">
                        <span>UBA SANI</span>
                        <p className="text-tertiary-400 text-sm ">Executive Governor
                            of Kaduna State</p>
                    </div>
                </div>

                <div className="text-center flex justify-center flex-col items-center">
                    <div className="relative flex justify-center items-center">
                        <img src="/images/vector-bg.png" alt="img-1" className="rounded-full w-[250px] mb-0" />

                        <img src="/images/rili.png" alt="img-2" className="rounded-full w-[184px] h-[184px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-0" />
                    </div>

                    <div className="pt-6 max-w-[332px] items-center">
                        <span>MUHAMMAD RILI ESQ</span>
                        <p className="text-tertiary-400 text-sm ">General Manager, Kaduna State Agricultural 
                        Development Authority</p>
                    </div>
                </div>

               
            </div>
        </div>
    </div>

    )
}

export default OurMandate;
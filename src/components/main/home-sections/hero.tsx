import Link from "next/link";
import React from "react";
import { Title } from "rizzui";

const MainHero = () => {
    return (
        <div
            className="pt-[123px] md:pt-[165px] app_container h-[694px] md:h-[844px] items-center flex flex-col md:flex-row"
            style={{
                backgroundImage: `url("/images/bg.png")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center", // Ensure image is centered
            }}
        >
            <main className="flex md:justify-between  justify-center  my-auto w-full flex-col md:flex-row md:text-left text-center">
                <section className="flex flex-col max-md:max-w-full ">
                    <Title as="h1" className="text-base font-normal md:text-xl leading-none text-center text-white uppercase maxmd:mr-2.5 max-md:max-w-full">
                        For food security and national development
                    </Title>
                    <Title as="h2" className="mt-16 md:mt-8 font-normal md:text-5xl tracking- leading-[50px] text-white  max-md:text-3xl max-md:leading-10 font- w[343px] md:w-[504px]">
                        Transforming{" "}
                        <span className=" text-secondary-500">Kaduna</span>
                        {" "}
                        through Food Security and National Development
                    </Title>

                    <div className="flex gap-3 md:mt-16 justify-center md:justify-start max-w-full text-sm leading-tight w-full md:w-[316px] max-md:mt-24">
                        <Link
                            href="#"
                            className="overflow-hidden gap-2.5 self-stretch px-5 py-3.5 text-white bg-primary-600 rounded-[60px] shadow-[0px_4px_16px_rgba(0,165,81,0.39)] w-[152px] text-center"
                            role="button"
                        >
                            Visit Kada Portal
                        </Link>
                        <Link
                            href="#"
                            className="overflow-hidden gap-2.5 self-stretch px-5 py-3.5 text-black whitespace-nowrap bg-white rounded-[60px] w-[152px] text-center"
                            role="button"
                        >
                            Explore
                        </Link>
                    </div>
                </section>
                <p className="my-auto text-base leading-6 text-white w-[339px] hidden md:block">
                    Kaduna State Agricultural Development Agency paves the way for a sustainable future in Kaduna.
                </p>
            </main>
        </div>
    )
}

export default MainHero;
import ContactUs from "@/components/main/home-sections/contact";
import Highlights from "@/components/main/home-sections/highlight";
import Statistics from "@/components/main/home-sections/statistics";
import WhatWeStandFor from "@/components/main/home-sections/what-we-stand-for";
import AboutKada from "@/components/main/portal/about-kada";
import OurMandate from "@/components/main/portal/our-mandate";
import Link from "next/link";

const PortalLandingPage = () => {

    const whatWeStandForData = {
        title: "What We Stand for",
        logoSrc: "/images/vector-slash-lines.svg",
        cards: [
            {
                iconSrc: "/images/policy-statement.svg",
                title: "POLICY STATEMENT",
                description: "To ensure sustained growth in the agricultural Sector of Kaduna State through multi-Stakeholders' approach for attainment of food and nutrition security, meet industrial demand and stimulate employment"
            },
            {
                iconSrc: "/images/vision.svg",
                title: "VISION",
                description: "To ensure sustained growth in the agricultural Sector of Kaduna State through multi-Stakeholders' approach for attainment of food and nutrition security, meet industrial demand and stimulate employment"
            },
            {
                iconSrc: "/images/mission.svg",
                title: "MISSION",
                description: "To ensure sustained growth in the agricultural Sector of Kaduna State through multi-Stakeholders' approach for attainment of food and nutrition security, meet industrial demand and stimulate employment",
                extraImage: "/images/vector-cloud.svg",
            }
        ]
    };

    return (
        <>

            <section className="flex flex-col text-xl rounded-none">
                <div className="flex overflow-hidden relative flex-col justify-center items-center px-20 py-60 w-full min-h-[840px] max-md:px-5 max-md:py-24 max-md:max-w-full">
                    <img loading="lazy" src={'/images/portal-hero-bg.png'} alt="" className="object-cover absolute inset-0 size-full" />
                    <div className="flex relative flex-col mb-0 max-w-full w-[609px] max-md:mb-2.5">
                        <p className="self-center leading-none text-center uppercase text-white text-opacity-50 max-md:max-w-full">
                            For food security and national development
                        </p>
                        <h1 className="mt-10 text-5xl font-semibold tracking-tighter text-center text-white leading-[53px] max-md:max-w-full max-md:text-4xl max-md:leading-[49px]">
                            Transforming Kaduna through Agricultural Excellence
                        </h1>
                        <p className="mt-7 leading-7 text-center text-white max-md:mr-1.5 max-md:max-w-full">
                            Kaduna State Agricultural Development Agency paves the way for a sustainable future in Kaduna.
                        </p>
                        <div className="flex gap-3 self-center mt-14 max-w-full text-sm font-bold leading-tight w-[316px] max-md:mt-10">
                            <Link href="/sign-in" className="overflow-hidden gap-2.5 self-stretch px-5 py-3.5 text-white border border-white border-solid shadow-lg rounded-[60px]">
                                Visit Kada Portal
                            </Link>
                            <a href="#" className="overflow-hidden gap-2.5 self-stretch px-5 py-3.5 text-green-800 whitespace-nowrap bg-white rounded-[60px]">
                                Explore
                            </a>
                        </div>
                    </div>
                </div>

                <OurMandate />
                <WhatWeStandFor {...whatWeStandForData} />
                <AboutKada />
                <Statistics />
                <Highlights />

                <ContactUs />
            </section>
        </>
    );
}

export default PortalLandingPage;
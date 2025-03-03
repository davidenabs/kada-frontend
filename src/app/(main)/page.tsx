import AboutKada from "@/components/main/home-sections/about";
import ContactUs from "@/components/main/home-sections/contact";
import FosteringSection from "@/components/main/home-sections/fostering";
import MainHero from "@/components/main/home-sections/hero";
import Highlights from "@/components/main/home-sections/highlight";
import OurMandate from "@/components/main/home-sections/our-mandate";
import Statistics from "@/components/main/home-sections/statistics";
import WhatWeStandFor from "@/components/main/home-sections/what-we-stand-for";
import { whatWeStandForData } from "@/lib/other-data";
import React from "react";

const Home = () => {
  return (
    <>
      <MainHero />
      <OurMandate />
      <WhatWeStandFor {...whatWeStandForData} />
      <AboutKada />
      <FosteringSection />
      <Statistics />
      <Highlights />
      <ContactUs />
    </>
  );
};

export default Home;

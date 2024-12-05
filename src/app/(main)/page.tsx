import AboutKada from "@/components/main/home-sections/about";
import ContactUs from "@/components/main/home-sections/contact";
import FosteringSection from "@/components/main/home-sections/fostering";
import MainHero from "@/components/main/home-sections/hero";
import Highlights from "@/components/main/home-sections/highlight";
import OurMandate from "@/components/main/home-sections/our-mandate";
import Statistics from "@/components/main/home-sections/statistics";
import WhatWeStandFor from "@/components/main/home-sections/what-we-stand-for";
import React from "react";

const Home = () => {
  const whatWeStandForData = {
    title: "What We Stand for",
    logoSrc: "/images/vector-slash-lines.svg",
    cards: [
      {
        iconSrc: "/images/policy-statement.svg",
        title: "POLICY STATEMENT",
        description:
          "To ensure sustained growth in the agricultural Sector of Kaduna State through multi-Stakeholders' approach for attainment of food and nutrition security, meet industrial demand and stimulate employment",
      },
      {
        iconSrc: "/images/vision.svg",
        title: "VISION",
        description:
          "To make agri-business the leading contributor to the Kaduna State Economy",
      },
      {
        iconSrc: "/images/mission.svg",
        title: "MISSION",
        description:
          "To provide an enabling environment for agri business development through the efficient management of abundant human and natural resources, deployment of improved technologies and market facilitation for an inclusive, sustainable and profitable agricultural enterprise",
        extraImage: "/images/vector-cloud.svg",
      },
    ],
  };
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

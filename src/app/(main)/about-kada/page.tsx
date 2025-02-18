import CommunityAids from "@/components/main/about-sections/committee-aid";
import FarmManagementFeatures from "@/components/main/about-sections/farm-management";
import ForIndividuals from "@/components/main/about-sections/for-individuals";
import Statistics from "@/components/main/home-sections/statistics";
import React from "react";

const About = () => {
  return (
    <main className="bg-primary-400/20">
      <div className="flex overflow-hidden flex-col pt-[73px] md:pt-[65px]">
        <img
          src={"/images/header-banner.png"}
          alt={"alt"}
          className="object-contain w-full aspect-[7.41] max-md:max-w-full"
        />
      </div>

      <section className="app_container flex flex-col rounded-none pt-[83px] md:pt-[105px]">
        <div className="flex flex-col self-center max-w-full w-[828px]">
          <h2 className="self-center text-3xl font-bold leading-tight text-green-800">
            About Kada
          </h2>
          <div className="mt-9 text-xl leading-6 text-center text-zinc-700 max-md:max-w-full space-y-5">
            <p>
              The Kaduna Agricultural Development Agency (KADA) is dedicated to
              driving agricultural transformation in Kaduna State by promoting
              sustainable practices, enhancing productivity, and empowering
              farmers. With a focus on modern farming techniques, capacity
              building, and value chain development, KADA works to unlock
              agriculture's potential as a catalyst for economic growth, food
              security, and rural development.
            </p>
            <p>
              Through strategic partnerships and innovative programs, KADA
              fosters an enabling environment where agriculture thrives as both
              a business and a means of livelihood. By prioritizing
              sustainability and climate-smart practices, the agency ensures
              long-term food security while contributing significantly to the
              well-being of Kaduna State’s people and the overall growth of its
              economy.
            </p>
          </div>
        </div>
        <div className="flex justify-center  mt-10 w-full">
          <div className="w-[65%] max-md:w-full">
            <img
              src="/images/two-wemen-farming.png"
              alt="Kaduna State Agricultural Development Agency"
              className="object-contain w-full aspect-[2.09] rounded-[32px] max-md:mt-10 max-md:max-w-full"
            />
          </div>
        </div>
      </section>

      <Statistics hasBg={false} />

      <section className="app_container py-[123px] md:py-[165px] flex flex-col rounded-none">
        <div className="flex flex-col self-center max-w-full w-[828px]">
          <h2 className="self-center text-3xl font-bold leading-tight text-[#F2A50C]">
            FOREWORD
          </h2>
          <div className="mt-9 text-xl font-thin leading-6 text-center text-zinc-700 max-md:max-w-full space-y-5">
            <p>
              The Kaduna State Agricultural Development Agency (KADA) is a
              beacon of innovation, resilience, and growth in the agricultural
              sector of Kaduna State. Established to advance agricultural
              practices, empower farmers, and ensure food security, KADA has
              consistently worked to transform agriculture into a viable tool
              for economic development and social progress.
            </p>

            <p>
              Agriculture is more than just an economic activity; it is the
              backbone of our communities and the pathway to prosperity for
              millions of households in Kaduna State. KADA is dedicated to
              fostering sustainable agricultural systems by introducing modern
              techniques, supporting smallholder farmers, and promoting
              market-oriented farming.
            </p>

            <p>
              Under the guidance of His Excellency, Senator Uba Sani, Governor
              of Kaduna State, KADA has championed several impactful
              initiatives. These include the Free Fertilizer Distribution
              Program, the Dry Season Farming Revitalization Initiative, and
              strategic Public-Private Partnerships designed to create value
              across agricultural value chains. We have consistently prioritized
              solutions that ensure growth and sustainability.
            </p>

            <p>
              KADA remains committed to inclusivity, transparency, and
              sustainability in its operations. By engaging with farmers,
              stakeholders, and partners, we are building a future where
              agriculture serves as the engine for economic diversification and
              a means of uplifting rural communities and most importantly
              guarantees food security.
            </p>

            <p>
              Our focus extends beyond production to include capacity-building,
              market access, and the adoption of climate-smart agricultural
              practices. We believe in harnessing innovation to tackle
              challenges, improve resilience, and unlock the immense potential
              within our agricultural sector.
            </p>

            <p>
              As the General Manager of KADA, I invite all stakeholders—farmers,
              investors, researchers, and policymakers—to collaborate with us in
              achieving our shared vision of an agriculturally prosperous Kaduna
              State. Together, we can create a future where agriculture serves
              as a beacon of progress and prosperity for all.
            </p>

            <p>Thank you for your continued support and partnership.</p>
          </div>
        </div>
      </section>
      <ForIndividuals />
      <FarmManagementFeatures />
      <CommunityAids />
    </main>
  );
};

export default About;

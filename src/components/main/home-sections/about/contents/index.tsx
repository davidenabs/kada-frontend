import React from "react";

const FarmerSection: React.FC = () => (
  <div className="flex flex-col ml-5 w-[54%] max-md:ml-0 max-md:w-full">
    <div className="flex relative flex-col items-start self-stretch px-20 py-12 my-auto w-full rounded-3xl bg-[#F8F8F8] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="text-lg font-semibold leading-snug text-green-600">
        FARMERS
      </div>
      <h2 className="mt-6 text-xl font-bold leading-none text-zinc-700">
        Empowering Farmers for Best Productivity
      </h2>
      <div className="self-stretch mt-7 text-base font-thin space-y-10 leading-6 text-tertiary-700 max-md:max-w-full">
        <p>
          KADA empowers farmers through capacity-building programs, access to
          quality inputs, credit facilities, and market linkages. By adopting
          modern technologies, climate-smart practices, and innovative tools, we
          help farmers improve productivity, resilience, and profitability.
        </p>
      </div>
    </div>
  </div>
);

const IndividualsSection: React.FC = () => (
  <div className="flex flex-col ml-5 w-[54%] max-md:ml-0 max-md:w-full">
    <div className="flex relative flex-col items-start self-stretch px-20 py-12 my-auto w-full rounded-3xl bg-[#F8F8F8] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="text-lg font-semibold leading-snug text-green-600">
        PROCESSORS & MARKETERS
      </div>
      <h2 className="mt-6 text-xl font-bold leading-none text-zinc-700">
        Empowering Individuals for a Better Future
      </h2>
      <div className="self-stretch mt-7 text-base font-thin space-y-10 leading-6 text-tertiary-700 max-md:max-w-full">
        <p>
          KADA prioritizes post-harvest management, storage, and processing
          facilities to reduce losses and add value to agricultural products.
          Through access to markets and resources, we support processors and
          marketers in enhancing food availability and affordability.
        </p>
      </div>
    </div>
  </div>
);

const CooperativesSection: React.FC = () => (
  <div className="flex flex-col ml-5 w-[54%] max-md:ml-0 max-md:w-full">
    <div className="flex relative flex-col items-start self-stretch px-20 py-12 my-auto w-full rounded-3xl bg-[#F8F8F8] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="text-lg font-semibold uppercase leading-snug text-green-600">
        VENDORS
      </div>
      <h2 className="mt-6 text-xl font-bold leading-none text-zinc-700">
        Empowering Individuals for a Better Future
      </h2>
      <div className="self-stretch mt-7 text-base font-thin space-y-10 leading-6 text-tertiary-700 max-md:max-w-full">
        <p>
          KADA strengthens agricultural value chains by promoting public-private
          partnerships and fostering collaborations with development agencies.
          This enables vendors to access better opportunities, improved
          infrastructure, and innovative solutions to meet market demands.
        </p>
      </div>
    </div>
  </div>
);

const KadunaSection: React.FC = () => (
  <div className="flex flex-col ml-5 w-[54%] max-md:ml-0 max-md:w-full">
    <div className="flex relative flex-col items-start self-stretch px-20 py-12 my-auto w-full rounded-3xl bg-[#F8F8F8] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="text-lg font-semibold uppercase leading-snug text-green-600">
        PARTNERS
      </div>
      <h2 className="mt-6 text-xl font-bold leading-none text-zinc-700">
        Empowering Individuals for a Better Future
      </h2>
      <div className="self-stretch mt-7 text-base font-thin space-y-10 leading-6 text-tertiary-700 max-md:max-w-full">
        <p>
          KADA collaborates with public and private stakeholders, financial
          institutions, and research bodies to drive innovation and investment.
          Our partnerships ensure growth and sustainability across the
          agricultural sector.
        </p>
      </div>
    </div>
  </div>
);

const NationalDevelopmentSection: React.FC = () => (
  <div className="flex flex-col ml-5 w-[54%] max-md:ml-0 max-md:w-full">
    <div className="flex relative flex-col items-start self-stretch px-20 py-12 my-auto w-full rounded-3xl bg-[#F8F8F8] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="text-lg font-semibold uppercase leading-snug text-green-600">
        ECONOMY SECURITY
      </div>
      <h2 className="mt-6 text-xl font-bold leading-none text-zinc-700">
        Empowering Individuals for a Better Future
      </h2>
      <div className="self-stretch mt-7 text-base font-thin space-y-10 leading-6 text-tertiary-700 max-md:max-w-full">
        <p>
          By leveraging agriculture as a tool for job creation, poverty
          reduction, and economic diversification, KADA fosters rural
          development. We expand agro-industrial activities to generate value
          addition, improve livelihoods, and secure a prosperous future for all.
        </p>
      </div>
    </div>
  </div>
);

export {
  FarmerSection,
  IndividualsSection,
  CooperativesSection,
  KadunaSection,
  NationalDevelopmentSection,
};

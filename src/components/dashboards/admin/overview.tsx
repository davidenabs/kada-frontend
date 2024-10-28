import React from 'react';
import TabNavigation from './tab-nav';

interface StatisticsCardProps {
  backgroundColor: string;
  count: string;
  label: string;
  link: string;
}

interface StatisticsDisplayProps {
  statisticsData: Array<{
    backgroundColor: string;
    count: string;
    label: string;
    link: string;
  }>;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ backgroundColor, count, label, link }) => {
  return (
    <a href={link} className={`flex overflow-hidden pr-1 pl-7 w-full text-3xl font-bold leading-tight ${backgroundColor} rounded max-md:pl-5 max-md:mt-5 hover:opacity-90 transition-opacity`}>
      <div className="flex z-10 flex-col items-start my-auto mr-0">
        <div>{count}</div>
        <div className="self-stretch mt-2 text-base font-light">{label}</div>
      </div>
      <div className="flex shrink-0 h-[127px] w-[155px]" />
    </a>
  );
};

const SustainableAgricultureCard: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col grow leading-tight max-md:mt-5 rounded-lg">
      <div className="flex flex-col px-5 w-full">
        <div className="flex relative flex-col gap-0.5 items-start px-6 pt-28 pb-7 aspect-[1.011] max-md:px-5 max-md:pt-24">
          <img loading="lazy" src="/images/lady-w-hat.png" alt="Sustainable Agriculture" className="object-cover absolute inset-0 size-full" />
        </div>
      </div>
    </div>
  );
};

const StatisticsDisplay: React.FC<StatisticsDisplayProps> = ({ statisticsData }) => {
  return (
    <section className="rounded flex">
      <div className="flex flex-wrap md:gap-5 max-md:flex-col">
        {statisticsData.map((stat, index) => (
          <div key={index} className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <StatisticsCard
              backgroundColor={stat.backgroundColor}
              count={stat.count}
              label={stat.label}
              link={stat.link}
            />
          </div>
        ))}
       
      </div>
      <div className="flex flex-col ml-2 w-3/12 max-md:ml-0 max-md:w-full max-md:hidden">
          <SustainableAgricultureCard />
        </div>
    </section>
  );
};

interface OverviewProps {
  statisticsData: Array<{
    backgroundColor: string;
    count: string;
    label: string;
    link: string;
  }>;
}

const Overview: React.FC<OverviewProps> = ({ statisticsData }) => {
  return (
    <section className="mt- w-full max-w[1118px] max-md:max-w-full">
      <div className="flex flex-col">
        <StatisticsDisplay statisticsData={statisticsData} />
        <TabNavigation />
      </div>
    </section>
  );
};

export default Overview;

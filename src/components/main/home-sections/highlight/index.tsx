import React from 'react';
import HighlightCard from './card';
import NewsletterSubscribe from './newsletter';

interface HighlightData {
  imageSrc: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

const highlightsData: HighlightData[] = [
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ceb78231202ae3aa8afaed5e2f5a52028ccddef557a334daa1c134fa3a40f3a2?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
    title: "(KADA) appreciates the GIZ-GIAE Nigeria for its contribution towards agricultural development.",
    description: "Kaduna State Agricultural Development Agency paves the way for a sustainable future in Kaduna. Kaduna State Agricultural Development Agency paves the way",
    date: "Dec 19, 2023",
    time: "12:00 AM"
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ceb78231202ae3aa8afaed5e2f5a52028ccddef557a334daa1c134fa3a40f3a2?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
    title: "(KADA) appreciates the GIZ-GIAE Nigeria for its contribution towards agricultural development.",
    description: "Kaduna State Agricultural Development Agency paves the way for a sustainable future in Kaduna. Kaduna State Agricultural Development Agency paves the way",
    date: "Dec 19, 2023",
    time: "12:00 AM"
  },
//   {
//     imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ceb78231202ae3aa8afaed5e2f5a52028ccddef557a334daa1c134fa3a40f3a2?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
//     title: "(KADA) appreciates the GIZ-GIAE Nigeria for its contribution towards agricultural development.",
//     description: "Kaduna State Agricultural Development Agency paves the way for a sustainable future in Kaduna. Kaduna State Agricultural Development Agency paves the way",
//     date: "Dec 19, 2023",
//     time: "12:00 AM"
//   }
];

const Highlights: React.FC = () => {
  return (
    <section className="app_container items-center flex flex-col bg-[#fefffd] mt-40">
      <div className="flex flex-col self-start">
        <h2 className="text-lg font-semibold leading-snug text-green-600">
          HIGHLIGHTS
        </h2>
        <h1 className="mt-1.5 text-3xl font-bold leading-tight text-zinc-700">
          Latest at KADA
        </h1>
      </div>
      <div className="mt-12 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <HighlightCard {...highlightsData[0]} />
          </div>
          <div className="flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full hidden md:flex">
            <div className="overflow-hidden grow px-9 pt-96 pb-12 w-full text-2xl font-bold leading-7 text-white rounded-lg bg-[url('/images/women-farming.png')] bg-cover bg-no-repeat bg-blac bg-opacity20 max-md:px-5 max-md:pt-24 max-md:mt-9 max-md:max-w-full ">
              (KADA)appreciates the GIZ-GIAE Nigeria for its contribution towards agricultural development.
            </div>
          </div>
        </div>
      </div>
      <div className="mt-11 w-full max-md:mt-10 max-md:max-w-full">
        <div className="grid md:grid-cols-3 gap-5 max-md:flex-col">
          {highlightsData.map((highlight, index) => (
            <div key={index} className="flex flex-col w-full">
              <HighlightCard {...highlight} />
            </div>
          ))}
           <NewsletterSubscribe />
        </div>
      </div>
     
      {/* <style jsx>{`
        builder-component {
          max-width: none !important;
        }
      `}</style> */}
    </section>
  );
};

export default Highlights;
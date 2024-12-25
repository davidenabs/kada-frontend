"use client";

import React from "react";
import Slider from "react-slick";
import StatCard, { StatCardProps } from "./stat-card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Statistics: React.FC<{ hasBg?: boolean }> = ({ hasBg = true }) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="app_container items-center flex flex-col relative pb-40 w-full pt-[123px] md:py-[165px] mb-20 overflow-hidden">
      <div className="flex z-10 flex-col w-full">
        <div className="flex flex-col md:self-start text-center md:text-left self-center whitespace-nowrap mb-12">
          <h2 className="text-lg font-semibold leading-snug text-green-600 uppercase">
            Factsheet
          </h2>
          <h1 className="mt-1.5 text-3xl font-bold leading-tight text-zinc-700">
            Statistics
          </h1>
        </div>
        <div className="w-full px-4 md:px-8 bg-transparent">
          <Slider {...settings}>
            {statisticsData.map((stat, index) => (
              <div key={index} className="px-2 py-2">
                <StatCard {...stat} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

const statisticsData: StatCardProps[] = [
  {
    title: "Arable Land",
    value: "4.5 Million Hectres (97%) Arable Land",
    subtitle: "2.9 Million Hectres (65%) under cultivation",
    source: "KBS, 2017",
    bgColor: "bg-neutral-800",
    textColor: "text-emerald-50",
    accentColor: "text-green-500",
  },
  {
    title: "State Population",
    value: "9,476,053 Million",
    source: "2020 Projection",
    bgColor: "bg-white",
    textColor: "text-zinc-700",
    subtitle2: "State Population",
  },
  {
    title: "Agriculture contribution to state GDP",
    value: "38.09%",
    bgColor: "bg-white",
    textColor: "text-zinc-700",
    subtitle2: "Agriculture contribution to state GDP",
  },
  {
    title: "Farming Households in Kaduna State",
    value: "1.3m",
    bgColor: "bg-white",
    textColor: "text-zinc-700",
    subtitle2: "Farming Households in Kaduna State",
  },
  {
    title: "during Farming Season",
    subtitle: "makes use of Agro-Chemical Products",
    value: "85.2% Farmers",
    bgColor: "bg-white",
    textColor: "text-zinc-700",
    subtitle2: "During Farming Season",
  },
];

export default Statistics;

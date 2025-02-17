"use client";
import React from "react";
import StatCard, { StatCardProps } from "./stat-card";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import {
  Autoplay,
  EffectFade,
  Mousewheel,
  Keyboard,
  Pagination,
} from "swiper/modules";
import { useInView } from "@/hooks/use-in-view";

import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import useScreenSize from "@/hooks/use-screen-size";

const Statistics: React.FC<{ hasBg?: boolean }> = ({ hasBg = true }) => {
  const swiperRef = React.useRef<SwiperType | null>(null);
  const [ref, isInView] = useInView<HTMLDivElement>();
  const { width } = useScreenSize();

  const isLargeScreen = React.useMemo(() => width > 992, [width]);

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

  React.useEffect(() => {
    if (swiperRef.current) {
      if (isInView) {
        console.log("isInView", isInView);
        swiperRef.current.autoplay.start();
      } else {
        console.log("isNotInView", isInView);
        swiperRef.current.autoplay.stop();
      }
    }
  }, [isInView, swiperRef.current]);

  React.useEffect(() => {
    if (swiperRef.current) {
      console.log("swiper running", swiperRef.current.autoplay.running);
    }
  }, [swiperRef.current]);

  return (
    <div
      className="app_container items-center flex flex-col pb-40 w-full pt-[123px] md:py-[165px] mb-20 overflow-hidden relative"
      ref={ref}
    >
      <div className="absolute bg-[#FBFBFB] w-[1871.08px] h-[652.1px] left-[-283px] top-[50px] rotate-[5deg] rounded-[50%]" />
      <div className="flex z-10 flex-col w-full">
        <div className="flex flex-col md:self-start text-center md:text-left self-center whitespace-nowrap mb-12">
          <h2 className="text-lg font-semibold leading-snug text-green-600 uppercase">
            Factsheet
          </h2>
          <h1 className="mt-1.5 text-3xl font-bold leading-tight text-zinc-700">
            Statistics
          </h1>
        </div>
        <div className="w-full bg-transparent relative">
          {/* <Slider {...settings}>
            {statisticsData.map((stat, index) => (
              <div key={index} className="px-2 py-2">
                <StatCard {...stat} />
              </div>
            ))}
          </Slider> */}

          <Swiper
            // onInit={(swiper) => (swiperRef.current = swiper)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={isLargeScreen ? 4 : 1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              // Start paused, we'll control it with the useEffect
              pauseOnMouseEnter: true,
            }}
            speed={500}
            loop={true}
            className="mySwiper1 w-full relative h-full"
            modules={[Autoplay, EffectFade, Mousewheel, Keyboard, Pagination]}
            keyboard={true}
            spaceBetween={8}
            direction="horizontal"
            touchAngle={45}
            draggable
            pagination={{
              dynamicBullets: true,
              clickable: true,
              el: ".swiper-pagination-container",
              type: "bullets",
              // bulletElement: "span",
              // bulletClass: "swiper-pagination-bullet",
              // bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            onSlideChange={(swiper) => {
              console.log("slide change", swiper.realIndex);
            }}
          >
            {statisticsData.map((stat, index) => (
              <SwiperSlide key={index} className="h-full">
                <div className="">
                  <StatCard {...stat} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-pagination-container absolute transform -translate-x-1/2 left-1/2 !-bottom-[30px] z-10" />
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

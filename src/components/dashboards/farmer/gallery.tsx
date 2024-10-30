"use client";
import React, { useRef } from "react";
import SwiperCore from "swiper";
import {
  Autoplay,
  EffectFade,
  Navigation,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation]);

import "swiper/css";
// import "swiper/swiper-bundle.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import Image from "next/image";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

function Gallery() {
  const swiperRef = useRef<SwiperCore | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="">
      <Swiper
        onInit={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        autoplay={true}
        speed={500}
        loop={true}
        className="mySwiper1 w-full relative"
        modules={[Autoplay, EffectFade, Mousewheel, Keyboard]}
        keyboard={true}
        spaceBetween={0}
        direction="horizontal"
        touchAngle={45}
        draggable
      >
        <div className="">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
            <button onClick={handlePrev}>
              <svg
                width="7"
                height="19"
                viewBox="0 0 7 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.368509 9.39952L5.11621 0.431641L6.88379 1.36742L2.63151 9.39952L6.88379 17.4316L5.11621 18.3674L0.368509 9.39952Z"
                  fill="white"
                  fill-opacity="0.5"
                />
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
            <button onClick={handleNext} className="bg-white blur-lg">
              <svg
                width="7"
                height="19"
                viewBox="0 0 7 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.63149 9.39952L1.88379 0.431641L0.116211 1.36742L4.36849 9.39952L0.116211 17.4316L1.88379 18.3674L6.63149 9.39952Z"
                  fill="white"
                  fill-opacity="0.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <SwiperSlide>
          <div className="relative w-full h-[295px]">
            <Image
              src="/images/bdo.png"
              alt="Farm Gallery"
              fill
              className="object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-[295px]">
            <Image
              src="/images/bdo.png"
              alt="Farm Gallery"
              fill
              className="object-cover"
            />
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>
          <img
            src="/images/bdo.png"
            alt="Farm Gallery"
            className="object-cover h-[500px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/bdo.png"
            alt="Farm Gallery"
            className="object-cover h-[500px]"
          />
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
}

export default Gallery;

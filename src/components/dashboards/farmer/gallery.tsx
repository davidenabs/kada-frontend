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
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@/icons";
import { IFarmGallery } from "@/interface/farm";

import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

SwiperCore.use([Navigation]);

function Gallery({ images }: { images: IFarmGallery[] }) {
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
    <div className="min-w-0 h-full">
      <Swiper
        onInit={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        autoplay={true}
        speed={500}
        loop={true}
        className="mySwiper1 w-full relative rounded-[20px] h-full"
        modules={[Autoplay, EffectFade, Mousewheel, Keyboard]}
        keyboard={true}
        spaceBetween={8}
        direction="horizontal"
        touchAngle={45}
        draggable
      >
        {images.length >= 2 && (
          <div className="">
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10  my-auto backdrop-blur-lg ">
              <button onClick={handlePrev}>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 my-auto backdrop-blur-lg">
              <button onClick={handleNext} className="">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {images.map((image, index) => (
          <SwiperSlide key={index} className="h-full">
            <div className="relative w-full h-[295px] md:h-full overflow-hidden">
              <Image
                src={image.imagePath}
                alt={image?.description || "Farm Image"}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Gallery;

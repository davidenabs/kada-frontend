"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Title } from "rizzui";
import { useEffect, useState } from "react";

const backgroundImages = [
  "/images/hero/1.jpeg",
  "/images/hero/2.jpeg",
  "/images/hero/3.jpeg",
  "/images/hero/4.jpeg",
];

const MainHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative app_container h-[594px] md:h-[844px] bg-[#F8FAF0]">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-primary-800 opacity-80"></div>
        </div>
      ))}
      <main className="relative flex flex-col md:flex-row md:justify-between justify-center w-full pt-[150px] h-full items-center  text-left">
        <section className="flex flex-col w-full md:w-5/12 justify-center px-4 md:px-0">
          <Title
            as="h1"
            className="text-base font-normal md:text-xl leading-none uppercase text-white"
          >
            For food security and national development
          </Title>
          <Title
            as="h2"
            className="mt-8 md:mt-4 font-semibold md:text-5xl leading-[50px] text-3xl leading-10 text-white"
          >
            Transforming <span className="text-yellow-500">Kaduna</span> through
            Food Security and National Development
          </Title>

          <div className="flex gap-3 mt-8 md:mt-16 justify-start text-sm leading-tight w-full md:w-[316px]">
            <Link
              href="/portal"
              className="overflow-hidden gap-2.5 self-stretch px-5 py-3.5 text-white bg-primary-600 rounded-[60px] shadow-[0px_4px_16px_rgba(0,165,81,0.39)] w-[152px] text-center"
              role="button"
            >
              Visit KADA Portal
            </Link>
            <Link
              href="#explore-section"
              className="overflow-hidden gap-2.5 self-stretch px-5 py-3.5 text-black whitespace-nowrap bg-white rounded-[60px] w-[152px] text-center"
              role="button"
              scroll={true}
            >
              Explore
            </Link>
          </div>
        </section>
        <div className="hidden md:block">
          <p className="my-auto text-base leading-6 w-[339px] font-oxygen mt-[63px] text-white">
            Kaduna State Agricultural Development Agency paves the way for a
            sustainable future in Kaduna.
          </p>
        </div>
      </main>
    </div>
  );
};

export default MainHero;
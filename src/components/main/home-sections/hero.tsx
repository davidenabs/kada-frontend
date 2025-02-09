import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Title } from "rizzui";

const MainHero = () => {
  return (
    <div
      className="app_container h-[594px] md:h-[844px] bg-[#F8FAF0]"
      // style={{
      //   backgroundImage: `url("/images/bg.png")`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center", // Ensure image is centered
      // }}
    >
      <main className="flex md:justify-between justify-center w-full flex-col md:flex-row md:text-left text-center pt-[150px]">
        <section className="flex flex-col max-md:max-w-full w-5/12">
          <Title
            as="h1"
            className="text-base font-normal md:text-xl leading-none uppercase maxmd:mr-2.5 max-md:max-w-full"
          >
            For food security and national development
          </Title>
          <Title
            as="h2"
            className="mt-16 md:mt-8 font-semibold md:text-5xl tracking- leading-[50px]  max-md:text-3xl max-md:leading-10 font- w[343px] md:w-[504px] "
          >
            Transforming Kaduna through Food Security and National Development
          </Title>

          <div className="flex gap-3 md:mt-16 justify-center md:justify-start max-w-full text-sm leading-tight w-full md:w-[316px] max-md:mt-24">
            <Link
              href="#"
              className="overflow-hidden gap-2.5 self-stretch px-5 py-3.5 text-white bg-primary-600 rounded-[60px] shadow-[0px_4px_16px_rgba(0,165,81,0.39)] w-[152px] text-center"
              role="button"
            >
              Visit KADA Portal
            </Link>
            <Link
              href="#"
              className="overflow-hidden gap-2.5 self-stretch px-5 py-3.5 text-black whitespace-nowrap bg-white rounded-[60px] w-[152px] text-center"
              role="button"
            >
              Explore
            </Link>
          </div>

          <p className="my-auto text-base leading-6 w-[339px] hidden md:block font-oxygen mt-[63px]">
            Kaduna State Agricultural Development Agency paves the way for a
            sustainable future in Kaduna.
          </p>
        </section>
        <div className="border flex-1">
          <div className="grid grid-cols-3 grid-rows-3 h-full gap-3">
            <div className="col-span-3 row-span-2">
              <div className="relative w-full h-full">
                <Image
                  src="/images/hero/1.jpeg"
                  alt="Hero Image"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative w-full h-full">
              <Image
                src="/images/hero/2.jpeg"
                alt="Hero Image"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative w-full h-full">
              <Image
                src="/images/hero/3.jpeg"
                alt="Hero Image"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative w-full h-full">
              <Image
                src="/images/hero/4.jpeg"
                alt="Hero Image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainHero;

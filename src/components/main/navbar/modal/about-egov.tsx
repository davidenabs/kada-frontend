// import { CoatOfArms, Link } from "@/icon";
import Image from "next/image";
import React from "react";
import { Button } from "rizzui";

const AboutEGov = () => {
  return (
    <div className="flex gap-[31px]">
      <div className="w-[137px] lg:w-[229px] h-[307px] bg-white border relative">
        <Image src="/images/about-egov.png" alt="about-egov" fill />
      </div>
      <div className="flex-1 flex items-center">
        <div className="">
          <div className="font-instrumentSans">
            <p className="font-instrumentSans text-[14px]">
              eGov.ng is your digital gateway to streamlined government
              services, simplifying interactions between citizens and
              administrations. Accessible, efficient, and secure, we&apos;re
              committed to empowering every Nigerian with seamless access to
              essential public services online
            </p>
          </div>
          <Button
            variant="text"
            className="p-0 font-instrumentSans text-green-500 font-bold uppercase text-[14px] mt-[20px]"
          >
            <span>Learn More</span>
            {/* <Link className="ml-[5px]" /> */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutEGov;

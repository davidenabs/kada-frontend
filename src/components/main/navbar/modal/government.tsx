// import { CoatOfArms, Link } from "@/icon";
import Image from "next/image";
import React from "react";
import { Button } from "rizzui";

const Government = () => {
  return (
    <div className="flex gap-[31px]">
      <div className="w-[137px] lg:w-[229px] h-[307px] bg-white border relative">
        <Image src="/images/president.jpeg" alt="president" fill />
      </div>
      <div className="flex-1 flex items-center">
        <div className="">
          <div className="font-instrumentSans divide-y">
            <div className="mb-2">
              <h4 className="font-bold text-[24px] text-gray-700">President</h4>
              <p>H.E Bola Ahmed Tinubu, GCFR</p>
            </div>

            <div className="mt-3">
              <p className="font-instrumentSans text-[14px]">
                The inauguration of Senator Bola Ahmed Tinubu as President of
                the Federal Republic of Nigeria on May 29, 2023 was historic. He
                is serving as the 16th and Current President of the Federal
                Republic of Nigeria, after serving as the Governor of Lagos
                State from the year 1999 to 2007.
              </p>
            </div>
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

export default Government;

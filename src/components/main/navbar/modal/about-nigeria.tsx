// import { CoatOfArms, Link } from "@/icon";
import { Logo } from "@/icons";
import React from "react";
import { Button } from "rizzui";

const AboutNigeria = () => {
  return (
    <div className="flex gap-[31px]">
      <div className="w-[137px] lg:w-[229px] h-[307px] bg-white border border-[#E4E7EC] flex items-center justify-center rounded">
        <Logo className="w-[200px] h-[200px]" />
      </div>
      <div className="flex-1 flex items-center">
        <div className="font-instrumentSans">
          <h4 className="font-bold text-[24px] text-gray-700">Nigeria</h4>
          <div className="font-instrumentSans space-y-1">
            <p>Officially, Federal Repulic of Nigeria</p>
            <p>
              <span className="font-semibold">States: </span> 36
            </p>
            <p>
              <span className="font-semibold">Capital: </span> Abuja
            </p>
            <p>
              <span className="font-semibold">Languages: </span> English, Igbo,
              Hausa, Yoruba
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

export default AboutNigeria;

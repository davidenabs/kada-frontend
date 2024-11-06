import Button, { KadaButton } from "@/components/form/button";
import { ArrowRightIcon, HandCoins } from "@/icons";
import React from "react";
// import { Button } from "rizzui";

function JoinCooperative() {
  return (
    <div className="bg-gradient-to-b from-[#D5FADC] via-white to-[#DEEDE1] bg-[length:100%_300%] bg-[0_0] h-[204px] w-full p-[24px_34px] rounded-[20px] flex items-center">
      <div className="space-y-3">
        <HandCoins className="w-12 h-12 mx-auto fill-[#00A551]" />
        <h4 className="text-xl font-bold text-center text-primary">
          Empower Your Growth – Join a Cooperative Today!
        </h4>

        <KadaButton
          className="w-full rounded-full !bg-[#00A551]"
          variant="secondary"
          rightIcon={<ArrowRightIcon className="w-4 h-4 fill-white" />}
        >
          Join Cooperative
        </KadaButton>
      </div>
    </div>
  );
}

export default JoinCooperative;

import { Logo } from "@/icons";
import React, { Fragment } from "react";

const FullPageLoader = () => {
  return (
    <Fragment>
      <section className="fixed top-0 left-0 right-0 bottom-0 h-screen flex items-center justify-center bg-white flex-col space-y-6 z-[999]">
        <div className="relative w-[250px] h-[250px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center rounded-full border">
            <div className="w-full h-full border-[8px] border-[#D7F5E5] border-t-[#0BCE6B] rounded-full animate-spin-slow"></div>
          </div>
          {/* <Logo className="w-12 h-12" /> */}
          <img
            src="/images/logo.svg"
            alt="Kaduna State Agricultural Development Agency Logo"
            className="w-[200px] h-[200px]"
          />
        </div>
      </section>
    </Fragment>
  );
};

const AppLoader = () => {
  return (
    <Fragment>
      <div className="flex items-center justify-center my-auto ">
        <div className="relative flex items-center justify-center w-[250px] h-[250px] bg-white rounded-full">
          {/* Loading Spinner */}
          <div className="absolute inset-0 flex items-center justify-center rounded-full">
            <div className="w-full h-full border-[8px] border-[#D7F5E5] border-t-[#0BCE6B] rounded-full animate-spin-slow"></div>
          </div>

          {/* Logo */}
          <div className="relative">
            {/* <Logo className="w-[100.64px] h-[101.07px]" /> */}
            <img
              src="/images/logo.svg"
              alt="Kaduna State Agricultural Development Agency Logo"
              className="w-[200px] h-[200px]"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { FullPageLoader };
export default AppLoader;

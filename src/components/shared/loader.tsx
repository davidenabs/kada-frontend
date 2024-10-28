import { Logo } from "@/icons";
import React, { Fragment } from "react";

const FullPageLoader = () => {
  return (
    <Fragment>
      <section className="fixed top-0 left-0 right-0 bottom-0 h-screen flex items-center justify-center bg-white flex-col space-y-6">
        <Logo className="w-12 h-12" />

        <div className="custom-loader"></div>
      </section>
    </Fragment>
  );
};

const AppLoader = () => {
  return (
    <Fragment>
      <div className="flex items-center justify-center min-hscreen my-auto ">
        <div className="relative flex items-center justify-center w-[163px] h-[163px] bg-white rounded-full">
          {/* Loading Spinner */}
          <div className="absolute inset-0 flex items-center justify-center rounded-full">
            <div className="w-full h-full border-[8px] border-[#D7F5E5] border-t-[#0BCE6B] rounded-full animate-spin-slow"></div>
          </div>

          {/* Logo */}
          <div className="relative">
            <Logo className="w-[100.64px] h-[101.07px]" />
          </div>
        </div>
      </div>
    </Fragment>

  );
};

export { FullPageLoader };
export default AppLoader;

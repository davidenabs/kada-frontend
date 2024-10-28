import AppLoader from "@/components/shared/loader";
import React from "react";

const Loading = () => {
  return (
    <AppLoader />
    // <section className="fixed top-0 left-0 right-0 bottom-0 h-screen flex items-center justify-center bg-white flex-col space-y-6">
    //   <Logo className="w-12 h-12" />

    //   <div className="custom-loader"></div>
    // </section>
  );
};

export default Loading;

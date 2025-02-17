"use client";
import React, { Fragment, useEffect } from "react";

function GoodAgronomicPractices() {
  // const [loaded, setLoaded] = React.useState(false);

  // useEffect(() => {
  //   setLoaded(true);
  // }, []);

  return (
    <Fragment>
      <div className="bg-[#F0F0F0]">
        <section className='bg-[url("/images/cropping-calendar.png")] bg-cover bg-center bg-no-repeat w-full mt-[121px] app_container h-[201px] flex items-center'>
          <div className="font-inter text-white">
            <h4 className="text-2xl font-bold uppercase">Good Agronomic practices</h4>
            <p className="text-base">
              Knowledge Bank for Good Agronomic practices
            </p>
          </div>
        </section>

        <section className="app_container py-[77px]">
          <h4 className="text-center text-[40px] font-semibold text-[#343A3F]">
            {/* How would you like to <br /> explore calendar? */}
            Good Agronomic <br /> practices
          </h4>

        

            <div className="flex-1 flex flex-col">
             
            </div>
        </section>
      </div>
    </Fragment>
  );
}

export default GoodAgronomicPractices;

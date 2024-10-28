"use client";
import LandStatsCarousel from "@/components/auth/signin/stats";
import useScreenSize from "@/hooks/use-screen-size";
import React, { Fragment } from "react";

function SignInLayout({ children }: { children: React.ReactNode }) {
  const { width } = useScreenSize();

  return (
    <Fragment>
      <section className="">
        {width < 992 ? (
          <div className="flex bg-green-800 p-12 min-h-screen bg-[url('')] bg-no-repeat bg-cover justify-center" style={{
            backgroundImage: "url('/images/man-lady-farm.png'), url('/images/auth-vector-bg.png')",
            backgroundPosition: "left top, right center",
            backgroundSize: "80% 80%, cover",
            backgroundRepeat: "no-repeat, no-repeat"
          }}>
            <div className="flex flex-col items-center">
              {children}

              <div className="py-3 text-white w-[272px]">4.5 Million Hectres (97%) Arable Land</div>
            </div>
          </div>
        ) :
          (<div className="flex bg-green-800 p-12 min-h-screen" style={{
            backgroundImage: "url('/images/man-lady-farm.png'), url('/images/auth-vector-bg.png')",
            backgroundPosition: "left center, right center",
            backgroundSize: "contain,contain",
            backgroundRepeat: "no-repeat, no-repeat"
          }}>
            <LandStatsCarousel />
            {children}
          </div>)
        }
      </section>

    </Fragment>
  );
}

export default SignInLayout;

import React from "react";

export default function ServicesPage() {
  return (
    <main className="bg-primary-400/20">
            <div className="flex overflow-hidden flex-col pt-[73px] md:pt-[65px]">
                <img

                    src={'/images/header-banner.png'}
                    alt={'alt'}
                    className="object-contain w-full aspect-[7.41] max-md:max-w-full"
                />

            </div>

            <section className="app_container flex flex-col rounded-none py-[83px] md:py-[105px]">
                <div className="flex flex-col self-center max-w-full w-[828px]">
                    <h2 className="self-center text-3xl font-bold leading-tight text-green-800">
                       Our Services
                    </h2>
                   
                </div>
                
            </section>
        </main>
  );
}

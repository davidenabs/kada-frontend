import React from 'react';

const WeatherWidget: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col pt-7 mx-auto w-full rounded-3xl border border-solid bg-slate-50 bg-[url('/images/weather-bg.png')] bg-cover bg-center border-neutral-300 shadow-[0px_0px_30px_rgba(189,189,189,0.25)] max-md:mt-5 h-[188px]">
      <div className="self-start ml-8 text-sm font-light leading-tight text-black max-md:ml-2.5">
        FRIDAY JAN 5, 2O24
      </div>
      <div className="px-8 pt-1.5 pb-12 mt-2.5 w-full max-md:px-5">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-5 leading-tight text-black max-md:mt-10">
              <h2 className="text-xl font-bold">Good Afternoon</h2>
              <p className="self-start mt-1 text-base font-light">Kaduna, Nigeria</p>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex grow gap-2 items-center text-2xl font-light leading-tight text-black whitespace-nowrap max-md:mt-10">
              <div className="self-stretch my-auto">24</div>
              <div className="self-stretch my-auto">c</div>
              <img loading="lazy" src="/images/sun.svg" alt="Weather icon" className="object-contain shrink-0 self-stretch aspect-square w-[81px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
"use client"
import CreateFarmCard from '@/components/dashboards/farmer/create-farm-card';
import VendorList from '@/components/dashboards/farmer/vendors';
import WeatherWidget from '@/components/dashboards/farmer/weather';
import Button from '@/components/form/button';
import Input from '@/components/form/input';
import useDashboardTitle from '@/hooks/use-dashboard-tite';
import { useModal } from '@/hooks/use-modal';
import { CloseIcon, PlusIcon } from '@/icons';
import React from 'react';

const CooperativeDashboard: React.FC = () => {
  useDashboardTitle("Dashboard");
  const { openModal } = useModal();

  const handleOpenModal = () => {
    // console.log('ss')
    openModal({
      customSize: "654px",
      view: <>
        <section className="flex overflow-hidden flex-col pb-8 w-full bgwhite rounded-[10px] max-md:max-w-full bg-white">
          <header className="flex flex-col pt-6 pb-0.5 w-full max-md:max-w-full">
            {/* <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ecc02b512b3a9a678d666f1b32b064a2d2441ecfc7fd552b041e6c055774cc0?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" alt="" className="object-contain self-end mr-7 w-6 aspect-square max-md:mr-2.5" /> */}
            <CloseIcon className="w-4 h-4 self-end mr-7" />
            <div className="flex flex-col px-10 w-full max-md:px-5 max-md:max-w-full">
              <h1 className="self-start text-2xl font-bold text-green-800">Create Farm</h1>
              <form className="flex flex-col mt-11 max-md:mt-10 max-md:max-w-full">

                <div className="flex flex-col mt-5 self-stretch">
                  <label htmlFor="firstName" className="text-sm font-medium text-zinc-700">First Name</label>
                  <Input id="firstName" placeholder="What is your name" className='!py-3 h-[40px]' />

                </div>

                {/* <InputField label="Farm name" placeholder="Enter farm name" />
                  <LocationInput />
                  <AreaInput />
                  <SeasonSelector />
                  <ProductSelector /> */}
                <Input placeholder='' label="Farm name" />
                <Button className='!rounded-full'>Create Farm</Button>
              </form>
            </div>
          </header>
        </section>
      </>,
    });
  };

  return (
    <>
      <section className="flex flex-col w-[69%] max-md:ml-0 max-md:w-full space-y-6" >

        <div className="overflow-hidden px-10 mx-auto w-full bg-[#205B42] rounded-3xl max-md:px-5 max-md:mt-5 max-md:max-w-full" >

          <div className="flex gap-5 max-md:flex-col h-[188px]" >
            <div className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full" >
              <h2 className="self-stretch my-auto text-4xl font-bold leading-9 text-white max-md:mt-10" >
                Farming to feed the nation
              </h2>
            </div>

            <div className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full" >
              <div className="flex justify-end items-center grow text-base font-bold leading-none  max-md:mt-10 " >
                <img loading="lazy" src="/images/famer-vector-curvy.svg" alt="Farming illustration" className="object-contain absolute grow shrink-0 aspect[1.68] basis-0 w-fit max-md:hidden" />
                <Button handleClick={() => handleOpenModal()} className="!w-fit !rounded-full !py-3 !px-3 !shadow-none !bg-white !text-green-800 self-center z-10 flex gap-2"><span>Create Farm</span> <PlusIcon className="w-4 h-4" /></Button>
              </div>
            </div>

          </div>
        </div>

        <CreateFarmCard />
      </section>

      <aside className="flex flex-col ml-3 w-[31%] max-md:ml-0 max-md:w-full space-y-6">
        <WeatherWidget />
        <VendorList />
      </aside>

    </>
  );
};

export default CooperativeDashboard;
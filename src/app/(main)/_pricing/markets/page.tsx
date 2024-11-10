import MarketInformation from '@/components/main/pricing-sections/market';
import React from 'react'

const Markets = () => {
    return (
        <div className='bg-[#F2F9F5] app_container py-[113px] md:py-[135px]'>
            <section className="flex flex-col text-2xl font- leading-tight rounded-[32px]">
                <div className="flex overflow-hidden relative flex-col items-center px-20 pt-20 pb-40 w-full min-h-[294px] h-full bg-green-800 rounded-[32px] max-md:px-5 max-md:pb-24 max-md:max-w-full">
                    <img

                        src={'/images/market-header.png'}
                        alt=""
                        className="object-cover absolute inset-0 size-full"
                    />
                    <header className="flex relative text-center flex-col mb-0 max-w-full w[597px] max-md:mb-2.5 b">
                        <h2 className="self-center text-amber-300 uppercase">{'Market Information'}</h2>
                        <h1 className="mt-2 text-white max-md:max-w-full">{'Kaduna State Agricultural Development Agency (KADA)'}</h1>
                    </header>s
                </div>
            </section>

            <MarketInformation />
        </div>
    )
}

export default Markets;
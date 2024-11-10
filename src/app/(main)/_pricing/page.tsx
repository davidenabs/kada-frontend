import PricingSection from '@/components/main/pricing-sections';
import React from 'react'

const Pricing = () => {
    return (

        <>
            <div className='bg-[url("/images/tree-header-bg.png")] bg-cover h-full w-full pt-[123px] md:py-[165px] '>
                <h1 className="self-center mt-28 text-4xl text-center font-semibold text-white max-md:mt-10">
                    Pricing Information
                </h1>
            </div>

            <section className="app_container flex flex-col rounded-none py-[83px] md:py-[125px]">

                <div className="self-center text-center">
                    <h2 className="text-2xl leading-tight text-tertiary-800">
                        Super affordable for any farmer
                    </h2>

                    <p className='text-primary-800 text-sm font-thin'>Simple transparent pricing that grows with you</p>
                </div>

                <PricingSection />
            </section>
        </>

    )
}

export default Pricing;
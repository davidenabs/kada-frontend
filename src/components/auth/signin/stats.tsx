import React, { useState, useEffect } from 'react';

const LandStatsCarousel: React.FC = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    // Carousel content data (you can add more slides if needed)
    const slides = [
        {
            title: "4.5 Million Hectares (97%) Arable Land",
            description: "2.9 Million Hectares (65%) under cultivation"
        },
        {
            title: "500,000 Farmers in the Region",
            description: "Cultivating vast lands across multiple areas"
        },
        {
            title: "World's Best Agro Products",
            description: "Produced from the most fertile lands"
        }
    ];

    // Automatically move to the next slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    // Handle manual slide change when clicking indicators
    const handleSlideChange = (index: number) => {
        setActiveSlide(index);
    };

    return (
        <section className="flex flex-col w-[62%] max-md:ml-0 max-md:w-full">
        <div className="relative w-full min-h-[862px] max-md:max-w-full">
            {/* Content Wrapper with a fixed height */}
            <div className="flex flex-col items-start px-20 pb-32 w-full h-[700px] pt-[500px] max-md:px-5 max-md:py-24 max-md:mt-10">
                {/* Slide content */}
                <h1 className="relative text-4xl font-medium leading-10 text-emerald-50 w-[312px]">
                    {slides[activeSlide].title}
                </h1>
                <p className="relative mt-5 text-lg leading-6 text-amber-300 w-[329px]">
                    {slides[activeSlide].description}
                </p>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-36 left-0 flex gap-3 mt9 px-20">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => handleSlideChange(index)}
                        className={`flex shrink-0 rounded-lg h-[9px] w-[94px] cursor-pointer ${
                            activeSlide === index ? 'bg-green-500' : 'bg-zinc-300 bg-opacity-30'
                        }`}
                        role="progressbar"
                        aria-valuenow={activeSlide === index ? 100 : 0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    />
                ))}
            </div>
        </div>
    </section>

    );
};

export default LandStatsCarousel;

import React from 'react';
import FeatureCard from './card';

interface FeatureData {
    title: string;
}

const featureData: FeatureData[] = [
    { title: "Cropping Calendar" },
    { title: "Smart Budgets and execution" },
    { title: "Finance and Inventory Manager" },
    { title: "Crop health information from space satellite data" },
    { title: "Mobile Emergency Notification" },
    { title: "Weather Forecast" }
];

const FarmManagementFeatures: React.FC = () => {
    return (
        <section className="app_container py-[123px] md:py-[165px">
            <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full max-md:hidden">
                    <img

                        src="/images/women-farming-2.png"
                        alt="Farm management illustration"
                        className="object-contain grow w-[604px] aspect-[0.97] rounded-[68px_68px_68px_68px] max-md:mt-10 max-md:max-w-full"
                    />
                </div>
                <div className="flex flex-col ml-3 w-7/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col mt-24 w-full max-md:mt-10 max-md:max-w-full">
                        <h2 className="text-xl pb-10 font-semibold text-tertiary-600 uppercase">For Cooperatives</h2>
                        {[0, 1, 2].map((rowIndex) => (
                            <div key={rowIndex} className={`${rowIndex > 0 ? 'md:mt-6' : ''} w-full max-md:max-w-full`}>
                                <div className="flex md:gap-5 max-md:flex-col">
                                    {featureData.slice(rowIndex * 2, rowIndex * 2 + 2).map((feature, index) => (
                                        <FeatureCard
                                            key={index}
                                            title={feature.title}
                                            className={`w-6/12 ${index === 1 ? 'ml-5' : ''} max-md:ml-0 max-md:w-full`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FarmManagementFeatures;
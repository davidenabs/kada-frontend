import React from 'react';

interface FeatureCardProps {
    icon: string;
    title: string;
    price?: string;
    unit?: string;
    description?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, price, unit, description }) => {
    return (
        <div className={`flex flex-col ${description ? 'ml-5 w-[57%]' : 'w-[43%]'} max-md:ml-0 max-md:w-full`}>
            <div className={`flex overflow-hidden flex-col ${description ? 'flex-wrap grow gap-10 items-start px-7 pt-16 pb-28 text-black bg-neutral-100' : 'px-7 pt-28 pb-12'} w-full leading-tight max-md:px-5 ${description ? 'max-md:pb-24' : 'max-md:pt-24'} max-md:max-w-full`}>
                <img src={icon} alt="" className={`object-contain ${description ? 'shrink-0 my-auto' : ''} w-12 aspect-square`} />
                {description ? (
                    <div className="flex flex-col grow shrink-0 self-start basis-0 w-fit">
                        <h2 className="text-lg font-bold leading-6">{title}</h2>
                        <p className="mt-4 text-base leading-5">{description}</p>
                    </div>
                ) : (
                    <div className="flex overflow-hidden gap-3 self-end px-3.5 py-3 mt-6 bg-white rounded-lg">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d9e67178eb75056f2550c8e828e8ce7082675cfba117e56eadd5402323bf30d?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" alt="" className="object-contain shrink-0 rounded-lg aspect-[1.24] w-[52px]" />
                        <div className="flex flex-col self-start">
                            <h3 className="text-sm font-bold text-black">{title}</h3>
                            <div className="flex gap-1 items-start self-start text-xs text-neutral-500">
                                <span className="font-bold">{price}</span>
                                <span className="font-light">{unit}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeatureCard;
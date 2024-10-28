import React from 'react';

export interface StatCardProps {
    title: string;
    value: string;
    subtitle?: string;
    subtitle2?: string;
    source?: string;
    bgColor: string;
    textColor: string;
    accentColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, subtitle2, source, bgColor, textColor, accentColor }) => {
    return (
        <article className={`flex flex-col w-full w[33%] max-md:w-full h-[317.05px] relative`}>
            <div className={`flex flex-col grow pb-9 w-full rounded-3xl ${bgColor} shadow-[0px_4px_36px_rgba(214,214,214,0.25)] max-md:mt-6`}>
                {title === "Arable Land" && (
                    <img

                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c20e9d273d0f3567dae0f0fffed726ab57797b5ac298ccf60a5d92e8d9481d2?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3"
                        alt=""
                        className="object-contain absolute self-end max-w-full aspect[3] w-[129px]"
                    />
                )}
                <div className="flex flex-col items-start px-9 mt-8 max-md:px-5 ">
                    <h3 className={`self-stretch font-thin text-xl md:text-4xl leading-10 ${textColor}`}>{value}</h3>
                    {subtitle && <p className={`mt-6 text-lg leading-6 ${accentColor || textColor}`}>{subtitle}</p>}
                    {subtitle2 && <p className="text-[#7D7D7D] text-3xl mt-2">{subtitle2}</p>}
                    {source && <p className={`absolute bottom-10 text-base leading-tight ${textColor} max-md:mt-10`}>{source}</p>}
                </div>
            </div>
        </article>
    );
};

export default StatCard;

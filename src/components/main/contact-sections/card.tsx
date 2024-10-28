import React from 'react';

interface ContactCardProps {
    icon: string;
    title: string;
    details: string[];
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, details }) => {
    return (
        <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-center px-16 pt-9 pb-28 w-full text-sm leading-tight text-white whitespace-nowrap border border-white border-solid bg-tertiary-600 max-md:px-5 max-md:pb-24 max-md:mt-10">
                <img src={icon} alt="" className="object-contain aspect-square w-[50px]" />
                <h3 className="mt-4 text-xl">{title}</h3>
                {details.map((detail, index) => (
                    <div key={index} className={index === 0 ? "mt-4" : "mt-1"}>
                        {title === "Social Media" ? (
                            <div className="flex gap-3 max-w-full whitespace-nowrap w-[109px]">
                                <img src={`http://b.io/ext_${index + 5}-`} alt="" className="object-contain shrink-0 w-6 aspect-square" />
                                <div className="my-auto">{detail}</div>
                            </div>
                        ) : (
                            detail
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactCard;
import React from "react";

interface ContactCardProps {
  icon: string;
  title: string;
  details: string[];
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, details }) => {
  return (
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow items-center px-16 pt-9 pb-28 w-full text-sm leading-tight text-white whitespace-nowrap border border-white border-solid bg-tertiary-600 max-md:px-5 max-md:pb-24 max-md:mt-10">
        <img
          src={icon}
          alt=""
          className="object-contain aspect-square w-[50px]"
        />
        <h3 className="mt-4 text-xl">{title}</h3>
        {title === "Social Media" ? (
          <div className="mt-4 space-y-1">
            <div className="flex gap-3 items-center max-w-full whitespace-nowrap">
              <img
                src="/icons/facebookLogoIcon.svg"
                alt="Facebook"
                className="object-contain shrink-0 w-6 h-6 aspect-square"
              />
              <div>{details[0]}</div>
            </div>
            <div className="flex gap-3 items-center max-w-full whitespace-nowrap">
              <img
                src="/icons/twitterLogoIcon.svg"
                alt="Twitter"
                className="object-contain shrink-0 w-6 h-6 aspect-square"
              />
              <div>{details[1]}</div>
            </div>
          </div>
        ) : (
          details.map((detail, index) => (
            <div key={index} className={index === 0 ? "mt-4" : "mt-1"}>
              {detail}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactCard;

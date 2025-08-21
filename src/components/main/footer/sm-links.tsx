import React from "react";

interface SocialMediaItem {
  icon: string;
  name: string;
  link?: string;
}

const socialMediaItems: SocialMediaItem[] = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/53676c140c391e938f1548d9d7b46197a5bb624846e7df24273588e1a2a02f4d?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
    name: "kaduna state Agricultural Development Agency-KADA",
    link: "https://www.facebook.com/p/Kaduna-Agricultural-Development-Agency-KADA-61550900330127/"
  },
  // {
  //   icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ad5a1c9867fe19ac0af95335ea666e70448c081215c8e128c87f7a39ff75455a?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
  //   name: "Kadakdsg",
  // },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/aca87d8634126531ea965e95b207af3a07994513d8271f5e36f6458faf5c691e?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
    name: "Kadakdsg",
    link: "https://x.com/Kadakdsg"
  },
];

const SocialMediaLinks: React.FC = () => {
  return (
    <div className="flex relative flex-col items-start py-5 pr-4 pl-5 mt-1.5 max-w-full text-base leading-tight rounded-lg bg-stone-900 bg-opacity-50 backdrop-blur-lg w-[279px] max-md:pr5 divide-y divide-white/65 text-wrap">
      <h3 className="font-bold pb-3">Follow us on social media</h3>
      {socialMediaItems.map((item, index) => (
        <a
          key={index}
          href={item.link!}
          className="flex gap-4 items-center my7 pl-4 w-full py-4 whitespace-nowrap max-md:ml-2.5"
        >
          <img
            src={item.icon}
            alt={`${item.name} icon`}
            className="object-contain shrink-0 w-6 aspect-square"
          />
          <p className="my-auto text-wrap">{item.name}</p>
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;

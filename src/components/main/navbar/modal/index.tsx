"use client";
import cn from "@/utils/class_names";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import AboutNigeria from "./about-nigeria";
import Government from "./government";
import AboutEGov from "./about-egov";
// import {
//   ArrowRight,
//   BackArrowIcon,
//   ChevronDownIcon,
//   Link as LinkIcon,
//   Search2Icon,
// } from "@/icon";
import { Input } from "rizzui";
import useScreenSize from "@/hooks/use-screen-size";
// import useScreenSize from "@/hooks/use-screen-size";

const data = [
  {
    title: "Nimc",
    link: "/",
  },
  {
    title: "FMOIDE",
    link: "/",
  },
  {
    title: "NCC",
    link: "/",
  },
  {
    title: "FIRS",
    link: "/",
  },
  {
    title: "BPP",
    link: "/",
  },
  {
    title: "FRS",
    link: "/",
  },
  {
    title: "NIS",
    link: "/",
  },
  {
    title: "NEPC",
    link: "/",
  },
  {
    title: "SCAMWATCH",
    link: "/",
  },
];

const mdata = [
  // {
  //   title: "Service Providers",
  //   content: <ServiceLinks />,
  // },
  {
    title: "About Nigeria",
    content: <></>,
  },
  {
    title: "Government",
    content: <></>,
  },
  {
    title: "ABOUT e.gov",
    content: <></>,
  },
];

// const ServiceLinks = () => {
//   return (
//     <div className="flex-1">
//       <ul
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(2, 1fr)",
//           rowGap: "16px",
//         }}
//       >
//         {data.map((item, index) => (
//           <li key={index} className="">
//             <Link
//               href={item.link}
//               className="group text-[14px] font-medium text-gray-500 uppercase hover:font-bold hover:text-green-500 flex items-center"
//             >
//               <span>{item.title}</span>

//               {/* <LinkIcon className="ml-[5px] group-hover:visible invisible" /> */}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

const MobileNav = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {mdata.map((item, index) => (
        <Accordion
          key={item.title}
          content={item.content}
          title={item.title}
          onToggle={() => toggleAccordion(index)}
          isOpen={openIndex === index}
        />
      ))}
    </>
  );
}

const NavModal = ({
  open,
}: {
  open: boolean;
}) => {
  const { width } = useScreenSize();
  const [activeTab, setActiveTab] = React.useState(1);
  const [tabs, ] = React.useState([
    {
      id: 1,
      title: "About Nigeria",
      component: <AboutNigeria />,
    },
    {
      id: 2,
      title: "Government",
      component: <Government />,
    },
    {
      id: 3,
      title: "ABOUT e.gov",
      component: <AboutEGov />,
    },
  ]);

  return (
    <>
      <div
        className={cn(
          "transition ease-in-out fixed left-0 right-0 w-full top-0 z-[100] bg-white h-[635px] lg:h-[424px] overflow-auto",
          open
            ? "translate-y-[80px] lg:translate-y-[120px]"
            : "-translate-y-[650px]"
        )}
      >
        {width < 992 ? (
          <>
            <div className="px-6 pt-4">
              <Input
                placeholder="Search for services, news e.tc"
                className="bg-white rounded-xl"
                inputClassName="!h-[48px] rounded-xl w-full"
              // prefix={
              //   <Search2Icon className="fill-gray-500 h-[20px] w-[20px]" />
              // }
              />
            </div>

            <MobileNav />
          </>
        ) : (
          <div className="grid grid-cols-2 h-full">
            <div className="bg-[#F8FAFB] h-full pt-4 app_container">
              <h4 className="font-instrumentSans font-bold text-[14px] text-[#475467]">
                Service Providers
              </h4>

              <div className="flex mt-[28px]">
                <div className="flex-1">
                  <ul
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      rowGap: "16px",
                    }}
                  >
                    {data.map((item, index) => (
                      <li key={index} className="">
                        <Link
                          href={item.link}
                          className="group text-[14px] font-medium text-gray-500 uppercase hover:font-bold hover:text-green-500 flex items-center"
                        >
                          <span>{item.title}</span>

                          {/* <LinkIcon className="ml-[5px] group-hover:visible invisible" /> */}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-[190px]">
                  <div className="border border-[#E4E7EC] relative w-[190px] h-[146px] rounded">
                    <Image
                      src="/images/nimc.jpeg"
                      alt="advert"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 pl-[40px] app_right_container">
              <ul className="flex space-x-6">
                {tabs.map((tab, index) => (
                  <li key={index}>
                    <button
                      className={cn(
                        "text-[14px] font-instrumentSans",
                        activeTab === tab.id
                          ? "text-[#028F48] font-semibold"
                          : "text-[#475467] font-normal"
                      )}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.title}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-4">{tabs[activeTab - 1].component}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

type AccordionProps = {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  content,
  isOpen,
  onToggle,
}) => {
  const [height, setHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200 mx-6">
      <button
        className="w-full py-2 text-left text-lg font-medium text-gray-700 focus:outline-none"
        onClick={onToggle}
      >
        <div className="flex justify-between items-center">
          <span
            className={cn("text-[#475467] text-[14px]", isOpen && "font-bold")}
          >
            {title}
          </span>
          {/* <BackArrowIcon
            className={cn(!isOpen ? "rotate-180" : "-rotate-90")}
          /> */}
        </div>
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-max-height duration-300 ease-in-out"
      >
        <div className="py-2">{content}</div>
      </div>
    </div>
  );
};

export default NavModal;

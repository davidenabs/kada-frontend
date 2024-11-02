"use client";
import Tab from "@/components/common/tab";
import Input from "@/components/form/input";
import { CelebrateIcon, SearchIcon, StorefrontIcon } from "@/icons";
import {
  BriefcaseIcon,
  ChatBubbleLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import React, { useState } from "react";
import Services from "./services";
import Products from "./products";
import { KadaButton } from "@/components/form/button";
import Gallery from "@/components/dashboards/farmer/gallery";

function VendroServiceSharedPage() {
  const [activeTab, setActiveTab] = useState("Our Services");
  const tabs = [
    {
      id: "our-services",
      label: "Our Services",
      badge: 3,
      icon: BriefcaseIcon,
    },
    {
      id: "products",
      label: "Products",
      badge: 0,
      icon: BriefcaseIcon,
    },
  ];

  return (
    <section className="flex gap-x-[270px]">
      <div className="flex-1 space-y-4">
        <div className="border bg-white rounded-2xl border-[#ECF2F6] p-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-6">
              <div className="relative h-[120px] w-[209px]">
                <Image
                  src="/images/bdo.png"
                  alt="Vendor Image"
                  fill
                  className="object-cover rounded-[10px]"
                />
              </div>

              <div className="">
                <h4 className="text-[#101928] text-[20px] font-semibold">
                  GreenSprout Seeds Co
                </h4>
                <p className="text-[#1D2739] text-xs">
                  Seed/Planting Materials
                </p>
                <div className="flex">
                  <span className="text-sm">(91)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.2"
                  d="M5.10562 18.8944C4.24312 18.0319 4.815 16.2197 4.37625 15.1584C3.92062 14.0625 2.25 13.1719 2.25 12C2.25 10.8281 3.92062 9.9375 4.37625 8.84156C4.815 7.78125 4.24312 5.96812 5.10562 5.10562C5.96812 4.24312 7.78125 4.815 8.84156 4.37625C9.94219 3.92062 10.8281 2.25 12 2.25C13.1719 2.25 14.0625 3.92062 15.1584 4.37625C16.2197 4.815 18.0319 4.24312 18.8944 5.10562C19.7569 5.96812 19.185 7.78031 19.6238 8.84156C20.0794 9.94219 21.75 10.8281 21.75 12C21.75 13.1719 20.0794 14.0625 19.6238 15.1584C19.185 16.2197 19.7569 18.0319 18.8944 18.8944C18.0319 19.7569 16.2197 19.185 15.1584 19.6238C14.0625 20.0794 13.1719 21.75 12 21.75C10.8281 21.75 9.9375 20.0794 8.84156 19.6238C7.78125 19.185 5.96812 19.7569 5.10562 18.8944Z"
                  fill="#00A551"
                />
                <path
                  d="M5.10562 18.8944C4.24312 18.0319 4.815 16.2197 4.37625 15.1584C3.92063 14.0625 2.25 13.1719 2.25 12C2.25 10.8281 3.92063 9.9375 4.37625 8.84156C4.815 7.78125 4.24312 5.96812 5.10562 5.10562C5.96812 4.24312 7.78125 4.815 8.84156 4.37625C9.94219 3.92063 10.8281 2.25 12 2.25C13.1719 2.25 14.0625 3.92063 15.1584 4.37625C16.2197 4.815 18.0319 4.24312 18.8944 5.10562C19.7569 5.96812 19.185 7.78031 19.6238 8.84156C20.0794 9.94219 21.75 10.8281 21.75 12C21.75 13.1719 20.0794 14.0625 19.6238 15.1584C19.185 16.2197 19.7569 18.0319 18.8944 18.8944C18.0319 19.7569 16.2197 19.185 15.1584 19.6238C14.0625 20.0794 13.1719 21.75 12 21.75C10.8281 21.75 9.9375 20.0794 8.84156 19.6238C7.78125 19.185 5.96812 19.7569 5.10562 18.8944Z"
                  stroke="#00A551"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.25 12.75L10.5 15L15.75 9.75"
                  stroke="#00A551"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span className="font-inter text-xs">Verified Vendor</span>
            </div>
          </div>
        </div>

        <div className="border bg-white rounded-2xl border-[#ECF2F6] p-4 space-y-6">
          <div className="flex justify-between">
            <div className="flex">
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  title={tab.label}
                  active={activeTab}
                  onClick={() => setActiveTab(tab.label)}
                  count={Number(tab.badge)}
                  className="max-lg:flex-1"
                  icon={tab.icon}
                />
              ))}
            </div>

            <div className="">
              <Input
                placeholder="Search here..."
                inputClassName="!rounded-[10px]"
                className="!w-[500px]"
                prefix={<SearchIcon />}
              />
            </div>
          </div>

          {activeTab === "Our Services" ? <Services /> : <Products />}
        </div>
      </div>

      <div className="w-[270px] space-y-6 divide-y">
        <div className="flex p-4 bg-[#F5EBCE] rounded-2xl gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#E3A840]">
            <CelebrateIcon className="w-3 h-3 fill-white" />
          </div>

          <p className="text-sm font-inter">Get in touch with this vendor</p>
        </div>

        <div className="border bg-white border-[#ECF2F6] rounded-2xl">
          <div className="border-b border-[#ECF2F6] p-4">
            <h4 className="text-sm">Contact Information</h4>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#00A551]">
                  <PhoneIcon className="w-4 h-4 fill-white" />
                </div>
                <span className="text-xs">+234 816 123 4567</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#00A551]">
                  <EnvelopeIcon className="w-4 h-4 fill-white" />
                </div>
                <span className="text-xs">Xreme@gmail.com</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#00A551]">
                    <StorefrontIcon className="w-4 h-4 fill-white" />
                  </div>
                </div>
                <div className="">
                  <span className="text-xs">
                    GreenSprout Agro Mart 12 Independence Way, Kawo, Kaduna,
                    Kaduna State, Nigeria.
                  </span>
                </div>
              </div>
            </div>
            <KadaButton
              className="w-full !bg-black mt-6"
              leftIcon={<ChatBubbleLeftIcon className="w-5 h-5" />}
            >
              Chat with Vendor
            </KadaButton>
          </div>
        </div>

        <div className="border bg-white border-[#ECF2F6] rounded-2xl overflow-hidden">
          <div className="border-b border-[#ECF2F6] p-4">
            <h4 className="text-sm">Gallery</h4>
          </div>

          <div className="">
            <Gallery />
          </div>
        </div>
      </div>
    </section>
  );
}

export default VendroServiceSharedPage;

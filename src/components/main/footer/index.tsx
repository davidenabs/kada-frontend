"use client"
import React from 'react';
import ZonalOffices from './zonal-office';
import ContactInformation from './contact-info';
import SocialMediaLinks from './sm-links';
import Link from 'next/link';

const Footer: React.FC = () => {

  return (
    <footer className="flex flex-col overflow-hidden">
      <div className="flex flex-col py-px pl-20 w-full bg-zinc-50 max-md:pl-0">
        <div className="flex gap-5 max-md:flex-col">
          {/* Column 1 */}
          <div className="flex flex-col w-[39%] max-md:w-full max-md:px-5">
            <div className="flex flex-col mt-16 w-full max-md:mt-10">
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-[64%] max-md:w-full">
                  <div className="flex flex-col grow mt-16 text-sm tracking-wide leading-5 text-zinc-500 max-md:mt-10">
                    <img

                      src="/images/logo.svg"
                      alt="Kaduna State Agricultural Development Agency Logo"
                      className="object-contain max-w-full w-[136px]"
                    />
                    <p className="mt-8">
                      Kaduna State Agricultural Development Agency paves the way for a sustainable future in Kaduna. Kaduna State Agricultural Development Agency paves the way for a sustainable future in Kaduna.
                    </p>
                  </div>
                </div>

                {/* Column 1 - Right */}
                <div className="flex flex-col w-[36%] max-md:w-full">
                  <div className="flex flex-col text-sm leading-snug text-teal-700 max-md:mt-10">
                    <h3 className="text-base leading-tight text-zinc-700">Products & Services</h3>
                    <Link className="mt-7 tracking-wide" href={'#'}>Crop Management</Link>
                    <Link href={'#'} className="mt-7 tracking-wide">Kada Portal</Link>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              <div className="hidden md:flex gap-5 justify-between mt-[290px] text-xs font-light leading-tight text-black max-w-full w-[417px] ">
                <Link href={'#'}>All rights reserved</Link>
                <Link href={'#'}>Privacy Policy</Link>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col w-[23%] max-md:w-full max-md:px-5">
            <div className="flex flex-col items-start mt-16 max-md:mt-10">
              <div className="flex flex-col max-md:ml2.5">
                <div className="flex flex-col text-sm text-zinc-700 w-[255px] max-w-full">
                  <h3 className="text-base leading-tight">Head Office</h3>
                  <p className="mt-5 font-bold tracking-wide leading-snug">Kaduna</p>
                  <p className="mt-5 tracking-wide leading-5 text-zinc-500">
                    No 1, Aliyu Makama by Gashashi Road, Barnawa GRA P.M.B 2269, Kaduna, Kaduna State.
                  </p>
                </div>
                <ZonalOffices />
                <Link href={'#'} className="mt-16 text-xs font-light leading-tight text-black hidden md:block">
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col w-[38%] max-md:w-full">
            <div className="flex relative justify-center items-center flex-col grow px-20 pt-7 pb-36 text-white min-h-[731px] max-md:px-5 max-md:pb-24 max-md:mt-8">
              <img

                src="/images/footer-bg.png"
                alt=""
                className="object-cover absolute inset-0 w-full h-full"
              />
              <ContactInformation />
              <SocialMediaLinks />
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
"use client"
import ContactCard from '@/components/main/contact-sections/card';
import ContactForm from '@/components/main/contact-sections/contact-form';
import OfficeInfo from '@/components/main/contact-sections/info';
import React from 'react';

interface ContactInfo {
    icon: string;
    title: string;
    details: string[];
}

interface OfficeDetails {
    name: string;
    address: string;
}

const ContactUs: React.FC = () => {
    const contactInfo: ContactInfo[] = [
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cbda4059657d06c537f34a340991be5beedff0aa691ce246ed53ecf0e585213c?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
            title: "Call/WhatsApp",
            details: ["+2348091947789", "+2348023023039"]
        },
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dbeee2692aa6950454f8d20cc6f4c30632b7d9d4ac47de5994c719828e14e5ff?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
            title: "E-mails",
            details: ["kadphq@yahoo.com", "muhammad.rii@kdsg.gov.ng"]
        },
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8937116792d4c23b6a481a409dd63643d28a57b81378ba83609b132b53cd2e0e?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
            title: "Social Media",
            details: ["@kadakdsg", "@kadakdsg"]
        }
    ];

    const officeDetails: OfficeDetails[] = [
        {
            name: "HEAD OFFICE :",
            address: "No 1, Aliyu Makama by Gashashi Road, Barnawa GRA P.M.B 2269, Kaduna, KadunaState"
        },
        {
            name: "MAIGANA ZONAL OFFICE :",
            address: "No 1, Aliyu Makama by Gashashi Road, Barnawa GRA P.M.B 2269, Kaduna, KadunaState"
        },
        {
            name: "SAMARU AGRIC ZONAL OFFICE :",
            address: "No 1, Aliyu Makama by Gashashi Road, Barnawa GRA P.M.B 2269, Kaduna, KadunaState"
        },
        {
            name: "LERE AGRIC ZONAL OFFICE :",
            address: "No 1, Aliyu Makama by Gashashi Road, Barnawa GRA P.M.B 2269, Kaduna, KadunaState"
        },
        {
            name: "BIRNIN-GWARI AGRIC ZONAL OFFICE :",
            address: "No 1, Aliyu Makama by Gashashi Road, Barnawa GRA P.M.B 2269, Kaduna, KadunaState"
        }
    ];

    return (
        <main className="flex flex-col items-center pt[123px] py-[75px]">
            <header className="flex relative flex-col justify-center items-center self-stretch px-20 py-64 w-full font-bold min-h-[686px] max-md:px-5 max-md:py-24 max-md:max-w-full">
                <img src="/images/contact-header-banner.png" alt="" className="object-cover absolute inset-0 size-full" />
                <div className="flex relative flex-col mb-0 w-full max-w-[1107px] max-md:mb-2.5 max-md:max-w-full">
                    <h1 className="self-center text-3xl leading-tight text-amber-300">
                        CONTACT US
                    </h1>
                    <h2 className="mt-7 text-6xl text-center text-white leading-[67px] max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
                        kaduna Agricultural Development Agency (KADA)
                    </h2>
                </div>
            </header>
            <section className="app_container z-10 -mt-36 w-full">
                <div className="flex gap-5 max-md:flex-col">
                    {contactInfo.map((info, index) => (
                        <ContactCard key={index} {...info} />
                    ))}
                </div>
            </section>
            <OfficeInfo offices={officeDetails} />

            <ContactForm onSubmit={() => { }} />
        </main>
    );
};

export default ContactUs;
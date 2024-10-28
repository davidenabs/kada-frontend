"use client"
import React from 'react';
import ContactForm from './form';
import { APIProvider } from "@vis.gl/react-google-maps";
import KadaMap from './map';


const ContactUs: React.FC = () => {
    return (
        <section className="app_container items-center pt-[123px] md:py-[165px] bg-[#fefffd]">
            <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                    <ContactForm />
                </div>
                <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                    {/* <ContactImage /> */}
                    <APIProvider apiKey={'AIzaSyAvkhDxmPb13MrAYy48R7dreVXXuYyIwUs'}>
                        <KadaMap />
                    </APIProvider>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
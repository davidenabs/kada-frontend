"use client"
import React, { useState } from 'react';
import CommitteeMember from './members';
import LocalGovernmentSelector from './lg-sector';
import { Swiper } from 'swiper/react';

import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Button from '@/components/form/button';

const CommunityAids: React.FC = () => {
    const committeeMembers = [
        { name: 'John Doe', role: 'Committee chairman KALAC', imageSrc: '/images/rili.png' },
        { name: 'John Doe', role: 'Committee chairman KALAC', imageSrc: '/images/rili.png' },
        { name: 'John Doe', role: 'Committee chairman KALAC', imageSrc: '/images/rili.png' },
        { name: 'John Doe', role: 'Committee chairman KALAC', imageSrc: '/images/rili.png' },
        { name: 'John Doe', role: 'Committee chairman KALAC', imageSrc: '/images/rili.png' },
        { name: 'John Doe', role: 'Committee chairman KALAC', imageSrc: '/images/rili.png' },
    ];


    const [activeTab, setActiveTab] = useState('KALAC');


    const renderCommitteeContent = () => {
        if (activeTab === 'KALAC') {
            return (
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar]}
                    spaceBetween={30}
                    slidesPerView={1}  // Adjust the number of slides per view
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    className="mt-9 max-md:max-w-full"
                >
                    <div className="grid md:grid-cols-3 gap-10 items-start mt-9 max-md:max-w-full">
                        {committeeMembers.slice().map((member, index) => (
                            <CommitteeMember key={index} {...member} />
                        ))}
                    </div>
                </Swiper>
            );
        } else if (activeTab === 'KAWAC') {
            return <p>Content for KAWAC</p>;
        } else if (activeTab === 'ZACO') {
            return <p>Content for ZACO</p>;
        } else if (activeTab === 'SADEC') {
            return <p>Content for SADEC</p>;
        }
    };


    return (
        <div className="app_container py-[123px] md:py-[165px] flex flex-col">

            <section className="flex flex-wrap gap-5 justify-center ">

                <div className="flex flex-col items-center self-start max-md:max-w-full">
                    <h1 className="text-3xl font-bold leading-tight text-right text-zinc-700">
                        COMMUNITY AIDS
                    </h1>
                    <div className="flex max-md:flex-col gap-5 md:justify-between md:items-end self-stretch mt-7 w-full text-base text-center max-md:max-w-full">
                        <LocalGovernmentSelector />
                        {/* buttons to tap */}
                        <div className="flex gap-3 mt-7 font-bold whitespace-nowrap">

                            <Button
                                className={`px-16 !py-2 rounded-[33px] max-md:px-5 !shadow-none ${activeTab === 'KALAC' ? '!bg-zinc-700 text-white' : 'border-[0.5px] !bg-white text-zinc-700 border-zinc-700'
                                    }`}
                                handleClick={() => setActiveTab('KALAC')}
                            >
                                KALAC
                            </Button>
                            <Button
                                className={`px-16 !py-2 rounded-[33px] max-md:px-5 !shadow-none ${activeTab === 'KAWAC' ? '!bg-zinc-700 text-white' : 'border-[0.5px] !bg-white text-zinc-700 border-zinc-700'
                                    }`}
                                handleClick={() => setActiveTab('KAWAC')}
                            >
                                KAWAC
                            </Button>
                            <Button
                                className={`px-16 !py-2 rounded-[33px] max-md:px-5 !shadow-none ${activeTab === 'ZACO' ? '!bg-zinc-700 text-white' : 'border-[0.5px] !bg-white text-zinc-700 border-zinc-700'
                                    }`}
                                handleClick={() => setActiveTab('ZACO')}
                            >
                                ZACO
                            </Button>
                            <Button
                                className={`px-16 !py-2 rounded-[33px] max-md:px-5 !shadow-none ${activeTab === 'SADEC' ? '!bg-zinc-700 text-white' : 'border-[0.5px] !bg-white text-zinc-700 border-zinc-700'
                                    }`}
                                handleClick={() => setActiveTab('SADEC')}
                            >
                                SADEC
                            </Button>
                        </div>
                    </div>
                    <h2 className="mt-28 text-2xl md:text-3xl font-semibold leading-tight text-zinc-700 max-md:mt-10 max-md:max-w-full">
                        {activeTab === 'KALAC' ? 'Kaduna Agric Committee (KALAC)' : activeTab === 'KAWAC' ? 'Kaduna World Agric Committee (KAWAC)' : activeTab === 'ZACO' ? 'Zambia Cooperative Committee (ZACO)' : 'South African Development Committee (SADEC)'}

                    </h2>
                    {renderCommitteeContent()}

                </div>
            </section>
        </div>
    );
};

export default CommunityAids;
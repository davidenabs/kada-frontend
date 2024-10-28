"use client"
import React, { useState } from 'react';
import PricingTabs from './tab';
import { LandPricing, Stakeholders } from './tab-content';

const PricingSection: React.FC = () => {

    const [tab, setTab] = useState('farmers');

    const tabContent = () => {

        if (tab === 'farmers')
            return <LandPricing />
        else if (tab === 'stakeholders')
            return <Stakeholders />
    };

    return (
        <div className="flex flex-col rounded-none mt-10">
            <PricingTabs tab={tab} setTab={setTab} />
            
            {tabContent()}
        </div>
    );
};

export default PricingSection;
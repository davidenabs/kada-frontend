"use client"
import CooperativeProfileSetup from '@/components/account-setup/cooperative/profile';
import React, { useState } from 'react';

const CooperativePage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleSkip = () => {
        // Handle skip logic (e.g., redirect to dashboard)
        console.log('Skipped!');
    };

    return (
        <div className="app_container">
            <CooperativeProfileSetup
                currentStep={currentStep}
                totalSteps={totalSteps}
                onNext={handleNext}
                onSkip={handleSkip}
            />
        </div>
    );
};

export default CooperativePage;

"use client"
import React from 'react';
import ProgressBar from './progress';
import Button from '@/components/form/button';

interface CooperativeProfileSetupProps {
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onPrevious?: () => void;
    onSkip?: () => void;
}

const CooperativeProfileSetup: React.FC<CooperativeProfileSetupProps> = ({ currentStep, totalSteps, onNext, onSkip }) => {
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <img
                            src="/images/help-hand.svg"
                            alt="Profile setup illustration"
                            className="object-contain aspect-square w-[78px]"
                        />
                        <div className='self-stretch text-center'>
                            <h2 className="mt-2 text-xl font-bold leading-tight text-zinc-700 max-md:max-w-full">
                                What's the name of your Cooperative Society?
                            </h2>
                            <div className="flex flex-col justify-center items-center self-stretch mt-14 w-full text-lg font-light leading-tight text-slate-500 max-md:mt-10 max-md:max-w-full">
                                <label htmlFor={'cooperativeName'} className="sr-only">{'Enter cooperative name'}</label>
                                <input
                                    type="text"
                                    id="cooperativeName"
                                    placeholder="Enter cooperative name"
                                    className="w-full text-center border- border-t-0 border-r-0 border-l-0 border-b border-solid border-stone-300 pb-2 focus:outline-none focus:border-b focus:ring-stone-800 focus:border-0 focus:ring-0"
                                    aria-label="Enter cooperative name"
                                />
                            </div>
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <img
                            src="/images/start-badge.png"
                            alt="Profile setup illustration"
                            className="object-contain aspect-square w-[78px]"
                        />
                        <div className='self-stretch text-center'>
                            <h2 className="mt-2 text-xl font-bold leading-tight text-zinc-700 max-md:max-w-full">
                                When was this organization established?
                            </h2>
                            <div className="flex flex-col justify-center items-center self-stretch mt-14 w-full text-lg font-light leading-tight text-slate-500 max-md:mt-10 max-md:max-w-full">
                                <label htmlFor="establishmentDate" className="sr-only">{'Enter cooperative date'}</label>
                                <input
                                    type="date"
                                    id="establishmentDate"
                                    className="w-full text-center border- border-t-0 border-r-0 border-l-0 border-b border-solid border-stone-300 pb-2 focus:outline-none focus:border-b focus:ring-stone-800 focus:border-0 focus:ring-0"
                                    aria-label="Enter cooperative date"
                                />
                            </div>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="flex flex-col items-center leading-tight">
                            <h1 className="text-xl font-bold text-zinc-700">{'Dashboard Overview'}</h1>
                            <p className="mt-1 text-base font-medium text-center text-slate-500">{'Learn more about the Cooperative Dashboard'}</p>
                        </div>
                        <img
                            src="/images/dashboard-sh.png"
                            alt="Dashboard Overview"
                            className="object-contain self-stretch mt-8 w-full aspect-[1.75] rounded-[32px] max-md:max-w-full"

                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <main className="flex flex-col items-center rounded-none max-w-[600px] mx-auto my-auto">
            {currentStep < 3 && (
                <>
                    <header>
                        <h1 className="text-base font-medium leading-tight text-slate-500">
                            SETUP YOUR PROFILE
                        </h1>
                    </header>

                    <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                </>
            )}

            {/* Render step content */}
            <div className='w-full mt-32 max-md:mt-10 flex flex-col items-center'>
                {renderStepContent()}
            </div>

            <div className="flex gap-3 mt-9 max-w-full justify-center">
                <Button className="!px-10 !w-fit !rounded-full mt-20 !py-3" handleClick={onNext}>
                    Continue
                </Button>
                {currentStep === 3 && (
                    <Button className="!px-10 !w-fit !rounded-full mt-20 !py-3 !bg-green-50 !text-zinc-700 !shadow-none" handleClick={onSkip}>
                        Skip
                    </Button>
                )}
            </div>
        </main>
    );
};

export default CooperativeProfileSetup;

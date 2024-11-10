import { ArrowRight } from '@/icons';
import Link from 'next/link';
import React from 'react';

interface ActionButtonProps {
    path: string;
    text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ path, text }) => {
    return (
        <Link href={path} className="flex overflow-hidden flex-col justify-center self-stretch text-start px-2.5 py-7 my-auto leading-4 bg-white rounded-lg border border-solid border-slate-100 min-w-[240px] w-[251px]">
            <div className="flex gap-10 justify-between items-center w-full">
                <div className="self-stretch my-auto whitespace-pre-line">{text}</div>
                <ArrowRight className="w-3 h-3" />
            </div>
        </Link>
    );
};

interface MarketActionsProps { }

const MarketActions: React.FC<MarketActionsProps> = () => {
    const actions = [
        { text: "See Market Product\nPricing", path: "/" },
        { text: "Explore other markets", path: "/" }
    ];

    return (
        <div className="flex flex-wrap gap-4 items-center self-start text-start mt-12 text-sm font-medium text-zinc-800 max-md:mt-10">
            {actions.map((action, index) => (
                <ActionButton key={index} text={action.text} path={action.path} />
            ))}
        </div>
    );
};

export default MarketActions;
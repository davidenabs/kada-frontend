// import useScreenSize from '@/hooks/use-screen-size';
import { appAtom } from '@/stores/app';
import { useAtom } from 'jotai';
import React from 'react';

const Header: React.FC = () => {
    // const { width } = useScreenSize()
    const [app,] = useAtom(appAtom);
    return (
        <header className="flex overflow-hidden flex-col pb-10 w-full bg-white max-md:max-w-full">
            <div className="flex flex-wrap gap-5 justify-between px-11 py-2.5 w-full leading-tight bg-white border-b border-zinc-100 max-md:px-5 max-md:max-w-full">
                <div className="flex gap-10 font-bold whitespace-nowrap text-zinc-700">
                    <div className="flex gap-1 text-sm">
                        <img loading="lazy" src="/images/logo.svg" alt="" className="object-contain shrink-0 aspect-square w-[39px]" />
                        <div className="my-auto">KADA</div>
                    </div>
                    {app.dashboardTitle && (
                        <div className="my-auto text-base">{app.dashboardTitle}</div>
                    )}
                </div>
                <div className="flex gap-1 items-start my-auto">
                    <img loading="lazy" src="/images/moses.png" alt="User avatar" className="object-contain shrink-0 w-7 rounded-md aspect-square" />
                    <div className="flex flex-col h-[29px]">
                        <div className="flex gap-1 items-end text-xs font-bold text-green-800">
                            <div>John Emmanuel</div>
                            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a372f2dd9322a139bfecb23005028dcb756c8893933af728ae33b2b858380cfc?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" alt="" className="object-contain shrink-0 w-3.5 aspect-square" />
                        </div>
                        <div className="text-xs font-light text-zinc-700">Admin</div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
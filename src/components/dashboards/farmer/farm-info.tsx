import React from 'react';


const FarmInfo: React.FC = () => {
    const crops = ['Corn', 'Soybean', 'Maize'];
    return (
        <section className="flex justify-start itemscenter grow p-6 self-center mt-6 w-full text-black rounded-3xl border border-solid border-teal-700 border-opacity-30 max-md:p-5 max-md:max-w-full">
            <div className="bg-white rounded-3xl shadow-lg h-[682px] w-[269px] flex flex-col items-center justifybetween">
                <div className="self-center">
                    <img
                        loading="lazy"
                        src="/images/crop-thumb.png"
                        className="object-contain w-60 max-w-full rounded-xl aspect-[2.28]"
                        alt="FGSC Farms"
                    />
                </div>
                <div className="self-center w-fit mt-2 text-center">
                    <h1 className="mt-6 text-lg font-bold">FGSC Farms</h1>
                    <p className="text-base font-thin pt-1">234 HECTRES</p>
                    <p className="text-sm font-thin pt-2 max-w-[213px]">Close to FGSC along, lorem ipsumn road, kaduna</p>
                </div>
                <button className="px-5 py-2.5 mt-6 mb-0 text-sm font-medium border-zinc-700 rounded-[60px] border-[0.5px]">
                    Edit Info
                </button>

                <div className="flex gap-1.5 justify-center text-sm font-thin mt-8 w-full text-black/85 whitespace-nowrap max-md:mr-1">
                    {crops.map((crop, index) => (
                        <span key={index} className="gap-2.5 self-stretch px-2.5 py-1 rounded border-zinc-200 border-[0.2px]">
                            {crop}
                        </span>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default FarmInfo;
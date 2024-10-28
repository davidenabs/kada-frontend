import React from 'react';

interface NavItem {
    label: string;
    isActive?: boolean;
}

const NavMenu: React.FC = () => {
    const navItems: NavItem[] = [
        { label: 'For Farmers', isActive: true },
        { label: 'For Individuals' },
        { label: 'For Cooperatives' },
        { label: 'For Kaduna' },
        { label: 'National Development' },
    ];

    return (
        <nav className="flex overflow-hidden flex-wrap gap-10 items-center px-1 py-0.5 mt-11 max-w-full text-base leading-none text-center bg-white rounded-[60px] text-zinc-700 w-[919px] max-md:mt-10">
            {navItems.map((item, index) => (
                <button
                    key={index}

                    className={`${item.isActive
                        ? 'self-stretch px-11 py-5 font-bold text-white bg-zinc-700 rounded-[33px] max-md:px-5'
                        : 'grow shrink self-stretch my-auto'
                        } ${!item.isActive ? 'w-[89px]' : ''}`}
                >
                    {item.label}
                </button>
            ))}
        </nav>
    );
};


const FarmerSection: React.FC = () => {
    return (
        <section className="self-stretch mt-16 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-zinc-700 max-md:mt-10 max-md:max-w-full">
                        <h3 className="self-start text-xl font-semibold leading-snug text-green-800">
                            FARMERS
                        </h3>
                        <h4 className="mt-7 mr-7 text-3xl font-bold leading-8 max-md:mr-2.5 max-md:max-w-full">
                            Fostering growth and development for all categories
                        </h4>
                        <p className="mt-9 text-lg leading-6 max-md:max-w-full">
                            Kaduna State Agricultural Development Agency paves the way for a sustainable future in Kaduna.
                            <br /><br />
                            Kaduna State Agricultural Development Agency paves the way for a sustainable future in Kaduna. Kaduna State Agricultural Development Agency paves the way for a sustainable future in Kaduna. Kaduna State Agricultural
                            <br /><br />
                            Development Agency paves the way for a sustainable future in Kaduna. Kaduna State Agricultural Development Agency paves the way for a sustainable future in Kaduna.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="flex relative flex-col grow items-end px-20 pt-56 min-h-[534px] rounded-[68px_68px_68px_68px] max-md:pt-24 max-md:mt-10 max-md:max-w-full">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/43f8ab9598acc13f4e6144469f99b917fcece839e1d69e56d5401c2ca21d4ddb?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" alt="" className="object-cover absolute inset-0 size-full" />
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6beb2e4fb03f3e673b49ef80105c30ffc85890e060e928735faed740475dc053?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" alt="" className="object-contain max-w-full aspect-[0.57] w-[174px]" />
                    </div>
                </div>
            </div>
        </section>
    );
};


const AboutKada: React.FC = () => {
    return (
        <div className="app_container relative py-[123px] md:py-[165px]">
            <section className="flex flex-col w-full max-md:max-w-full">
                {/* <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e006eae1002528de27a3b7dd40437969c5a5f1b3e87d7126ef3790a62e8af7d?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" alt="" className="object-cover absolute inset-0 size-full" /> */}
                <img loading="lazy" src="/images/vector-leaf-bg.svg" alt="" className="object- -right-0 -top-20 absolute w-[385px]" />
                <div className="flex overflow-hidden relative z-10 flex-col items-center self-center pt-16 pl-14 -mt-16 -mb-6 w-full border border-white border-solid bg-zinc-50 max-w-[1274px] rounded-[32px] shadow[0px_0px_10px_rgba(0,0,0,0.25)] max-md:pl-5 max-md:mb-2.5 max-md:max-w-full">
                    <h1 className="text-xl leading-none text-center text-green-800 uppercase">
                        About Kada
                    </h1>
                    <h2 className="mt-5 text-3xl font-bold leading-none text-center text-zinc-700 max-md:max-w-full">
                        Fostering growth and development for all
                    </h2>
                    <NavMenu />
                    <FarmerSection />
                </div>
            </section>
        </div>
    );
};

export default AboutKada;
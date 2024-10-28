import React from 'react';
import SearchBar from './search-bar';
import FilterDropdown from './filter';
import MarketTable from './table';

const MarketInformation: React.FC = () => {
    return (
        <section className="flex overflow-hidden flex-col px-10 pt-11 text-sm leading-tight rounded-lg bg-zinc-50 max-md:px-5 mt-10">
            <h1 className="self-start text-2xl font-semibold text-black">
                Market Information
            </h1>
            <div className="flex flex-wrap gap-5 justify-between mt-1 w-full max-md:max-w-full">
                <SearchBar />
                <div className="flex flex-wrap gap-5">
                    <FilterDropdown
                        label="Local Government"
                        defaultValue="-Kaduna South"
                        options={['-Kaduna South']}
                    />
                    <FilterDropdown
                        label="Type"
                        defaultValue="General Purpose"
                        options={['General Purpose']}
                    />
                </div>
                <FilterDropdown
                    label="Size of Market"
                    defaultValue="Small"
                    options={['Small']}
                    width="w-[175px]"
                />
            </div>
            <h2 className="self-start mt-8 text-base font-semibold text-teal-700">
                Names of Markets in Kaduna State and their day(s)
            </h2>
            <MarketTable />
        </section>
    );
};

export default MarketInformation;
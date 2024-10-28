import React from 'react';
import MonthButton from './month-button';

const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

const MonthCalendar: React.FC = () => {
    return (
        <section className="flex overflow-hidden flex-col px-14 py-11 text-xl font-semibold leading-tight text-black whitespace-nowrap bg-white rounded-lg max-w-[401px]">
            <div className="flex flex-col w-full">
                <div className="flex gap-10 items-start">
                    {months.slice(0, 3).map((month) => (
                        <div key={month} className="flex flex-col flex-1">
                            <MonthButton month={month} isActive={month === 'FEB'} />
                        </div>
                    ))}
                </div>
                <div className="flex gap-10 mt-5">
                    {months.slice(3, 6).map((month) => (
                        <div key={month} className="flex flex-col flex-1">
                            <MonthButton month={month} />
                        </div>
                    ))}
                </div>
                <div className="flex gap-10 mt-5">
                    {months.slice(6).map((month) => (
                        <div key={month} className="flex flex-col flex-1">
                            <MonthButton month={month} />
                        </div>
                    ))}
                </div>

                <div className="flex gap-10 mt-5">
                    {months.slice(9).map((month) => (
                        <div key={month} className="flex flex-col flex-1">
                            <MonthButton month={month} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MonthCalendar;
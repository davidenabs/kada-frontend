import CalendarKey from '@/components/main/pricing-sections/calender/key';
import CalendarLegend from '@/components/main/pricing-sections/calender/legend';
import MonthCalendar from '@/components/main/pricing-sections/calender/month-calender';
import CalendarView from '@/components/main/pricing-sections/calender/view';
import React from 'react'


const Calendar = () => {

    return (
        <div className='bg-[#F2F9F5]/50 app_container py-[113px] md:py-[135px]'>
            <div className="flex gap-5 max-md:flex-col mt-4">
                <section className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col w-full leading-tight text-black max-md:mt-10">
                        <CalendarView />
                        <h1 className="self-start mt-8 text-4xl font-semibold">
                            Cropping Calendar
                        </h1>
                        <MonthCalendar />
                        <CalendarKey />
                    </div>
                </section>
                <section className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col mt-3 w-full text-xs leading-tight text-zinc-700 max-md:mt-10 max-md:max-w-full">
                        <CalendarLegend />
                        <img

                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a130cf849fd030a1a238147373f1297020e9917b40b8106b7c10c56a67adcecd?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3"
                            alt="Detailed Cropping Calendar"
                            className="object-contain mt-7 w-full rounded-lg aspect-[0.74] max-md:max-w-full"
                        />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Calendar;
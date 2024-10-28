import Button from '@/components/form/button';
import Select from '@/components/form/select';
import Link from 'next/link';
import React from 'react';

const KeyValueArea: React.FC = () => {

    return (
        <section className="rounded-lg max-w-[624px] mx-auto">
            <div className="flex overflow-hidden flex-col items-center w-full bg-white rounded-lg border-zinc-400 border-[0.5px] border-opacity-50 max-md:max-w-full">

                <div className="flex self-stretch">
                    <img

                        src={'/images/de-key-header.png'}
                        alt=""
                        className="object-contain shrink-0 max-w-full aspect[1.14] w-full"
                    />
                </div>

                <h2 className="mt-4 text-2xl font-bold leading-tight text-zinc-700 max-md:mt-10">
                    Key Value Area
                </h2>

                <div className='p-12 self-stretch flex flex-col items-center'>
                    <div className="flex flex-col mt-5 self-stretch  whitespace-nowrap">
                        <label htmlFor="phone" className="text-sm font-medium text-zinc-700">Product/Service Category</label>

                        {/* <Input prefix={'+234'} type="tel" id="phone" placeholder="" className='!py-3 h-[40px]' /> */}

                        <Select options={[]} value={'select option'} setValue={() => { }} className='!py-4'>

                        </Select>

                    </div>

                    <Link href={'/account-setup/profile/data-enumerator/welcome'}>
                        <Button className='!px-10 !py-3 mt-10 text-sm font-bold !w-fit !rounded-full'>Continue</Button></Link>
                </div>
            </div>
        </section>
    );
};

export default KeyValueArea;
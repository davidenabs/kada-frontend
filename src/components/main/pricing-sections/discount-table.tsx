import Button from '@/components/form/button';
import { useRouter } from 'next/navigation';
import React from 'react';

interface DiscountRow {
    range: string;
    discount: string;
}

const discountData: DiscountRow[] = [
    { range: '0 to 4.9', discount: 'No Discount' },
    { range: '5.0 to 19.9', discount: '2%' },
    { range: '20.9 to 99.9', discount: '5%' },
    { range: '100.0 to 249.9', discount: '7%' },
    { range: '250.0+', discount: 'Contact sales' },
];

const DiscountTable: React.FC = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">

            <div className="flex flex-col mt-1 w-full leading-tight max-md:mt-10 max-md:max-w-full">

                <div className="flex justify-between px-10 pb-3 text-base font-medium text-green-800">
                    <h2 className='w-fit'>Land size (Hectares)</h2>
                    <h2 className='pr-[36px]'>Discount</h2>
                </div>

                <div className="flex flex-wrap items-start p-10 text-base font-medium text-black bg-teal-700 bg-opacity-10 maxmd:px-5 max-md:max-w-full justify-between">
                    <div className="flex flex-col items-start w[93px]">
                        {discountData.map((row, index) => (
                            <div key={index} className={index > 0 ? 'mt-4' : ''}>
                                {row.range}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-start w[91px]">
                        {discountData.map((row, index) => (
                            <div key={index} className={`${index > 0 ? 'mt-4' : ''} ${row.discount === 'Contact sales' ? 'text-green-800' : ''}`}>
                                {row.discount}
                            </div>
                        ))}
                    </div>
                </div>
                <Button handleClick={()=> router.push('/pricing/markets')} className='!px-5 !py-3.5 mt-4 text-sm font-bold !rounded-2xl !w-fit'>
                    Get Started
                </Button>
            </div>
        </div>
    );
};

export default DiscountTable;
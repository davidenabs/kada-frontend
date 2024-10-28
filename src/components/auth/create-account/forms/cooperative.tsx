import Button from '@/components/form/button';
import Input from '@/components/form/input';
import Password from '@/components/form/password';
import { useRouter } from 'next/navigation';
import React from 'react';

const CooperativeForm: React.FC = () => {
    const router = useRouter();
    return (

        <form className="flex flex-col items-start lg:px-8 mt20 max-md:mt-10">
            <div className="flex flex-col">
                <h2 className="text-base font-bold text-teal-700">Cooperative</h2>
                <p className="mt-1 text-sm font-medium text-zinc-500">Please complete the form to get started</p>
            </div>
            <div className="flex flex-col mt-9 self-stretch">
                <label htmlFor="email" className="text-sm font-medium text-zinc-700">Email</label>
                <Input placeholder="Enter your email" className='!py-3  h-[40px]' />
            </div>
            <div className="flex flex-col mt-5 self-stretch">
                <label htmlFor="firstName" className="text-sm font-medium text-zinc-700">Cooperative name</label>
                <Input id="firstName" placeholder="What is your company name" className='!py-3  h-[40px]' />

            </div>

            <div className="flex flex-col mt-5 self-stretch whitespace-nowrap">
                <label htmlFor="phone" className="text-sm font-medium text-zinc-700">Phone</label>

                <Input prefix={'+234'} type="tel" id="phone" placeholder="" className='!py-3  h-[40px]' />

            </div>

            <div className="flex flex-col mt-5 self-stretch whitespace-nowrap">
                <label htmlFor="password" className="text-sm font-medium text-zinc-700">Create Password</label>

                <Password id="password" placeholder={'*******'} className='!py-3  h-[40px]' />
            </div>

            <div className="flex flex-col mt-5 self-stretch whitespace-nowrap">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-700">Confirm Password</label>


                <Password id="confirmPassword" placeholder={'*******'} className='!py-3  h-[40px]' />
            </div>

            <div className="flex flex-col mt-9 self-stretch">
                <div className="flex gap-1.5 items-center text-sm font-light text-zinc-700">
                    <input type="checkbox" id="terms" className="w-3 h-3 border border-solid border-zinc-700" />
                    <label htmlFor="terms" className="self-stretch my-auto">
                        <span className="font-medium">I agree with the terms and conditions of this application</span>
                    </label>
                </div>
                <Button handleClick={() => router.push(
                    '/account-setup/verify-email?type=cooperative'
                )} className='!rounded-full !py-4 mt-3.5 w-full'> Create Account</Button>
            </div>
        </form>
    );
};

export default CooperativeForm;
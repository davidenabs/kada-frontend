"use client"
import Button from '@/components/form/button';
import AppLoader from '@/components/shared/loader';
import useUserType from '@/hooks/use-user-type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const EmailVerificationPage: React.FC = () => {

    const router = useRouter();
    const { userType, loaded } = useUserType();
    let route = '';

    if (!loaded) { return <AppLoader /> }

    if (userType === 'farmer') { route = '/account-setup/profile'; }
    else if (userType === 'guest') { route = '/account-setup/profile/nimc'; }
    else if (userType === 'cooperative') { route = '/account-setup/profile/cooperative'; }
    else if (userType === 'data-enumerator') { route = '/account-setup/profile/data-enumerator'; }
    else { route = '/sign-in'; }

    return (
        <div className="app_container my-auto">
            <section className=" flex overflow-hidden flex-col text-center justify-center items-center max-md:px-5 px-20 py-16 mt-24 bg-white rounded-lg border-[0.5px] border-zinc-400 border-opacity-50 w-full md:w-[624px] max-md:mt-10 mx-auto">
                <div className="flex flex-col items-center max-w-full w[394px]">
                    <h1 className="text-2xl text-zinc-700 font-bold">Please Verify your email!</h1>
                    <p className="mt-7 font-thin leading-6 text-center text-zinc-500">
                        You are almost there! We sent an email to testjerry@gmail.com
                    </p>
                    <p className="self-stretch mt-2.5 font-thin leading-6 text-center text-zinc-500">
                        just click on the link to complete your sign up process. if you didn't receive the mail. please check your spam folder
                    </p>

                    <Button handleClick={() => router.push(route)} className="!rounded-full mt-7 !py-3 !px-10 !w-fit">
                        Resend request
                    </Button>

                    <Link href="/sign-in" className="mt-7 text-base font-semibold text-teal-700">
                        Log in to your account
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default EmailVerificationPage;
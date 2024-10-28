"use client"
import CooperativeForm from '@/components/auth/create-account/forms/cooperative';
import DataEForm from '@/components/auth/create-account/forms/data-enumerator';
import FarmerForm from '@/components/auth/create-account/forms/farmer';
import GuestForm from '@/components/auth/create-account/forms/guest';
import AppLoader from '@/components/shared/loader';
import useUserType from '@/hooks/use-user-type';
import React from 'react';

const CreateAccountPage: React.FC = () => {
    const { userType, loaded } = useUserType();

    if (!loaded) {
        return (
            <div className="flex items-center justify-center h-[200px]">
                <AppLoader />
            </div>
        );
    }

    return <>
        {userType === "farmer" ? (
            <FarmerForm />
        ) : userType === "cooperative" ? (
            <CooperativeForm />
        ) : userType === "dataEnumerator" ? (
            <DataEForm />
        ) : userType === "guest" ? (
            <GuestForm />
        ) : (
            <p className='text-gray-400 my-auto mx-auto'>Invalid user type</p>
        )}
    </>;
};

export default CreateAccountPage;
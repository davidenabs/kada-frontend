"use client"
import React from 'react';

const SubmitButton: React.FC = () => {
    return (
        <button
            type="submit"
            className="overflow-hidden self-center px-16 py-3 mt-3 max-w-full text-base font-bold text-amber-300 whitespace-nowrap bg-green-800 rounded-[60px] w-[538px] max-md:px-5"
        >
            Submit
        </button>
    );
};

interface InputFieldProps {
    name: string;
    label: string;
    type?: string;
    className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, label, type = 'text', className = '' }) => {
    return (
        <div className={`grow w-fit max-md:pr-5 max-md:max-w-full ${className}`}>
            <label htmlFor={name} className="sr-only">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={label}
                className="p-4 w-full bg-white border border-solid border-stone-900"
                aria-label={label}
            />
        </div>
    );
};

interface ContactFormProps {
    onSubmit: (formData: FormData) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col text-xl leading-tight text-black rounded-none mt-10 w-fulll">
            <div className="self-center text-2xl font- leading-none text-center text-green-800">
                <h1>Send Us a Message</h1>
            </div>
            <div className="mt-14 max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-wrap gap-6 w-full">
                    <InputField name="firstName" label="First Name" />
                    <InputField name="lastName" label="Last Name" />
                </div>
                <div className="flex flex-wrap gap-6 mt-6 w-full">
                    <InputField name="email" label="E-mail Address" type="email" />
                    <InputField name="phone" label="Phone Number" type="tel" />
                </div>
                <InputField name="subject" label="Subject" className="mt-6 w-full" />
                <InputField name="message" label="Message" className="mt-6 pb-40 max-md:pb-28 w-full !h-[100px]" />
            </div>
            <SubmitButton />
        </form>
    );
};

export default ContactForm;
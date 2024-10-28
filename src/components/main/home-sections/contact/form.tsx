// "use client"
import Button from '@/components/form/button';
import Input from '@/components/form/input';
import Textarea from '@/components/form/textarea';
import React from 'react';


const ContactForm: React.FC = () => {
  return (
    <form className="flex flex-col grow text-base font-light leading-tight text-black max-md:mt-10 max-md:max-w-full">
      <h1 className="self-start text-3xl font-bold text-zinc-700">Contact Us</h1>
      <p className="self-start mt-2 text-lg font-semibold leading-snug text-green-600">
        Reach out to us for enquiry
      </p>
      <Input placeholder="Full Name" className="mt-7 !py-8" />
      <Input placeholder="Your email" className="mt-10 !py-8" />
      {/* <Textarea */}
      <Textarea
        placeholder="Your Message"
        className="overflow-hidden px-11 pt-7 pb-24 mt-5 rounded-xl bg-stone-50 max-md:px-5 max-md:pb-28 max-md:max-w-full"
        aria-label="Your Message"
      />
      <Button
        type="submit"
        className=" mt-12 font-bold !text-amber-300 !rounded-full max-md:mt-10 max-md:max-w-full"
      >
        Submit
      </Button>
    </form>
  );
};

export default ContactForm;
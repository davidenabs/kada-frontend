import React from 'react';

const NewsletterSubscribe: React.FC = () => {
  return (
    <aside className=" hidden md:flex overflow-hidden flex-col px-8 pt-24 pb-12 w-full text-base font-bold leading-tight rounded-lg bg-zinc-700 max-md:px-5 max-md:mt-3.5">
      <h2 className="self-start text-2xl leading-7 text-neutral-400">
        <span className="text-green-50">Get instant updates</span>
        <span> from Kaduna State Agriculture Development Authority?</span>
      </h2>
      <p className="self-start mt-6 text-lg font-medium text-amber-300">
        Subscribe to our newsletter
      </p>
      <form className="mt-24 max-md:mt-10">
        <label htmlFor="email" className="sr-only">Enter your email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="overflow-hidden px-8 py-5 w-full max-w-[330px] font-light text-black bg-white rounded-[60px] max-md:px-5"
          aria-label="Enter your email"
        />
        <button type="submit" className="overflow-hidden px-16 py-5 mt-6 text-white whitespace-nowrap bg-gray-700 rounded-[60px] max-md:px-5">
          Subscribe
        </button>
      </form>
    </aside>
  );
};

export default NewsletterSubscribe;
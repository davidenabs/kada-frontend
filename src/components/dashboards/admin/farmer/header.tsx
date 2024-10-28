import React from 'react';

const ProfileHeader: React.FC = () => {
  return (
    <header className="flex flex-wrap gap-5 justify-between items-start w-full leading-tight text-black max-w[1038px]">
      <div className="flex flex-col items-start self-start text-xs">
        <nav className="flex gap-2 items-center text-green-800" aria-label="Breadcrumb">
          <span className="self-stretch my-auto text-slate-500">Dashboard</span>
          <span className="self-stretch my-auto text-base" aria-hidden="true">&gt;</span>
          <span className="self-stretch my-auto">Ismail Abdulkadir</span>
        </nav>

        <h1 className="mt-12 text-lg font-bold max-md:mt-10">Ismail Abdulkadir</h1>
        <p className="mt-2 text-teal-700">Farmer</p>
        <div className="mt-4">Farm Location</div>
        <div className="flex gap-5 justify-between self-stretch mt-2.5 w-full text-teal-700">
          <div className="flex gap-2.5 items-start">
            <span>N11</span>
            <span>34' 4</span>
            <span>21"</span>
            <span>E7 7'</span>
            <span>12.934</span>
          </div>
          <button className="text-teal-700">View on map</button>
        </div>
      </div>

      <div className="flex flex-col self-start items-start mt-20 text-sm max-md:mt-10 text-left max-md:hidden">
        <div className="flex flex-col self-start">
          <h2 className="font-bold">Cooperative</h2>
          <p className="mt-2">Mai GWC Cooperative</p>
        </div>
        <button className="mt-5 text-xs text-teal-700">View cooperative</button>
        <div className="flex gap-2 items-start mt-5">
          <span>Member since:</span>
          <time dateTime="2023-12-20">Dec 20th, 2023</time>
        </div>
      </div>

    </header>
  );
};

export default ProfileHeader;
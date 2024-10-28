import React from 'react';

interface HighlightCardProps {
  imageSrc: string;
  title: string;
  description: string;
  date: string;
  time: string;
}
// AIzaSyAvkhDxmPb13MrAYy48R7dreVXXuYyIwUs
const HighlightCard: React.FC<HighlightCardProps> = ({ imageSrc, title, description, date, time }) => {
  return (
    <article className="flex flex-col grow pb-7 w-full text-sm bg-white rounded-lg shadow-[0px_4px_40px_rgba(207,207,207,0.25)] overflow-hidden">
      <img src={imageSrc} alt="" className="object-contain w-full aspect-[1.77]" />
      <div className="flex flex-col px-4 mt-8 w-full max-md:pr-5">
        <h3 className="text-base font-bold leading-5 text-zinc-700">
          {title}
        </h3>
        <p className="mt-10 mr-7 font-thin tracking-wide leading-5 text-neutral-700 max-md:mr-2.5">
          {description}
        </p>
        <div className="flex gap-3 mt-7 max-w-full leading-tight text-teal-700 w-[188px]">
          <time className="overflow-hidden gap-2.5 self-stretch p-2.5 bg-stone-50 rounded-[60px]">
            {date}
          </time>
          <time className="overflow-hidden gap-2.5 self-stretch p-2.5 bg-stone-50 rounded-[60px]">
            {time}
          </time>
        </div>
      </div>
    </article>
  );
};

export default HighlightCard;
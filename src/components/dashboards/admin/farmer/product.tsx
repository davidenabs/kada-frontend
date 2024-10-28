import React from 'react';

const ProductsSection: React.FC = () => {
  return (
    <div className="flex flex-col grow pt-5 pb-96 w-full bg-white rounded shadow-lg max-md:pb-24 max-md:mt-7">
      <h2 className="self-start ml-4 text-base font-bold leading-tight text-zinc-700 max-md:ml-2.5">Products</h2>
      <hr className="shrink-0 mt-5 max-w-full h-0 border-stone-300 w[333px] max-md:mr-1 max-md:ml-0.5" />
      <div className="flex flex-col items-start px-4 mt-6 w-full">
        <h3 className="text-sm leading-tight text-teal-700">Rice</h3>
        <div className="flex flex-wrap gap-3 self-stretch mt-3">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f2855edf1ef5c825194d3d42db7037bd963f5715896b122d93d25b2daa4a66e?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" alt="Rice product image 1" className="object-contain shrink-0 max-w-full aspect-[1.22] w-[148px]" />
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/05e62a7c224005a2b45f4ac6831328416b4075915944816b5e898a17952e2cb0?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3" alt="Rice product image 2" className="object-contain shrink-0 max-w-full aspect-[1.22] w-[148px]" />
        </div>
        <h3 className="mt-6 text-sm leading-tight text-teal-700">Price Information</h3>
      </div>
    </div>
  );
};

export default ProductsSection;
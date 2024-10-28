import React from 'react';

interface OverviewItem {
    icon: string;
    count: number;
    label: string;
    bgColor: string;
}

const overviewItems: OverviewItem[] = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/103798cdebe2f62b5f727f2cfbf4b80c4a8859cebe42b8f89e5b1512d61390df?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3", count: 120, label: "Registered Members", bgColor: "bg-emerald-50" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac6d66e539e3736b4bf7d24f26853608959f3d1d9c61efa2599cadc9c2449c88?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3", count: 120, label: "Opportunities", bgColor: "bg-green-100" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/eb49f3efcc65098aa838f09c330b2de7dd62ab707869844b8945413fd1928127?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3", count: 6, label: "Funding", bgColor: "bg-lime-100" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/83d62767185a837e667a85f2da59dd299385615bff3f6b843c813993d474eb8f?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3", count: 6, label: "Membership Requests", bgColor: "bg-yellow-100" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e05f7d8141c4b4ee7c56511ca787e46161f5b1f9a5a310be6430147c94d0506e?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3", count: 6, label: "Events", bgColor: "bg-orange-100" },
];

const Overview: React.FC = () => {
    return (
        <section>
            <h2 className="self-start text-lg font-medium leading-tight text-black">Overview</h2>
            <div className="flex flex-wrap items-start gap-5 md:justify-normal lg:justifybetween mt-2.5 text-green-950">
                {overviewItems.map((item, index) => (
                    <div key={index} className={`flex overflow-hidden flex-col items-center px-9 py-7 ${item.bgColor} rounded-md h-[178px] w-[178px] max-md:px-5`}>
                        <img src={item.icon} alt="" className="object-contain aspect-[1.14] w-[33px]" />
                        <div className="mt-5 text-2xl font-bold leading-tight">{item.count}</div>
                        <div className="font-medium leading-5 text-sm text-center">{item.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Overview;
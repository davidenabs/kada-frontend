import React from 'react';

interface QuickAction {
    icon: string;
    title: string;
    description: string;
}

const quickActions: QuickAction[] = [
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2070a245067fbffd1b9dbb99cd3a983ede1a1edb5721092a5f06e770d4dc84ef?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        title: "Publish Opportunities",
        description: "Thrift savings for farmers involves a routine contribution of a particular agreed amount within a number of individuals"
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/17dcd7cdc9cc431c5df11fcf7e1601e83c8a2bed1805318abf531a593c4768ef?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        title: "Create Events",
        description: "Thrift savings for farmers involves a routine contribution of a particular agreed amount within a number of individuals"
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/886541a6314bd4dff984f125bccf5c0d1561d1fc27dab711acffefaf1613b67b?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        title: "Create thrift Savings (Adashe)",
        description: "Thrift savings for farmers involves a routine contribution of a particular agreed amount within a number of individuals"
    }
];

const QuickActions: React.FC = () => {
    return (
        <section className="flex overflow-hidden flex-col px-5 py-6 mt-8 max-w-full bg-white rounded-lg shadow-[0px_4px_36px_rgba(193,196,205,0.01)] w-[612px]">
            <h2 className="self-start text-base font-medium leading-tight text-black">Quick Actions</h2>
            {quickActions.map((action, index) => (
                <div key={index} className="flex overflow-hidden flex-wrap gap-4 px-7 py-5 mt-3 rounded-lg bg-zinc-50 max-md:pr-5">
                    <img src={action.icon} alt="" className="object-contain shrink-0 my-auto rounded-lg aspect-[1.11] w-[60px]" />
                    <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
                        <h3 className="self-start text-base font-medium leading-tight text-black">{action.title}</h3>
                        <p className="mt-1.5 text-sm leading-4 text-slate-500 max-md:max-w-full">{action.description}</p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default QuickActions;
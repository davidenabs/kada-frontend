"use client"
import React, { Suspense } from 'react'
import FarmInfo from '@/components/dashboards/farmer/farm-info';

interface NavigationItemProps {
    text: string;
    active: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ text, active }) => {
    return (
        <div className={`flex gap- items-start whitespace-nowrap ${active ? 'font-semibold' : ''}`}>
            <div>{text}</div>
            {!active && (
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b089a829b16881d1044a1ebf60c9e247c9802df648e211e831798d4d8d0a4cf5?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3"
                    className="object-contain shrink-0 w-4 aspect-square"
                    alt=""
                />
            )}
        </div>
    );
};


export default function FarmsPage({
    params,
}: {
    params: {
        slug: string;
    };
}) {
    const slug = params.slug;

    const navigationItems = [
        { text: 'Dashboard', active: false },
        { text: 'Farms', active: false },
        { text: 'FGSC Farms', active: true },
    ];
    return (
        <>
            <div className="flex flex-col self-stretch w-full">
                <nav className="flex gap-3 justifybetween max-w-full text-xs font-light text-neutral-700 w[262px]">
                    {navigationItems.map((item, index) => (
                        <NavigationItem key={index} text={item.text} active={item.active} />
                    ))}
                </nav>
                <FarmInfo />
            </div>
        </>
    );
}


// const FarmsPage = () => {
//     // const router = useRouter()
//     const pathname = usePathname()
//     return (
//         <Suspense fallback={null}>
//         <div>FarmsPage:  {pathname}</div>
//         </Suspense>
//     )
// }

// export default FarmsPage;
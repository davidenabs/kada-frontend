import useScreenSize from "@/hooks/use-screen-size";
import React from "react";

interface CategoryButtonProps {
    text: string;
    isActive: boolean;
    onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ text, isActive, onClick }) => {
    const baseClasses = "py-5 px-4 mt10 w-full rounded-3xl max-md:px-5";
    const buttonClasses = `${baseClasses} ${isActive ? 'bg-tertiary-600 text-white' : 'bg-zinc-100'}`;

    return (
        <button type="button" className={buttonClasses} onClick={onClick}>
            {text}
        </button>
    );
};





const CategoryButtons: React.FC<{ activeCategory: string; setActiveCategory: (category: string) => void }> = ({ activeCategory, setActiveCategory }) => {

    const { width } = useScreenSize();

    const categories = [
        { text: "For Farmers", value: "farmers" },
        { text: "For Individuals", value: "individuals" },
        { text: "For Cooperatives", value: "cooperatives" },
        { text: "For Kaduna", value: "kaduna" },
        { text: "National Development", value: "nationalDevelopment" },
    ];

    return (
        width > 992 ?
            <div className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
                <div className="flex relative flex-col items-center self-stretch px-4 py-9 my-auto w-full text-sm font-bold leading-none text-center rounded-3xl bg-stone-50 text-zinc-700 max-md:mt-10 space-y-8">
                    {categories.map((category, index) => (
                        <CategoryButton
                            key={index}
                            text={category.text}
                            isActive={activeCategory === category.value}
                            onClick={() => setActiveCategory(category.value)}
                        />
                    ))}
                </div>
            </div>
            :
            <div className="flex gap-4 overflow-x-auto w-full flex-nowrap">
                {categories.map((category, index) => (
                    <CategoryButton
                        key={index}
                        text={category.text}
                        isActive={activeCategory === category.value}
                        onClick={() => setActiveCategory(category.value)}
                    />
                ))}
            </div>

    );
};

export default CategoryButtons;
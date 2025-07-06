import React from 'react'
import { CategoriesProps } from "@/types";
import { Category } from "@/payload-types";
import CategoryDropdown from "@/components/category-dropdown";

export const Categories = ({ data }: CategoriesProps) => {
    return (
        <div className="relative w-full">
            <div className="flex flex-nowrap items-center">
                {data.map((category: Category) => (
                    <div key={category.id}>
                        <CategoryDropdown category={category} isActive={false} isNavigationHovered={false} />
                    </div>
                ))}
            </div>
        </div>
    );
}
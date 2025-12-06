import React from "react";
import { Category } from "@/payload-types";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

export interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}

export interface NavBarSidebarProps {
    items: NavbarItemProps[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

/*export interface SearchFiltersProps {
    data: any | {
        docs: {
            id: string;
            name: string;
            slug: string;
            parent?: {
                id: string;
                name: string;
                slug: string;
            };
        }[];
    };
}*/

export interface SearchFiltersProps {
    data: CategoriesGetManyOutput;
}

export interface SearchInputProps {
    disabled?: boolean;
    data?: CategoriesGetManyOutput;
}

export interface CategoriesProps {
    data: CategoriesGetManyOutput
}

export interface CategoryDropdownProps {
    category: CategoriesGetManyOutput[1];
    isActive?: boolean;
    isNavigationHovered: boolean;
}

export interface SubCategoryMenuProps {
    category: CategoriesGetManyOutput[1];
    isOpen: boolean;
    position: { top: number; left: number;}
}

export interface CategoriesSidebarProps {
    data?: CategoriesGetManyOutput; // remove this later because data is already fetched in the parent component
    open: boolean
    onOpenChange: (open: boolean) => void
}
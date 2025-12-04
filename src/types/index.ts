import React from "react";
import { Category } from "@/payload-types";
import { CustomCategory } from "@/app/(app)/(home)/types";

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
    data: CustomCategory[];
}

export interface SearchInputProps {
    disabled?: boolean;
    data: CustomCategory[];
}

export interface CategoriesProps {
    data: any
}

export interface CategoryDropdownProps {
    category: CustomCategory;
    isActive?: boolean;
    isNavigationHovered: boolean;
}

export interface SubCategoryMenuProps {
    category: CustomCategory;
    isOpen: boolean;
    position: { top: number; left: number;}
}

export interface CategoriesSidebarProps {
    data?: CustomCategory[]; // remove this later
    open: boolean
    onOpenChange: (open: boolean) => void
}
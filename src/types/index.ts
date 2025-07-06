import React from "react";
import { Category } from "@/payload-types";

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

export interface SearchFiltersProps {
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
}

export interface SearchInputProps {
    disabled?: boolean;
}

export interface CategoriesProps {
    data: any
}

export interface CategoryDropdownProps {
    category: Category;
    isActive?: boolean;
    isNavigationHovered: boolean;
}

export interface SubCategoryMenuProps {
    category: Category;
    isOpen: boolean;
    position: { top: number; left: number;}
}
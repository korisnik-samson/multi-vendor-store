import React from "react";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import type { SearchParams } from "nuqs/server";

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
    // position: { top: number; left: number;}
}

export interface CategoriesSidebarProps {
    data?: CategoriesGetManyOutput; // remove this later because data is already fetched in the parent component
    open: boolean
    onOpenChange: (open: boolean) => void
}

export interface CategoryProps {
    params: Promise<{ category: string }>
    searchParams: Promise<SearchParams>
}

export interface SubcategoryProps {
    params: Promise<{ subcategory: string }>
    searchParams: Promise<SearchParams>
}

export interface SubCategoryProps {
    params: Promise<{
        category: string;
        subcategory: string;
    }>
}

export interface BreadcrumbsNavigationProps {
    activeCategoryName?: string | null;
    activeCategory?: string | null;
    activeSubcategoryName?: string | null;
}

export interface ProductListProps {
    tenantSubdomain?: string;
    category?: string;
    narrowView?: boolean;
}

export interface ProductFilterProps {
    title: string;
    className?: string;
    children: React.ReactNode;
}

export interface PriceFilterProps {
    minPrice?: string | null;
    maxPrice?: string | null;
    onMinPriceChange: (minPrice: string | null) => void;
    onMaxPriceChange: (maxPrice: string | null) => void;
}

export interface TagsFilterProps {
    value?: string[] | null;
    onChange: (value: string[]) => void;
}

export interface ProductCardProps {
    id: string;
    name: string;
    imageUrl?: string | null;
    tenantSubDomain: string;
    tenantImageUrl?: string | null;
    reviewRating: number;
    reviewCount: number;
    price: number;
}

export interface ProductListViewProps {
    tenantSubdomain?: string;
    category?: string;
    narrowView?: boolean;
}

export interface TenantsPageProps {
    searchParams: Promise<SearchParams>;
    params: Promise<{ subdomain: string }>;
}

export interface TenantLayoutProps {
    children: React.ReactNode;
    params: Promise<{ subdomain: string }>;
}

export interface TenantsNavbarProps {
    subdomain: string;
}
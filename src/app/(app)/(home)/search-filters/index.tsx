'use client'

import React from 'react'
import SearchInput from "@/components/search-input";
import { Categories } from "@/components/categories";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/dist/client/components/navigation";
import { DEFAULT_BG_COLOUR } from "@/app/(app)/(home)/search-filters/constants";
import { BreadcrumbNavigation } from "@/components/breadcrumbs-navigation";

export const SearchFilters = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

    const params = useParams();
    const categoryParam = params.category as string | undefined;
    const activeCategory = categoryParam || 'all';

    const activeCategoryData = data.find((category: any) => category.slug === activeCategory);

    const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOUR;
    const activeCategoryName = activeCategoryData?.name || null;

    const activeSubcategory = params.subcategory as string | undefined;
    const activeSubcategoryName = activeCategoryData?.subcategories?.find((subcategory: any) => subcategory.slug === activeSubcategory)?.name || null;

    return (
        /* F5F5F5 */
        <div className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full' style={{ backgroundColor: activeCategoryColor}}>
            <SearchInput />

            <div className='hidden lg:block'>
                <Categories data={data} />
            </div>

            <BreadcrumbNavigation activeCategoryName={activeCategoryName} activeCategory={activeCategory}
                activeSubcategoryName={activeSubcategoryName} />
        </div>
    );
}

export const SearchFiltersSkeleton = () => {
    return (
        /* F5F5F5 */
        <div className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full' style={{ backgroundColor: DEFAULT_BG_COLOUR}}>
            <SearchInput disabled />

            <div className='hidden lg:block'>
                <div className='h-11' />
            </div>
        </div>
    )
}
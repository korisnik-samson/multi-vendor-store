import React from 'react'
import { SubcategoryProps } from "@/types";
import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/components/views/product-list-view";

const Page = async ({ params, searchParams }: SubcategoryProps) => {
    const { subcategory } = await params;
    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
        category: subcategory,
        ...filters
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={subcategory} />
        </HydrationBoundary>
    );
}

export default Page;
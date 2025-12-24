import React from 'react'
import { CategoryProps } from "@/types";
import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/components/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";

const Page = async ({ params, searchParams }: CategoryProps) => {
    const { category } = await params;
    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();

    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        category,
        ...filters,
        limit: DEFAULT_LIMIT
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={category} />
        </HydrationBoundary>
    );
}

export default Page;
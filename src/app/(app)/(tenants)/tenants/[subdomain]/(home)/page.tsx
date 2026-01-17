import React from 'react'
import { ProductListView } from "@/components/views/product-list-view";

import { loadProductFilters } from "@/modules/products/search-params";
import { getQueryClient, trpc } from "@/trpc/server";

import { DEFAULT_LIMIT } from "@/constants";
import { TenantsPageProps } from "@/types";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page = async ({ params, searchParams }: TenantsPageProps) => {
    const { subdomain } = await params;
    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();

    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        tenantSlug: subdomain,
        limit: DEFAULT_LIMIT
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView tenantSubdomain={subdomain} narrowView />
        </HydrationBoundary>
    );
}

export default Page;
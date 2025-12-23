import React from 'react'
import { SubcategoryProps } from "@/types";
import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductList, ProductListSkeleton } from "@/components/product-list";

const Page = async ({ params }: SubcategoryProps) => {
    const { subcategory } = await params;
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
        category: subcategory,
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <React.Suspense fallback={<ProductListSkeleton />}>
                <ProductList category={subcategory} />
            </React.Suspense>
        </HydrationBoundary>
    );
}

export default Page;
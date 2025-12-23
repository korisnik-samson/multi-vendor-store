import React from 'react'
import { CategoryProps } from "@/types";
import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductList, ProductListSkeleton } from "@/components/product-list";

const Page = async ({ params }: CategoryProps) => {
    const { category } = await params;
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({ category }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <React.Suspense fallback={<ProductListSkeleton />}>
                <ProductList category={category} />
            </React.Suspense>
        </HydrationBoundary>
    );
}

export default Page;
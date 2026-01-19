import React from 'react'
import { LibraryView } from "@/components/library-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { LibraryProductPageProps } from "@/types";
import { LibraryProductView } from "@/components/library-product-view";

const Page = async ({ params }: LibraryProductPageProps) => {
    const queryClient = getQueryClient();
    const { productId } = await params;

    void queryClient.prefetchQuery(trpc.library.getOne.queryOptions({
        productId
    }));

    void queryClient.prefetchQuery(trpc.reviews.getOne.queryOptions({
        productId
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LibraryProductView productId={productId} />
        </HydrationBoundary>
    )
}

export default Page;
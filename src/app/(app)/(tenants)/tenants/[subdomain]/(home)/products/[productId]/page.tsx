import React from 'react'
import { ProductPageProps } from "@/types";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ProductView } from '@/components/product-view';

const Page = async ({ params }: ProductPageProps) => {
    const { productId, slug } = await params;
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({
        subdomain: slug
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductView productId={productId} tenantSubdomain={slug} />
        </HydrationBoundary>
    );
}

export default Page;
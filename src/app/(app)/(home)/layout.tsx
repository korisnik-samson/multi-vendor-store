import React, { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SearchFilters, SearchFiltersSkeleton } from "./search-filters";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
    children?: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(
        trpc.categories.getMany.queryOptions()
    )

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />

            {/* Being explicit about the query client state*/}
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<SearchFiltersSkeleton />}>
                    <SearchFilters />
                </Suspense>
            </HydrationBoundary>

            {/* Or use the client-side query client, but just uncomment this and the two function exports in server.tsx from trpc/server to enable it*/}
            {/*<HydrationClient>
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchFilters />
                </Suspense>
            </HydrationClient>*/}

            <div className='flex-1 bg-[#F2F2E6]'>{children}</div>
            <Footer />
        </div>
    );
}

export default Layout;
import React, { Suspense } from 'react'
import { TenantLayoutProps } from "@/types";
import { TenantsNavbar, TenantsNavbarSkeleton } from "@/components/tenants-navbar";
import { TenantsFooter } from "@/components/tenants-footer";
import { getQueryClient, trpc } from "@/trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Layout = async ({ children, params }: TenantLayoutProps) => {
    const { subdomain } = await params;
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({
        subdomain
    }));

    return (
        <div className='min-h-screen bg-[#F2F2E6] flex flex-col'>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<TenantsNavbarSkeleton />}>
                    <TenantsNavbar subdomain={subdomain} />
                </Suspense>
            </HydrationBoundary>

            <div className='flex-1'>
                <div className='max-w-(--breakpoint-xl) mx-auto'>
                    {children}
                </div>
            </div>

            <TenantsFooter />
        </div>
    );
}

export default Layout;
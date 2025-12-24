'use client';

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { TenantsNavbarProps } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { generateTenantURL } from "@/lib/utils";

export const TenantsNavbar = ({ subdomain }: TenantsNavbarProps) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({
        subdomain: subdomain
    }))

    return (
        <nav className='h-20 border-b font-medium bg-white'>
            <div className='max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12'>
                <Link href={generateTenantURL(subdomain)} className='flex items-center gap-2'>
                    {data.image?.url && (
                        <Image src={data.image.url} width={32} height={32}
                               className='rounded-full border shrink-0 size-[32px]' alt='subdomain' />
                    )}
                    <p className='text-xl'>{data.name}</p>
                </Link>
            </div>
        </nav>
    )
}

export const TenantsNavbarSkeleton = () => {
    return (
        <nav className='h-20 border-b font-medium bg-white'>
            <div className='max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12'>
                <div />
                {/* TODO: Skeleton for checkout Button */}
            </div>
        </nav>
    )
}
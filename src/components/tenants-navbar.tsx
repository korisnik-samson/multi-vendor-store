'use client';

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { TenantsNavbarProps } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { generateTenantURL } from "@/lib/utils";
// import { CheckoutButton } from "@/components/checkout-buton"; (hydration issues)
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import React from "react";
import { ShoppingCartIcon } from "lucide-react";

const CheckoutButton = dynamic(
    () => import("@/components/checkout-button").then(
        (mod) => mod.CheckoutButton
    ),
    {
        ssr: false,
        loading: () => <Button disabled className='bg-white'>
            <ShoppingCartIcon className='text-black' />
        </Button>
    },
)

export const TenantsNavbar = ({ subdomain }: TenantsNavbarProps) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({
        subdomain //subdomain: subdomain (previously, in-case of any hydration problems)
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

                <CheckoutButton hideIfEmpty tenantSubdomain={subdomain} />
            </div>
        </nav>
    )
}

export const TenantsNavbarSkeleton = () => {
    return (
        <nav className='h-20 border-b font-medium bg-white'>
            <div className='max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12'>
                <div />
                <Button disabled className='bg-white'>
                    <ShoppingCartIcon className='text-black' />
                </Button>
            </div>
        </nav>
    )
}
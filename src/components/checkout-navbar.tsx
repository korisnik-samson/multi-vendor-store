'use client';

import { TenantsNavbarProps } from "@/types";
import Link from "next/link";
import { generateTenantURL } from "@/lib/utils";
import { CheckoutButton } from "@/components/checkout-button";

import React from "react";
import { Button } from "@/components/ui/button";

export const CheckoutNavbar = ({ subdomain }: TenantsNavbarProps) => {

    return (
        <nav className='h-20 border-b font-medium bg-white'>
            <div className='max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12'>
                <p className='text-xl'>Checkout</p>

                <Button variant='elevated' asChild>
                    <Link href={generateTenantURL(subdomain)}>
                        Continue Shopping
                    </Link>
                </Button>
            </div>
        </nav>
    )
}
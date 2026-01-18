import React from 'react'
import { CheckoutLayoutProps } from "@/types";

import { TenantsFooter } from "@/components/tenants-footer";
import { CheckoutNavbar } from "@/components/checkout-navbar";

const Layout = async ({ children, params }: CheckoutLayoutProps) => {
    const { subdomain } = await params;

    return (
        <div className='min-h-screen bg-[#F2F2E6] flex flex-col'>
            <CheckoutNavbar subdomain={subdomain} />

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
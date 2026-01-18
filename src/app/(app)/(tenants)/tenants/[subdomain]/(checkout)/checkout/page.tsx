import React from 'react'
import { CheckoutPageProps } from "@/types";
import { CheckoutView } from "@/components/checkout-view";

const Page = async ({ params }: CheckoutPageProps) => {
    const { subdomain } = await params;

    return (
        <CheckoutView tenantSubdomain={subdomain} />
    );
}

export default Page;
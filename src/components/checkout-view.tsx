'use client';

import { CheckoutViewProps } from "@/types";
import { useTRPC } from "@/trpc/client";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { generateTenantURL } from "@/lib/utils";
import { CheckoutItem } from "@/components/checkout-item";
import { CheckoutSidebar } from "@/components/checkout-sidebar";
import { InboxIcon, LoaderIcon, ShoppingCartIcon } from "lucide-react";

export const CheckoutView = ({ tenantSubdomain }: CheckoutViewProps) => {
    const { productIds, clearAllCarts, removeProduct } = useCart(tenantSubdomain);
    const trpc = useTRPC();

    const { data, error, isLoading } = useQuery(trpc.checkout.getProducts.queryOptions({
        ids: productIds
    }));

    useEffect(() => {
        if (error?.data?.code === "NOT_FOUND") {
            clearAllCarts();
            toast.warning("Your cart is empty. Some products were not found.");
        }
    }, [error]);

    if (isLoading) return (
        <div className='lg:pt-16 pt-4 px-4 lg:px-12'>
            <div className='border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-xl'>
                <LoaderIcon className='text-muted-foreground animate-spin' />
            </div>
        </div>
    )

    if (data?.totalDocs === 0) return (
        <div className='lg:pt-16 pt-4 px-4 lg:px-12'>
            <div className='border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-xl'>
                <ShoppingCartIcon />
                <p className='text-base font-medium'>Your cart is empty</p>
            </div>
        </div>
    );

    return (
        <div className='lg:pt-16 pt-4 px-4 lg:px-12'>
            <div className='grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16'>
                <div className='lg:col-span-4'>
                    <div className='border rounded-md overflow-hidden bg-white'>
                        {data?.docs.map((product, index) => (
                            <CheckoutItem key={index} isLast={index === data.docs.length - 1} imageUrl={product.image?.url} name={product.name}
                                          productUrl={`${generateTenantURL(product.tenant.subdomain)}/products/${product.id}`}
                                          tenantUrl={generateTenantURL(product.tenant.subdomain)} tenantName={product.tenant.name} price={product.price}
                                          onRemove={() => removeProduct(product.id)} />
                        ))}
                    </div>
                </div>

                <div className='lg:col-span-3'>
                    <CheckoutSidebar total={data?.totalPrice || 0} onCheckout={() => {}} isCancelled={false} isPending={false} />
                </div>
            </div>
        </div>
    )
}
import { CartButtonProps } from "@/types";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const CartButton = ({ isPurchased, tenantSubdomain, productId }: CartButtonProps) => {
    const cart = useCart(tenantSubdomain);

    if (isPurchased) return (
        <Button variant='elevated' className='flex-1 font-medium bg-white' asChild>
            <Link prefetch href={`/library/${productId}`}>
                View in Library
            </Link>
        </Button>
    )

    return (
        <Button variant='elevated' className={cn('flex-1 bg-pink-400', cart.isProductInCart(productId) && 'bg-white')}
                onClick={() => cart.toggleProduct(productId)}>
            {cart.isProductInCart(productId) ? 'Remove from Cart' : 'Add to Cart'}
        </Button>
    );
}
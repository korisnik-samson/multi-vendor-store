import { CheckoutButtonProps } from "@/types";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { cn, generateTenantURL } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

export const CheckoutButton = ({ classname, hideIfEmpty, tenantSubdomain }: CheckoutButtonProps) => {
    const { totalItems } = useCart(tenantSubdomain);

    if (hideIfEmpty && totalItems === 0) return null;

    return (
        <Button variant='elevated' asChild className={cn('bg-white', classname)}>
            <Link href={`${generateTenantURL(tenantSubdomain)}/checkout`}>
                <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ''}
            </Link>
        </Button>
    )
};
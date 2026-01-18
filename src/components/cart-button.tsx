import { CartButtonProps } from "@/types";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const CartButton = ({ tenantSubdomain, productId }: CartButtonProps) => {
    const cart = useCart(tenantSubdomain);

    return (
        <Button variant='elevated' className={cn('flex-1 bg-pink-400', cart.isProductInCart(productId) && 'bg-white')}
                onClick={() => cart.toggleProduct(productId)}>
            {cart.isProductInCart(productId) ? 'Remove from Cart' : 'Add to Cart'}
        </Button>
    );
}
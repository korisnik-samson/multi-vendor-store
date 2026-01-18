import { useCartStore } from "@/modules/checkout/store/use-cart-store";

export const useCart = (tenantSubdomain: string) => {
    const { getCartByTenant, addProduct, removeProduct, clearCart, clearAllCarts } = useCartStore();
    const productIds = getCartByTenant(tenantSubdomain);

    const toggleProduct = (productId: string) => {
        if (productIds.includes(productId)) removeProduct(tenantSubdomain, productId);
        else addProduct(tenantSubdomain, productId);
    };

    const isProductInCart = (productId: string) => {
        return productIds.includes(productId);
    }

    const clearTenantCart = () => {
        return clearCart(tenantSubdomain);
    }

    return {
        productIds,
        addProduct: (productIds: string) => addProduct(tenantSubdomain, productIds),
        removeProduct: (productIds: string) => removeProduct(tenantSubdomain, productIds),
        clearCart: clearTenantCart,
        clearAllCarts,
        toggleProduct,
        isProductInCart,
        totalItems: productIds.length
    };
}
import { create } from 'zustand'
import { createJSONStorage, persist} from "zustand/middleware";
import { CartStateProps } from "@/types";

export const useCartStore = create<CartStateProps>() (
    persist((set) => ({
        tenantCarts: {},
        addProduct: (tenantSubdomain, productId) => set((state) => ({
            tenantCarts: {
                ...state.tenantCarts,
                [tenantSubdomain]: {
                    productIds: [
                        ...(state.tenantCarts[tenantSubdomain]?.productIds || []),
                        productId
                    ],
                }
            }
        })),
        removeProduct: (tenantSubdomain, productId) => set((state) => ({
            tenantCarts: {
                ...state.tenantCarts,
                [tenantSubdomain]: {
                    productIds: state.tenantCarts[tenantSubdomain]?.productIds?.filter(
                        (id) => id !== productId
                    ) || [],
                }
            }
        })),
        clearCart: (tenantSubdomain) => set((state) => ({
            tenantCarts: {
                ...state.tenantCarts,
                [tenantSubdomain]: {
                    productIds: [],
                }
            }
        })),
        clearAllCarts: () => set({
            tenantCarts: {}
        }),
        // getCartByTenant: (tenantSubdomain) => get().tenantCarts[tenantSubdomain]?.productIds || [],
    }),
    {
        name: 'biblioteka-cart',
        storage: createJSONStorage(() => localStorage)
    })
);
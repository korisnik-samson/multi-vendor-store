import { ProductSort } from "@/components/product-sort";
import { ProductFilters } from "@/components/product-filters";
import React from "react";
import { ProductList, ProductListSkeleton } from "@/components/product-list";
import { ProductListViewProps } from "@/types";

export const ProductListView = ({ category, tenantSubdomain, narrowView }: ProductListViewProps) => {
    return (
        <div className='px-4 lg:px-12 py-8 flex flex-col gap-4'>
            <div className='flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between'>
                <p className='text-2xl font-medium'>Curated for you</p>
                <ProductSort />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12'>
                <div className='lg:col-span-2 xl:col-span-2'>
                    <ProductFilters />
                </div>

                <div className='lg:col-span-4 xl:col-span-6'>
                    <React.Suspense fallback={<ProductListSkeleton narrowView={narrowView} />}>
                        <ProductList category={category} tenantSubdomain={tenantSubdomain} narrowView={narrowView} />
                    </React.Suspense>
                </div>
            </div>
        </div>
    )
}
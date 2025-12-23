import React from 'react'
import Link from 'next/link'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { BreadcrumbsNavigationProps } from "@/types";

export const BreadcrumbNavigation = ({ activeCategoryName, activeCategory, activeSubcategoryName }: BreadcrumbsNavigationProps) => {
    if (!activeCategoryName || activeCategory === "all") return null;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {activeSubcategoryName ? (
                    <React.Fragment>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild className='text-xl font-medium underline text-primary'>
                                <Link href={`/${activeCategory}`}>
                                    {activeCategoryName}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator className='text-primary font-medium text-lg'>
                            /
                        </BreadcrumbSeparator>

                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-xl font-medium'>
                                {activeSubcategoryName}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </React.Fragment>
                ) : (
                    <BreadcrumbItem>
                        <BreadcrumbPage className='text-xl font-medium'>
                            {activeCategoryName}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { CategoriesProps } from "@/types";

import CategoryDropdown from "@/components/category-dropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import { CategoriesSidebar } from "@/components/categories-sidebar";
import { useParams } from "next/dist/client/components/navigation";

export const Categories = ({ data }: CategoriesProps) => {
    const params = useParams();

    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const viewAllRef = useRef<HTMLDivElement>(null);

    const [visibleCount, setVisibleCount] = useState<number>(data.length);
    const [isAnyHovered, setIsAnyHovered] = useState<boolean>(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const categoryParam = params.category as string | undefined;
    const activeCategory = categoryParam || 'all';

    const activeCategoryIndex = data.findIndex((category: any) => category.slug === activeCategory);
    const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

    useEffect(() => {
        const calculateVisible = () => {
            if (!containerRef.current || !measureRef.current || !viewAllRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const viewAllWidth = viewAllRef.current.offsetWidth;
            const availableWidth = containerWidth - viewAllWidth;

            const items = Array.from(measureRef.current.children);

            let visibleCount = 0, totalWidth = 0;

            for (const item of items) {
                const width = item.getBoundingClientRect().width;

                if (totalWidth + width > availableWidth) break;

                totalWidth += width;
                visibleCount++;
            }

            setVisibleCount(visibleCount);
        };

        const resizeObserver = new ResizeObserver(calculateVisible);
        resizeObserver.observe(containerRef.current!);

        return () => resizeObserver.disconnect();
    }, [data.length, /* visibleCount, containerRef, measureRef, viewAllRef */])

    return (
        <div className="relative w-full">
            {/* Category Sidebar */}
            <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

            {/* Hidden div to measure the width of each category */}
            <div ref={measureRef} className="absolute opacity-0 pointer-events-none flex" style={{ position: 'fixed', top: -9999, left: -9999 }}>
                {data.map((category: any) => (
                    <div key={category.id}>
                        <CategoryDropdown category={category} isActive={activeCategory === category.slug} isNavigationHovered={false} />
                    </div>
                ))}
            </div>

            {/* Visible categories */}
            <div ref={containerRef} className="flex flex-nowrap items-center"
                 onMouseEnter={() => setIsAnyHovered(true)} onMouseLeave={() => setIsAnyHovered(false)}>
                {data.slice(0, visibleCount).map((category: any) => (
                    <div key={category.id}>
                        <CategoryDropdown category={category} isActive={activeCategory === category.slug} isNavigationHovered={isAnyHovered} />
                    </div>
                ))}

                <div ref={viewAllRef} className="shrink-0">
                    <Button variant='elevated'
                            className={cn('h-11 px-4 bg-transparent border-transparent rounded-xl hover:bg-white hover:border-primary text-black',
                                isActiveCategoryHidden && !isAnyHovered && 'bg-white border-primary'
                            )} onClick={() => setIsSidebarOpen(true)}>
                        View All
                        <ListFilterIcon className='ml-2' />
                    </Button>
                </div>
            </div>
        </div>
    );
}
'use client';

import React, { useState, useRef } from 'react'
import { CategoryDropdownProps } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDropdownPosition } from "@/app/(app)/(home)/search-filters/use-dropdown-position";
import { SubCategoryMenu } from "@/components/subcategory-menu";

const CategoryDropdown = ({ category, isActive, isNavigationHovered }: CategoryDropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { getDropdownPosition } = useDropdownPosition(dropdownRef)

    const onMouseEnter = () => {
        if (dropdownRef.current) setIsOpen(true);
    }

    const onMouseLeave = () => setIsOpen(false);
    const dropdownPosition = getDropdownPosition();

    return (
        <div className='relative' ref={dropdownRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className='relative'>
                <Button variant='elevated' className={cn('h-11 px-4 bg-transparent border-transparent rounded-xl hover:bg-white hover:border-primary text-black',
                    isActive && !isNavigationHovered && 'bg-white border-primary')}>
                    {category.name}
                </Button>

                {category.subcategories && category.subcategories.length > 0 && (
                    <div className={cn(
                        "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent" +
                        " border-b-black left-1/2 -translate-x-1/2", isOpen && 'opacity-100'
                    )} />
                )}
            </div>

            <SubCategoryMenu category={category} isOpen={isOpen} position={dropdownPosition}/>
        </div>
    );
}

export default CategoryDropdown;
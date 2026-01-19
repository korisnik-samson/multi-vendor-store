'use client';

import { useState } from "react";
import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { StarPickerProps } from "@/types";

export const StarPicker = ({ value = 0, onChange, disabled, className }: StarPickerProps) => {
    const [hoverValue, setHoverValue] = useState<number>(0);

    return (
        <div className={cn('flex items-center', disabled && 'opacity-50 cursor-not-allowed', className)}>
            {[1, 2, 3, 4, 5].map((starValue) => (
                <button key={starValue} type="button" disabled={disabled} className={cn('p-0.5 hover:scale-110 transition', !disabled && 'cursor-pointer')}
                        onClick={() => onChange?.(starValue)}
                        onMouseEnter={() => setHoverValue(starValue)}
                        onMouseLeave={() => setHoverValue(0)}>

                    <StarIcon className={cn('size-5', (hoverValue! || value!) >= starValue ? 'fill-black stroke-black' : 'stroke-black')} />
                </button>
            ))}
        </div>
    )
}
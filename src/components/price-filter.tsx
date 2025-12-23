import React, { ChangeEvent } from 'react';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PriceFilterProps } from "@/types";
import { formatAsCurrency } from "@/lib/utils";

export const PriceFilter = ({ minPrice, maxPrice, onMinPriceChange, onMaxPriceChange }: PriceFilterProps) => {
    const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const numericalValue =event.target.value.replace( /[^0-9.]/g, '');
        onMinPriceChange(numericalValue);
    }

    const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const numericalValue =event.target.value.replace( /[^0-9.]/g, '');
        onMaxPriceChange(numericalValue);
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
                <Label className='font-medium text-base'>
                    Minimum Price
                </Label>
                <Input type='text' placeholder='RSD 0' value={minPrice ? formatAsCurrency(minPrice) :  ""}
                       onChange={handleMinPriceChange} />
            </div>
            <div className='flex flex-col gap-2'>
                <Label className='font-medium text-base'>
                    Maximum Price
                </Label>
                <Input type='text' placeholder={'RSD \u221E'} value={maxPrice ? formatAsCurrency(maxPrice) :  ""}
                       onChange={handleMaxPriceChange} />
            </div>
        </div>
    )
}
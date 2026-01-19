import Link from "next/link";
import Image from "next/image";
import { ProductCardProps } from "@/types";
import { StarIcon } from "lucide-react";
import React from "react";

export const LibraryProductCard = ({ id, name, imageUrl, tenantImageUrl, tenantSubDomain,
                                       reviewRating, reviewCount }: ProductCardProps) => {
    return (
        <Link prefetch href={`/library/${id}`}>
            <div className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow border rounded-md bg-white overflow-hidden h-full flex flex-col">
                <div className='relative aspect-square'>
                    <Image src={imageUrl || "/placeholder.png"} alt={name} fill className='object-cover' />
                </div>
                <div className='p-4 border-y flex flex-col gap-3 flex-1'>
                    <h2 className='text-lg font-medium line-clamp-4'>{name}</h2>

                    {/* TODO: Redirect to user shop */}
                    <div className='flex items-center gap-2'>
                        {tenantImageUrl && (
                            <Image src={tenantImageUrl} alt={tenantSubDomain}
                                   width={16} height={16} className='rounded-full border shrink-0 size-[16px]' />
                        )}
                        <p className='text-sm underline font-medium'>{tenantSubDomain}</p>
                    </div>

                    {reviewCount > 0 && (
                        <div className='flex items-center gap-1'>
                            <StarIcon className='size-3.5 fill-black' />
                            <p className='text-sm font-medium'>{reviewRating} ({reviewCount})</p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
};

// @ts-ignore
export const LibraryProductCardSkeleton = () => {
    return <div className='w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse' />
}
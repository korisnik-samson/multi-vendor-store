import React from 'react'
import { SubCategoryProps } from "@/types";

const Page = async ({ params }: SubCategoryProps) => {
    const { category, subcategory } = await params;

    return (
        <div>
            Category: {category}
            <br />
            Subcategory: {subcategory}
        </div>
    );
}

export default Page;
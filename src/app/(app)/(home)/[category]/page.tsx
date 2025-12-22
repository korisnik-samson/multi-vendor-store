import React from 'react'
import { CategoryProps } from "@/types";

const Page = async ({ params }: CategoryProps) => {
    const { category } = await params;

    return (
        <div>
            Category: {category}
        </div>
    );
}

export default Page;
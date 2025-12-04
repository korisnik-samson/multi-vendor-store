import React from 'react'
import configPromise from '@payload-config';

import { getPayload } from 'payload';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import SearchFilters from "./search-filters";
import { Category } from '@/payload-types';
import { CustomCategory } from "@/app/(app)/(home)/types";

interface Props {
    children?: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
    const payload = await getPayload({
        config: configPromise,
    });

    const data = await payload.find({
        collection: 'categories',
        depth: 1, // populate one level of subcategories
        where: {
            parent: {
                exists: false, // Fetch only top-level categories
            },
        },
        sort: "name"
    });

    const formatedData: CustomCategory[] = data.docs.map((doc: any) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc: Category) => ({
            // due to the fact we only have a depth of 1, dos is the Category
            ...(doc as Category),
            subcategories: undefined
        })),
    }));

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <SearchFilters data={formatedData} />
            <div className='flex-1 bg-[#F2F2E6]'>{children}</div>
            <Footer />
        </div>
    );
}

export default Layout;
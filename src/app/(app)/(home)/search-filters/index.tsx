import React from 'react'
import { SearchFiltersProps } from "@/types";
import SearchInput from "@/components/search-input";
import { Categories } from "@/components/categories";

const SearchFilters = ({ data }: SearchFiltersProps) => {
    return (
        <div className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'>
            <SearchInput />
            <Categories data={data} />
        </div>
    );
}

export default SearchFilters;
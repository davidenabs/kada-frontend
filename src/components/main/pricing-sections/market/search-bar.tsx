"use client"
import Input from '@/components/form/input';
import { SearchIcon } from '@/icons';
import React, { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState("");
  return (
    <div className='space-y-2'>
      <label htmlFor="" className="sr-">&nbsp;</label>
      <Input
        placeholder={'Search for market'}
        className='bg-white !border-teal-700 !py-3'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
        value={search}
        clearables
        suffix={<SearchIcon />} />
    </div>
  );
};

export default SearchBar;
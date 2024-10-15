import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type SearchProps = {
    className?: string;
  };

export function Search({ className = '' }: SearchProps) {
    const [isFocused, setIsFocused] = useState(false);

    const handleIconClick = () => {
        const search = document.getElementById('search') as HTMLInputElement;
        search.focus();
    };

    return (
        <div className={`relative ${className}`}>
            <input
                id='search'
                type="text" 
                className={`border border-gray-300 rounded-full transition-all duration-500 ease-in-out ${isFocused ? 'w-72 pl-12' : 'w-12'} h-10 px-6 outline-none`} 
                placeholder={isFocused ? "Search here..." : ""}
                onFocus={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)}
            />
            <FontAwesomeIcon 
                icon={faMagnifyingGlass} 
                className={`absolute left-[17px] top-1/2 transform -translate-y-1/2 text-[#0F172A] cursor-pointer`} 
                onClick={handleIconClick}
            />
        </div>
    );
}



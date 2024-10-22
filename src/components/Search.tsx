import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type SearchProps = {
    className?: string;
    onSearch: (query: string) => void;  // Función para manejar la búsqueda
  };

export function Search({ onSearch,className = '' }: SearchProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState('');


    const handleIconClick = () => {
        const search = document.getElementById('search') as HTMLInputElement;
        search.focus();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim() !== '') {
            onSearch(query);  // Ejecutar la búsqueda al presionar enter si el query no está vacío
        }
    };

    return (
        <div className={`relative ${className}`}>
            <input
                id='search'
                type="text" 
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
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



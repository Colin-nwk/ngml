import React, { useState } from 'react';
import { dummyData, SearchResult } from './dummyData';
import images from '../../assets/index';

/**
 * SearchInput component for displaying a search input field.
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Additional class name(s) for styling purposes.
 * @param {(query: string) => void} props.onSearch - Function to be called when the user performs a search.
 * @param {string} [props.placeholder] - Placeholder text for the search input field.
 * @returns {JSX.Element} SearchInput component.
 */

interface SearchInputProps {
    className?: string;
    onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ className, onSearch }) => {
    const [query, setQuery] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const filteredResults: SearchResult[] = dummyData.filter(result =>
        result.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className={`relative flex items-center ${className}`}>
            <input
                type="search"
                value={query}
                placeholder='Search here'
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                className='h-8 w-full pl-2 pr-10 italic rounded-full placeholder:absolute placeholder:right-8 placeholder:text-xs border-[1px] border-[#CCD0DC] focus:outline-none focus:border-lime-300 relative active:border-green-500 focus-within:border-green-500 transition-all duration-300 ease-in outline-none'
            />
            {isFocused ? '' 
            : 
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={handleSearch}>
                <img src={images.SearchIcon} alt="Search Logo" className='w-4' />
            </div>}
            {isFocused && query && (
                <div className="absolute top-full left-0 w-full bg-white shadow p-2 rounded-b-[20px]">
                    {filteredResults.length > 0 ? (
                        filteredResults.map(result => (
                            <p key={result.id}>{result.name}</p>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchInput;
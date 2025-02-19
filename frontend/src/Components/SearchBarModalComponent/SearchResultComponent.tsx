import React, { useState } from 'react';
import { CSSProperties } from 'react';
import SearchResultsModal from './SearchResultsModal';
import images from '../../assets/index';


interface SearchResult {
    userName: string;
    userId?: number;
    indexedDate?: string;
    status?: string;
    dateLabel?: string;
    idLabel?: string;

}

const sampleData: SearchResult[] = [
    {
        userName: 'Ayodele Benjamin',
        userId: 40383208420,
        idLabel: 'Staff ID',
        dateLabel: 'Indexed Date',
        indexedDate: '24/2/2021',
        status: 'Approved'
    },
    {
        userName: 'Appmart Integrated Site Visit',
        userId: 40383208420,
        idLabel: 'idLabel',
        dateLabel: 'Indexed Date',
        indexedDate: '24/2/2021',
        status: 'Dates Selected'
    },
    {
        userName: 'Shell Company Limited',
        userId: 40383208420,
        idLabel: 'Customer ID',
        dateLabel: 'Received Date',
        indexedDate: '24/2/2021',
        status: 'Active'
    },
    {
        userName: 'GET Technologies EOI Request',
        userId: 40383208420,
        idLabel: 'Supplier ID',
        dateLabel: 'Received Date',
        indexedDate: '24th/Nov/2021',
        status: 'New'
    },
    {
        userName: 'Dangote Cement LTD.',
        userId: 40383208420,
        idLabel: 'idLabel',
        dateLabel: 'Indexed Date',
        indexedDate: '24/2/2021',
        status: 'Processing'
    },
  
];

const SearchResultComponent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.length > 0) {
            const filteredResults = sampleData.filter(item =>
                item.userName.toLowerCase().includes(query)
            );
            setSearchResults(filteredResults);
            setIsModalVisible(true);
        } else {
            setSearchResults([]);
            setIsModalVisible(false);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setIsModalVisible(false);
    };

    const searchContainerStyle: CSSProperties = {
        position: 'relative',
        display: 'inline-block',
        margin: '10px 0',
        width: '100%'
    };

    const searchInputStyle: CSSProperties = {
        padding: '10px 16px',
        fontSize: '16px',
        border: '2px solid #00AF50',
        borderRadius: '48px',
        outline: 'none',
        width: '100%'
    };

    const cancelIconStyle: CSSProperties = {
        position: 'absolute',
        top: '50%',
        right: '20px',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        width: '20px',
        height: '20px',
    };

    return (
        <div>
            <div style={searchContainerStyle}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={searchInputStyle}
                />
                {searchQuery && (
                    <img
                        src={images.closeIcon}
                        alt='Close'
                        onClick={handleClearSearch}
                        style={cancelIconStyle}
                    />
                )}
            </div>
            {isModalVisible && (
                <SearchResultsModal
                    searchResults={searchResults}
                    onClose={() => setIsModalVisible(false)}
                />
            )}
        </div>
    );
};

export default SearchResultComponent;

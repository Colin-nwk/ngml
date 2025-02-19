import React from 'react';
import images from '../../assets/index';



/**
 * Defines the structure of a search result object.
 * @typeof {Object} SearchResult
 * @property {string} userName - The name of the user.
 * @property {number} [userId] - The unique identifier of the user.
 * @property {string} [indexedDate] - The date when the user was indexed.
 * @property {string} [status] - The current status of the user.
 * @property {string} [dateLabel] - A label for the date.
 * @property {string} [idLabel] - A label for the ID.
 */

interface SearchResult {
    userName: string;
    userId?: number;
    indexedDate?: string;
    status?: string;
    dateLabel?: string;
    idLabel?: string;
}

/**
 * Props for the SearchResultsModal component.
 * @typeof {Object} SearchResultsModalProps
 * @property {SearchResult[]} searchResults - Array of search results to be displayed.
 * @property {Function} onClose - Function to call when closing the modal.
 */
interface SearchResultsModalProps {
    searchResults: SearchResult[];
    onClose: () => void;
}


/**
 * A modal component that displays search results.
 * 
 * @param {SearchResultsModalProps} props - The props for this component.
 * @returns {React.FC} A functional component that renders a modal with search results.
 */
const SearchResultsModal: React.FC<SearchResultsModalProps> = ({ searchResults, onClose }) => {


    /**
     * Determines the style of the status label based on the status value.
     * 
     * @param {string} [status] - The current status of a search result.
     * @returns {Object} The style object for the status label.
     */
    const getStatusStyle = (status?: string): object => {
        switch (status) {
            case 'Active':
            case 'Approved':
                return { backgroundColor: '#D2F69E', color: '#005828', height: '24px', padding: '4px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px' };
            case 'Processing':
                return { backgroundColor: '#FFD181', color: '#050505', height: '24px', padding: '4px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px' };
            case 'New':
                return { backgroundColor: '#EAEEF2', color: '#050505', height: '24px', padding: '4px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px' };
            case 'Dates Selected':
                return { border: '1px solid #E2E4EB', height: '24px', padding: '4px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px' };
            default:
                return {};
        }
    };

    return (
        <main>
            <div onClick={onClose}></div>
            {searchResults.length > 0 ? (
                <section style={{ height: 'screen', width: '100%', display: 'flex', flexDirection: 'column', padding: '10px' }}>
                    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ marginBottom: '30px', marginTop: '30px', color: '#828DA9', fontSize: '20px', lineHeight: '20px', fontWeight: '700' }}>Showing {searchResults.length} of {searchResults.length}</div>
                        <div style={{ border: '1px solid #CCD0DC', height: '40px', width: '200px', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px' }}>
                            <div style={{ color: '#828DA9', fontSize: '14px', fontWeight: '600', lineHeight: '14px' }}>13 Nov -12 Oct</div>
                            <img src={images.filterIcon} alt='Filter Icon' />
                        </div>
                    </header>
                    {searchResults.map((result, index) => (
                        <article key={index} style={{ border: '1px solid #E2E4EB', width: '100%', height: '78px', marginBottom: '16px', rowGap: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px', borderRadius: '8px' }}>
                            <div style={{ color: '#000000', fontSize: '20px', fontWeight: '700', lineHeight: '20px' }}> {result.userName}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', columnGap: '16px' }}>
                                    <div style={{ display: 'flex', columnGap: '8px', textAlign: 'start' }}>
                                        <div style={{ color: '#828DA9', fontSize: '14px', fontWeight: '400', lineHeight: '14px' }}>  {result.idLabel}</div>
                                        <div style={{ color: '#49526A', fontSize: '14px', fontWeight: '400', lineHeight: '14px' }}>  {result.userId}</div>
                                    </div>
                                    <div style={{ display: 'flex', columnGap: '8px', textAlign: 'start' }}>
                                        <div style={{ color: '#828DA9', fontSize: '14px', fontWeight: '400', lineHeight: '14px' }}>  {result.dateLabel}</div>
                                        <div style={{ color: '#49526A', fontSize: '14px', fontWeight: '400', lineHeight: '14px' }}>  {result.indexedDate}</div>
                                    </div>
                                </div>
                                <div style={getStatusStyle(result.status)}>
                                    <div style={{ fontSize: '12px', fontWeight: '400', lineHeight: '12px', letterSpacing: '0.8%' }}> {result.status}</div>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            ) : (
                <p>No results found.</p>
            )}
        </main>
    );
};

export default SearchResultsModal;

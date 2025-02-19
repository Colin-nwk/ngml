import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchResultsModal from './SearchResultsModal';


describe('SearchResultsModal', () => {
  const mockOnClose = vi.fn();

  it('should display no results message when there are no search results', () => {
    render(<SearchResultsModal searchResults={[]} onClose={mockOnClose} />);
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('should display the correct number of search results', () => {
    const searchResults = [
      { userName: 'John Mary', userId: 1, indexedDate: '2021-01-01', status: 'Active', dateLabel: 'Date', idLabel: 'ID' },
      { userName: 'Jane Rose', userId: 2, indexedDate: '2021-01-02', status: 'Approved', dateLabel: 'Date', idLabel: 'ID' },
    ];
    render(<SearchResultsModal searchResults={searchResults} onClose={mockOnClose} />);
    const resultItems = screen.getAllByRole('article');
    expect(resultItems).toHaveLength(searchResults.length);
  });


  it('should display the correct content for a search result', () => {
    const searchResult = [
      { userName: 'John Doe', userId: 1, indexedDate: '2021-01-01', status: 'Active', dateLabel: 'Date', idLabel: 'ID' },
    ];
    render(<SearchResultsModal searchResults={searchResult} onClose={mockOnClose} />);

    expect(screen.getByText(searchResult[0].userName)).toBeInTheDocument();
    expect(screen.getByText(searchResult[0].userId.toString())).toBeInTheDocument();
    expect(screen.getByText(searchResult[0].indexedDate)).toBeInTheDocument();
    expect(screen.getByText(searchResult[0].status)).toBeInTheDocument();
  });

});

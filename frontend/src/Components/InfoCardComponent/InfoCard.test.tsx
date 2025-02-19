import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import InfoCard from './InfoCardComponent';

describe('InfoCard Component', () => {
  it('renders the title and number correctly', () => {
    const title = 'Test Title';
    const number = '123';

    render(<InfoCard title={title} number={number} />);

    const titleElement = screen.getByText(title);
    const numberElement = screen.getByText(number);

    expect(titleElement).toBeInTheDocument();
    expect(numberElement).toBeInTheDocument();
  });


});

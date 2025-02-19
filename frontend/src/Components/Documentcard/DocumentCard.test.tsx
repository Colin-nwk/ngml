import { render, waitFor } from '@testing-library/react';
import DocumentCard from './DocumentCard';

describe('DocumentCard component', () => {
  const defaultProps = {
    type: 'withoutLink',
    icon: 'icon-url',
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    linkText: 'Test Link',
    linkText2: 'Test Link 2'
  };

  it('renders without crashing', () => {
    const { getByText } = render(<DocumentCard {...defaultProps} type="withLink" />);
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('renders document card without link', () => {
    const { getByText, queryByRole } = render(<DocumentCard {...defaultProps} type="withoutLink" />);
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Subtitle')).toBeInTheDocument();
    expect(queryByRole('block border-gray-400 text-gray-700 font-[600]')).not.toBeInTheDocument();
  });

  it('renders document card with link', async () => {
    const { getByText } = render(<DocumentCard {...defaultProps} type="withLink" />);

    await waitFor(() => {
      expect(getByText('Test Title')).toBeInTheDocument();
      expect(getByText('Test Subtitle')).toBeInTheDocument();
    });
  });

  it('renders document card with report', () => {
    const { getByText } = render(<DocumentCard {...defaultProps} type="withReport" />);
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Subtitle')).toBeInTheDocument();
  });
});
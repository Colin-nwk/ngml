import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SelectedDateTable from './SiteVistTable';

vi.mock('@mui/material/Modal', () => {
  const MockModal = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  return {
    __esModule: true,
    default: MockModal,
  };
});

describe('SelectedDateTable', () => {
  it('renders correctly', () => {
    render(<SelectedDateTable />);
    expect(screen.getByText('COMPANY NAME')).toBeInTheDocument();
  });



});

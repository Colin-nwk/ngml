import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SupplierDashboardTable from './SupplierDashboardTable';

vi.mock('@mui/material/Modal', () => {
  const MockModal = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  return {
    __esModule: true,
    default: MockModal,
  };
});

describe('SelectedDateTable', () => {
  it('renders correctly', () => {
    render(<SupplierDashboardTable />);
    expect(screen.getByText('FIRM')).toBeInTheDocument();
  });



});

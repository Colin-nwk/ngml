import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SupplierPaymentHistory from './SupplierPaymentHistory';

vi.mock('@/Components', () => ({
  SupplierPaymentTable: () => <div>SupplierPaymentTable</div>
}));

describe('SupplierPaymentHistory', () => {
  it('renders the SupplierPaymentTable component', () => {
    render(<SupplierPaymentHistory />);
    const tableElement = screen.getByText('SupplierPaymentTable');
    expect(tableElement).toBeInTheDocument();
  });
});

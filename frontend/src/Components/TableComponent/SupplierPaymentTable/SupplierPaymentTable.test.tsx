import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SupplierPaymentTable from './SupplierPaymentTable';

describe('SupplierPaymentTable', () => {
  it('renders without crashing', () => {
    render(<SupplierPaymentTable />);
    const dataGrid = screen.getByTestId('data-grid');
    expect(dataGrid).toBeInTheDocument();
  });


});

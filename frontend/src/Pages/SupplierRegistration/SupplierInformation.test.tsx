
import { render } from '@testing-library/react';
import SupplierInformation from './SupplierInformation';

describe('SupplierInformation', () => {
 it('renders correctly', () => {
    const { getByText } = render(<SupplierInformation />);
    expect(getByText('Supplier Registered Company Name')).toBeInTheDocument();
 });

});


import { render } from '@testing-library/react';
import SupplierRegistrationUpload from './SupplierRegistrationUpload';

describe('SupplierRegistrationUpload', () => {
 it('renders correctly', () => {
    const { getByText } = render(<SupplierRegistrationUpload />);
    expect(getByText('DOCUMENT UPLOADS')).toBeInTheDocument();
 });

});

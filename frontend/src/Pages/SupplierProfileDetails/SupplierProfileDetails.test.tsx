import { render , screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import SupplierProfileDetails from './SupplierProfileDetails'; 

describe('SupplierProfileDetails', () => {
 test('renders without crashing', async () => {

    render(<SupplierProfileDetails />);
    expect(await screen.findByText('PERSONAL DETAILS')).toBeInTheDocument();
    expect(await screen.findByText('AGREEMENT DETAILS')).toBeInTheDocument();
    expect(await screen.findByText('UPLOADS')).toBeInTheDocument();
 });


});

import { render } from '@testing-library/react';
import SuppliersListTable from './SuppliersListTable'; 

describe('SuppliersListTable', () => {
 it('renders without crashing', () => {
    const { getByTestId } = render(<SuppliersListTable />);
    const dataGrid = getByTestId('data-grid');
    expect(dataGrid).toBeInTheDocument();
 });
});

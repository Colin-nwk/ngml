import { render } from '@testing-library/react';
import CustomerPageDetails from './CustomerPageDetails';

describe('CustomerPageDetails component', () => {
    test('renders without crashing', () => {
        render(<CustomerPageDetails />);
    });

    test('renders Chart component with correct props', () => {
        const { getByText } = render(<CustomerPageDetails />);

        expect(getByText('Customer Consumption Chart')).toBeInTheDocument();
    });

});
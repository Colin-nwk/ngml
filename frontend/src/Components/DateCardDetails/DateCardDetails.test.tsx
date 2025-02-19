import { render } from '@testing-library/react';
import DateCardDetails from './DateCardDetails';

describe('DateCardDetails', () => {
    it('renders correctly with company details', () => {
        const { getByText } = render(
            <DateCardDetails
                type="withCompany"
                day="15"
                to="to"
                month="July"
                year="2024"
                dateRange="15-20"
                company="Company ABC"
                distance="5 km"
                text="Some text"
                contractor="John Doe"
                icon1={<div>Icon1</div>}
                icon2={<div>Icon2</div>}
                width="300px"
                height="400px"
                backgroundColor="bg-gray-100"
            />
        );

        expect(getByText('15')).toBeInTheDocument();
        expect(getByText('July 2024')).toBeInTheDocument();
        expect(getByText('to')).toBeInTheDocument();
        expect(getByText('15-20')).toBeInTheDocument();
        expect(getByText('Company ABC')).toBeInTheDocument();
        expect(getByText('5 km')).toBeInTheDocument();
        expect(getByText('Some text')).toBeInTheDocument();
        expect(getByText('John Doe')).toBeInTheDocument();
        expect(getByText('Icon1')).toBeInTheDocument();
        expect(getByText('Icon2')).toBeInTheDocument();
    });

    it('renders correctly without company details', () => {
        const { getByText } = render(
            <DateCardDetails
                type="withoutCompany"
                day="15"
                month="July"
                year="2024"
                company="Company ABC"
                distance="5 km"
                icon1={<div>Icon1</div>}
                icon2={<div>Icon2</div>}
                width="300px"
                height="400px"
                backgroundColor="bg-gray-100"
            />
        );

        expect(getByText('15')).toBeInTheDocument();
        expect(getByText('July 2024')).toBeInTheDocument();
        expect(getByText('Company ABC')).toBeInTheDocument();
        expect(getByText('5 km')).toBeInTheDocument();
        expect(getByText('Icon1')).toBeInTheDocument();
        expect(getByText('Icon2')).toBeInTheDocument();
    });
});
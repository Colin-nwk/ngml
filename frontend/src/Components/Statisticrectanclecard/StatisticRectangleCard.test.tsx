import {  render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StatisticRectangleCard from './StatisticRectangleCard';

describe('StatisticRectangleCard component', () => {
    it('renders with default props', () => {
        const { getByText } = render(
            <MemoryRouter>
                <StatisticRectangleCard />
            </MemoryRouter>
        );
        expect(getByText('new')).toBeInTheDocument();
    });

    it('renders with custom props', () => {
        const { getByText } = render(
            <MemoryRouter>
                <StatisticRectangleCard
                    title="Custom Title"
                    value="50"
                    backgroundColor="bg-blue-500"
                    valueColor="text-white"
                />
            </MemoryRouter>
        );
        expect(getByText('Custom Title')).toBeInTheDocument();
        expect(getByText('50')).toBeInTheDocument();
    });

});

import { render, screen } from '@testing-library/react';
import StatisticCard from './StatisticCard';

describe('StatisticCard', () => {


    test('renders with custom labelSpan', () => {
        render(
            <StatisticCard
                label="Label"
                value="123"
                labelSpan={<span>Custom Span</span>}
            />
        );

        // Assert label, value, and custom span are rendered
        expect(screen.getByText('Label')).toBeInTheDocument();
        expect(screen.getByText('123')).toBeInTheDocument();
        expect(screen.getByText('Custom Span')).toBeInTheDocument();
    });

    test('renders with primary style', () => {
        render(
            <StatisticCard
                label="Label"
                value="123"
                primary={true}
            />
        );

        // Assert primary style is applied
        expect(screen.getByText('Label').parentElement).toHaveClass('bg-[#226844]');
        expect(screen.getByText('123').parentElement).toHaveClass('bg-[#00af50]');
    });

    test('renders with secondary style', () => {
        render(
            <StatisticCard
                label="Label"
                value="123"
                primary={false}
            />
        );

        // Assert secondary style is applied
        expect(screen.getByText('Label').parentElement).toHaveClass('bg-[#EAEEF2]');
        expect(screen.getByText('123').parentElement).toHaveClass('bg-[#FFFFFF]');
    });
});
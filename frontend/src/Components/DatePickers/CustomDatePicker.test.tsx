// CustomDatePicker.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateObject } from 'react-multi-date-picker';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CustomDatePicker from './CustomDatePicker';

describe('CustomDatePicker', () => {
    const createMockDate = (dateString: string) => {
        return new DateObject(dateString);
    };
    const mockSingleDate = createMockDate('2024-01-15');

    beforeEach(() => {
        vi.clearAllMocks();
    });


    describe('Value handling', () => {
        it('displays the selected date in single mode with correct format', () => {
            render(
                <CustomDatePicker
                    onChange={() => { }}
                    value={mockSingleDate}
                    format="MM/DD/YYYY"
                />
            );
            expect(screen.getByDisplayValue('01/15/2024')).toBeInTheDocument();
        });

        it('handles custom date format correctly', () => {
            render(
                <CustomDatePicker
                    onChange={() => { }}
                    value={mockSingleDate}
                    format="YYYY-MM-DD"
                />
            );
            expect(screen.getByDisplayValue('2024-01-15')).toBeInTheDocument();
        });
    });
    describe('Edge cases', () => {
        it('handles null value correctly', () => {
            render(
                <CustomDatePicker
                    onChange={() => { }}
                    value={null}
                />
            );
            expect(screen.getByRole('textbox')).toHaveValue('');
        });
    });

    describe('Accessibility', () => {
        it('maintains focus state correctly', async () => {
            const user = userEvent.setup();
            render(<CustomDatePicker onChange={() => { }} />);

            const input = screen.getByRole('textbox');
            await user.tab();

            expect(input).toHaveFocus();
        });
    });
});

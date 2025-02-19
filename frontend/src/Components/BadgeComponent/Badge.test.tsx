import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Badge from './Badge';

describe('Badge Component', () => {
  it('renders correctly with given props', () => {
    render(
      <Badge
        type="primary"
        label="Test Badge"
        width="100px"
        height="50px"
        fontSize="16px"
        radius="5px"
        fontWeight="bold"
      />
    );

    const badgeElement = screen.getByText('Test Badge');
    expect(badgeElement).toBeInTheDocument();

    expect(badgeElement).toHaveStyle({
      width: '100px',
      height: '50px',
      fontSize: '16px',
      borderRadius: '5px',
      fontWeight: 'bold',
    });
  });

});

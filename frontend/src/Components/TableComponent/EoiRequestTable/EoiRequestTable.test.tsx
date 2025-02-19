import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import EoiRequestTable from './EoiRequestTable';

describe('EoiRequestTable Component', () => {
  it('renders without crashing', () => {
    render(<EoiRequestTable />);
    expect(screen.getByText('COMPANY NAME')).toBeInTheDocument();
    expect(screen.getByLabelText('Search this list')).toBeInTheDocument();
  });


});

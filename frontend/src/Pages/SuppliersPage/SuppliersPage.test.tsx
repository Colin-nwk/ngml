import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import SuppliersPage from './SuppliersPage';

describe('SuppliersPage', () => {
  it('renders headings, buttons, and statistic cards correctly', () => {
    render(<SuppliersPage />, { wrapper: MemoryRouter });

    expect(screen.getByText('SUPPLIERS')).toBeInTheDocument();
    expect(screen.getByText('Create PDF')).toBeInTheDocument();
    expect(screen.getByText('New Supplier')).toBeInTheDocument();
  });

  it('renders info cards and suppliers list table', () => {
    render(<SuppliersPage />, { wrapper: MemoryRouter });

    expect(screen.getByText('Aggregate Monthly Supply Volume')).toBeInTheDocument();
    expect(screen.getByText('Aggregate Daily Supply Volume')).toBeInTheDocument();

  });

});

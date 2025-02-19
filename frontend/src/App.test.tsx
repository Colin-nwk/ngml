import { render } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

// Mock the RouterConfig
vi.mock('./RouterConfig', () => ({
  default: () => ({
    // Mock minimal router object
    routes: [],
  }),
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  RouterProvider: vi.fn(() => <div data-testid="mock-router-provider" />),
}));

describe('App Component', () => {
  it('renders RouterProvider with RouterConfig', () => {
    const { getByTestId } = render(<App />);

    // Check if RouterProvider is rendered
    expect(getByTestId('mock-router-provider')).toBeDefined();

    // Check if RouterProvider was called with the result of RouterConfig
    expect(RouterProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        router: expect.objectContaining({
          routes: expect.any(Array),
        }),
      }),
      expect.anything()
    );
  });
});
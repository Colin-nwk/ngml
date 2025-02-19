import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import authReducer from '../../Redux/Features/Auth/authSlice';
import NavigationBar from './NavigationBar';

const mockToggleNavigationBar = vi.fn();

const mockNavigationLinks = [
  { id: 1, name: 'Home', to: '/home', icon: 'home-icon-path' },
  { id: 2, name: 'Profile', to: '/profile', icon: 'profile-icon-path' },
];

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe('NavigationBar Component', () => {
  it('should display the correct number of navigation items', () => {
    render(
      <Provider store={store}>
        <Router>
          <NavigationBar
            Navigationlinks={mockNavigationLinks}
            isNavigationBarVisible={true}
            toggleNavigationBar={mockToggleNavigationBar}
          />
        </Router>
      </Provider>
    );

    const navigationItems = screen.getAllByRole('link');
    expect(navigationItems.length).toBe(mockNavigationLinks.length);
  });
});
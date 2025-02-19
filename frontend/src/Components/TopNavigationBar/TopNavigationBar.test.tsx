
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import TopNavigationBar from './TopNavigationBar';

import rootReducer from '../../Redux/rootReducer'; 

describe('TopNavigationBar', () => {
  it('renders the company logo', () => {
    const store = configureStore({
      reducer: rootReducer,

    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <TopNavigationBar />
        </BrowserRouter>
      </Provider>
    );

    const logoImage = screen.getByAltText('nnpc logo');
    expect(logoImage).toBeInTheDocument();
  });
});

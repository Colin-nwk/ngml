import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CustomerListTable from './CustomerListTable';
import { customersApi } from '@/Redux/Features/Customer/customerService';

const store = configureStore({
  reducer: {
    [customersApi.reducerPath]: customersApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customersApi.middleware), 
});

describe('DailyVolumnTable', () => {
  it('renders the data grid', () => {
    render(
      <Provider store={store}>
        <CustomerListTable />
      </Provider>
    );
   
  });
});

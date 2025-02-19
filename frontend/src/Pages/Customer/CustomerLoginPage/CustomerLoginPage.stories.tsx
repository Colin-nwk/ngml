import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import CustomerLoginPage from './CustomerLoginPage';

const mockReducer = (state = {}) => state;

const store = configureStore({
  reducer: {
    app: mockReducer,
  },
});

const meta: Meta = {
    title: 'Pages/CustomerLoginPage',
    component: CustomerLoginPage,
    parameters: {
    }, 
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    decorators: [
        (Story) => <Provider store={store}><Router><Story /></Router></Provider>, 
    ],
};

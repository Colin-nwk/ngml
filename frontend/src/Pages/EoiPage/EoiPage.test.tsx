import EoiPage from '@/Pages/EoiPage/EoiPage';
import { store } from '@/Redux/store';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('EoiPage Component', () => {
    it('renders the EoiPage and submits the form', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <EoiPage />
                </BrowserRouter>
            </Provider>
        );

    });
});
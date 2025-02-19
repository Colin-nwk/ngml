
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe   , it } from 'vitest';
import { store } from '../../Redux/store';
import DdqPage from './DdqPage';

describe('ConnectProject', () => {
    it('renders the page and key components without crashing', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DdqPage />
                </MemoryRouter>
            </Provider>
        );

    });
});

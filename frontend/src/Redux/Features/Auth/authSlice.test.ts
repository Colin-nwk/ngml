import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../rootReducer';
import { RootState } from '../../store';
import authReducer, { logout, selectCurrentUser, setCredentials } from './authSlice';

const initialState = {
  access_token: null,
  user: null,
};

describe('authSlice tests', () => {
  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      access_token: null,
      user: null,
    });
  });

  it('should handle setCredentials', () => {
    const actual = authReducer(
      initialState,
      setCredentials({
        access_token: 'dummy-token',
        user: { id: 1, email: 'user@example.com', name: 'John Doe' },
      })
    );
    expect(actual.access_token).toEqual('dummy-token');
    expect(actual.user).toEqual({
      id: 1,
      email: 'user@example.com',
      name: 'John Doe',
    });
  });

  it('should handle logout', () => {
    const actual = authReducer(
      {
        access_token: 'dummy-token',
        user: { id: 1, email: 'user@example.com', name: 'John Doe' },
      },
      logout()
    );
    expect(actual.access_token).toBeNull();
    expect(actual.user).toBeNull();
  });
  const store = configureStore({
    reducer: rootReducer,
  });


  it('should select the current user', () => {
    const actual = selectCurrentUser(store.getState() as RootState);
    expect(actual).toBeNull();

    store.dispatch(
      setCredentials({
        access_token: 'dummy-token',
        user: { id: 1, email: 'user@example.com', name: 'John Doe' },
      })
    );
    expect(selectCurrentUser(store.getState() as RootState)).toEqual({
      id: 1,
      email: 'user@example.com',
      name: 'John Doe',
    });
  });

});
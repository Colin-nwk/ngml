import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from './api';
import rootReducer from './rootReducer';

// Configure persist settings
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [api.reducerPath], // Exclude the API slice from persistence
};

// Apply persistence only to non-API slices
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Set up the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(api.middleware),
});

// Persist store setup
export const persistor = persistStore(store);

// Set up listeners
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



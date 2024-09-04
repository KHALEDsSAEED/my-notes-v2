import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine all reducers 
const rootReducer = combineReducers({
    user: userReducer,
});

// Persist Config used to persist the state in local storage
const persistConfig = {
    key: 'root', 
    storage,
    version: 1,
};

// Persisted Reducer used to persist the state in local storage 
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

// Create the persistor to persist the state in local storage 
export const persistor = persistStore(store);
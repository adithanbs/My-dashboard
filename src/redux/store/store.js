import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import reducers from '../reducers';


const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: hardSet
};

const rootReducer = combineReducers(reducers);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production'
});

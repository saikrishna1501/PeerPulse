import { configureStore } from "@reduxjs/toolkit";
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from './middleware/logger';
import func from './middleware/func';
import api from "./middleware/api";

const persistConfig = {
    key: 'PeerPulse', //unique key that identifies your application's storage entry.
    storage, //use local storage for persisting state
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

//create a store with persisted reducer
const store = configureStore({
        reducer: persistedReducer,
        middleware : [
            logger('console'),
            func,
            // auth,
            // checkDataInStore,
            api
        ]
    });

//create persistant store
const persistor = persistStore(store);

export { store, persistor };
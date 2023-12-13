import { combineReducers } from 'redux';
import entitiesReducer from './entities';
import userReducer from './auth';
import languageReducer from './language';

// root-reducer
const rootReducer = combineReducers({
    entities: entitiesReducer,
    auth: userReducer,
    language: languageReducer
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
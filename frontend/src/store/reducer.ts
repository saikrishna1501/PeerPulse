import { combineReducers } from 'redux';
import entitiesReducer from './entities';
import userReducer from './auth';

// root-reducer
const rootReducer = combineReducers({
    entities: entitiesReducer,
    auth: userReducer
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
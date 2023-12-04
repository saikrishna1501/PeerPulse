import { combineReducers } from 'redux';
import entitiesReducer from './entities';
import userReducer from './auth';

// root-reducer
export default combineReducers({
    entities: entitiesReducer,
    auth: userReducer
})
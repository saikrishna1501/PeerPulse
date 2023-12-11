import { combineReducers } from 'redux';
import blogsReducer from './blogs';
import userReducer from './users';
import eventReducer from './events'
import housingReducer from './housing'

export default combineReducers({
    blogs: blogsReducer,
    users: userReducer,
    events: eventReducer,
    housing: housingReducer
})
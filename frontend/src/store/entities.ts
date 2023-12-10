import { combineReducers } from 'redux';
import blogsReducer from './blogs';
import userReducer from './users';

export default combineReducers({
    blogs: blogsReducer,
    users: userReducer
})
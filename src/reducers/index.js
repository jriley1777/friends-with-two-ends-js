import { combineReducers } from 'redux';
import app from './application';
import auth from './auth';

export default combineReducers({
    app,
    auth
})
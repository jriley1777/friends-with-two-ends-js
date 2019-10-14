import { combineReducers } from 'redux';
import application from './application';
import auth from './auth';

export default combineReducers({
    application,
    auth
})
import { combineReducers } from 'redux';
import * as Actions from '../actions/index';

const currentPage = (state=1, action) => {
    switch( action.type ) {
        case Actions.PAGE_ACTIONS.CHANGE_CURRENT_PAGE:
            return action.data.pageIndex;
        default:
            return state;    
    }
};

export default combineReducers({
    currentPage
})
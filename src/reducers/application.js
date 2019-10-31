import { combineReducers } from 'redux';
import * as Actions from '../actions/index';

const currentPage = (state=1, action) => {
    switch( action.type ) {
        case Actions.PAGE_ACTIONS.CHANGE_CURRENT_PAGE:
            return action.payload.pageIndex;  
        default:
            return state;    
    }
};

const numPlayers = (state=1, action) => {
    switch( action.type ){
        case Actions.PLAYER_SETUP.NUM_PLAYERS:
            return action.payload.numPlayers;
        default:
            return state;    
    }
}

const players = (state=[], action) => {
    switch(action.type){
        case Actions.PLAYER_SETUP.SET_PLAYER_NAME:
            let { playerId, name } = action.payload;
            let filteredPlayers = state.filter(x => x.playerId !== playerId)
            return [
                ...filteredPlayers,
                {
                    playerId,
                    name
                }
            ]
        default:
            return state;
    }
}

export default combineReducers({
    currentPage,
    numPlayers,
    players
})
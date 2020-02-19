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
        case Actions.PLAYER_SETUP.CHANGE_PLAYER_ATTRIBUTE:
            let { playerId, attr } = action.payload;
            let playerToChange = state.find(x => x.playerId === playerId);
            let filteredPlayers = state.filter(x => x.playerId !== playerId);
            return [
                ...filteredPlayers,
                {
                    playerId,
                    attr: {
                        ...playerToChange.attr,
                        ...attr
                    }
                }
            ]
        default:
            return state;
    }
}

const userImage = (state=null, action) => {
    switch(action.type){
        case Actions.PLAYER_SETUP.SET_USER_IMAGE:
            return action.payload.imageURL
        default: 
            return state;
    }
}

export default combineReducers({
    currentPage,
    numPlayers,
    players,
    userImage
})
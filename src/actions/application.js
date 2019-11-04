import { PAGE_ACTIONS, LOGIN_ACTIONS, PLAYER_SETUP } from './index';

export const changeCurrentPage = (pageIndex) => {
    return {
        type: PAGE_ACTIONS.CHANGE_CURRENT_PAGE,
        payload: {
            pageIndex
        }
    }
}

export const login = ({ user, token, username }) => {
    return {
        type: LOGIN_ACTIONS.LOGIN,
        payload: {
            user,
            token,
            username
        }
    }
}

export const setNumPlayers = (numPlayers) => {
    return {
        type: PLAYER_SETUP.NUM_PLAYERS,
        payload: {
            numPlayers
        }
    }
}

export const changePlayerAttribute = ({playerId, attr}) => {
    return {
        type: PLAYER_SETUP.CHANGE_PLAYER_ATTRIBUTE,
        payload: {
            playerId,
            attr
        }
    }
}
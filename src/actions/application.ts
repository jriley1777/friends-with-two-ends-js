import { PAGE_ACTIONS, LOGIN_ACTIONS, PLAYER_SETUP } from './index';

export const changeCurrentPage = (pageIndex: number) => {
    return {
        type: PAGE_ACTIONS.CHANGE_CURRENT_PAGE,
        payload: {
            pageIndex
        }
    }
}

type LoginType = {
    user: any,
    token: string,
    username: string
}

export const login = ({ user, token, username }: LoginType) => {
    return {
        type: LOGIN_ACTIONS.LOGIN,
        payload: {
            user,
            token,
            username
        }
    }
}

export const setNumPlayers = (numPlayers: number) => {
    return {
        type: PLAYER_SETUP.NUM_PLAYERS,
        payload: {
            numPlayers
        }
    }
}

type PlayerAttr = {
    playerId: number,
    attr: any
}
export const changePlayerAttribute = ({ playerId, attr }: PlayerAttr) => {
    return {
        type: PLAYER_SETUP.CHANGE_PLAYER_ATTRIBUTE,
        payload: {
            playerId,
            attr
        }
    };
};
export const setUserImage = (imageURL: string) => {
    return {
        type: PLAYER_SETUP.SET_USER_IMAGE,
        payload: {
            imageURL
        }
    };
};

export const changeCurrentAudioSrc = (currentAudioSrc: any) => {
    return {
        type: PAGE_ACTIONS.CHANGE_AUDIO_SRC,
        payload: {
            currentAudioSrc
        }
    }
}
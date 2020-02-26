import * as Types from '../types/index';

export const getIsLoggedIn = (state: Types.AppState) => state.auth.isLoggedIn;
export const getUsername = (state: Types.AppState) => state.auth.username;

export const getSessionId = (state: Types.AppState) => state.app.sessionId;
export const getUserImage = (state: Types.AppState) => state.app.userImage;
export const getPlayers = (state: Types.AppState) => state.app.players;
export const getPlayerAttributes = (state: Types.AppState) => (playerId: number) => {
    let player = state.app.players.find(x => x.playerId === playerId);
    return player ? player.attr : null;
};
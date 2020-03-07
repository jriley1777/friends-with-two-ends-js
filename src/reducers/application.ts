import { combineReducers } from 'redux';
import uuidv4 from 'uuid/v4';

import * as Actions from '../actions/index';
import * as Types from '../types/index';

const numPlayers = (
  state: Types.NumPlayers = 2,
  action: Types.Action
): Types.NumPlayers => {
  switch (action.type) {
    case Actions.PLAYER_SETUP.NUM_PLAYERS:
      return action.payload.numPlayers;
    default:
      return state;
  }
};

const players = (
  state: Types.Player[] = [
    {
      playerId: 1,
      attr: {
        name: "P1",
        big: 60,
        tall: 60
      }
    },
    {
      playerId: 2,
      attr: {
        name: "P2",
        big: 60,
        tall: 60
      }
    }
  ],
  action: Types.Action
): Types.Player[] => {
  switch (action.type) {
    case Actions.PLAYER_SETUP.CHANGE_PLAYER_ATTRIBUTE:
      let { playerId, attr } = action.payload;
      let playerToChange = state.find(x => x.playerId === playerId);
      let filteredPlayers = state.filter(x => x.playerId !== playerId);
      if (!playerToChange) {
        return state;
      }
      return [
        ...filteredPlayers,
        {
          playerId,
          attr: {
            ...playerToChange.attr,
            ...attr
          }
        }
      ];
    default:
      return state;
  }
};

const userImage = (state: Types.UserImage='', action: Types.Action): Types.UserImage => {
  switch (action.type) {
    case Actions.PLAYER_SETUP.SET_USER_IMAGE:
      return action.payload.imageURL;
    default:
      return state;
  }
};

const sessionId = (state: Types.SessionId = uuidv4(), action: Types.Action): Types.SessionId => {
  switch (action.type) {
    default:
      return state;
  }
};

const currentAudioSrc = (state: any = '', action: Types.Action): any => {
  switch(action.type) {
    case Actions.PAGE_ACTIONS.CHANGE_AUDIO_SRC:
      return action.payload.currentAudioSrc;
    default:
      return state;
  }
}
const isAudioPlaying = (state: boolean=false, action: Types.Action): any => {
  switch(action.type) {
    case Actions.PAGE_ACTIONS.SET_IS_AUDIO_PLAYING:
      return action.payload.isAudioPlaying;
    default:
      return state;
  }
}

export default combineReducers({
  numPlayers,
  players,
  userImage,
  sessionId,
  currentAudioSrc,
  isAudioPlaying
});
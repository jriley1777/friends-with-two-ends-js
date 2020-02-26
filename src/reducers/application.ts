import { combineReducers } from 'redux';
import * as Actions from '../actions/index';
import uuidv4 from 'uuid/v4';

type NumPlayers = number;
type Player = {
    playerId: number,
    attr: any
}
type Players = Player[];
type UserImage = string;
type SessionId = string;

type ActionType = {
    type: string, 
    payload: any
};


const numPlayers = (state: NumPlayers=2, action: ActionType): NumPlayers => {
  switch (action.type) {
    case Actions.PLAYER_SETUP.NUM_PLAYERS:
      return action.payload.numPlayers;
    default:
      return state;
  }
};

const players = (
  state: Players = [
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
  action: ActionType
): Players => {
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

const userImage = (state: UserImage='', action: ActionType): UserImage => {
  switch (action.type) {
    case Actions.PLAYER_SETUP.SET_USER_IMAGE:
      return action.payload.imageURL;
    default:
      return state;
  }
};

const sessionId = (state: SessionId = uuidv4(), action: ActionType): SessionId => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
    numPlayers,
    players,
    userImage,
    sessionId
});
export interface AppState {
  app: Application,
  auth: Auth
}

export interface Auth {
  isLoggedIn: boolean;
  user: any;
  username: string;
  token: string;
};

export interface Action {
    type: string,
    payload: any
};

export type NumPlayers = number;
export interface PlayerAttr {
  name: string,
  big: number,
  tall: number
}
export interface Player {
  playerId: number;
  attr: PlayerAttr;
}
export type UserImage = string;
export type SessionId = string;

export interface Application {
  sessionId: SessionId,
  players: Player[],
  userImage: UserImage
}
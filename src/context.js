import React from 'react';
import uuidv4 from 'uuid/v4';

const Context = React.createContext({
  auth: {
    isLoggedIn: false,
    username: null,
    user: null,
    token: null
  },
  app: {
    sessionId: uuidv4(),
    numPlayers: 1,
    players: [
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
    userImage: null
  }
});

export default Context;
import React from 'react';

const Context = React.createContext({
    auth: {
        isLoggedIn: false,
        username: null,
        user: null,
        token: null
    },
    app: {
        numPlayers: 1,
        players: [
            {
                playerId: 1,
                name: 'P1'
            },
            {
                playerId: 2,
                name: 'P2'
            }
        ]
    }
});

export default Context;
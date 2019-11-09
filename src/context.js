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
                attr: {
                    name: 'P1',
                    big: 50,
                    tall: 60
                }
            },
            {
                playerId: 2,
                attr: {
                    name: 'P2',
                    big: 50,
                    tall: 60
                }
            }
        ]
    }
});

export default Context;
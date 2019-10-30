import React from 'react';

const Context = React.createContext({
    auth: {
        isLoggedIn: false,
        username: null,
        user: null,
        token: null
    },
    app: {
        numPlayers: 1
    }
});

export default Context;
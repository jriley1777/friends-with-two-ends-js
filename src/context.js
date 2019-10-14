import React from 'react';

const Context = React.createContext({
    auth: {
        isLoggedIn: false,
        username: null,
        user: null,
        token: null
    }
});

export default Context;
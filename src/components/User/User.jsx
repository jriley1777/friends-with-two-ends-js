import React, { useContext } from 'react';
import Context from '../../context';

const User = props => {
    const { state } = useContext(Context);
    const { username } = state.auth;
    return username ? (
        <div>{username}</div>
    ) : (
        <div>not logged in.</div>
    )
};

export default User;
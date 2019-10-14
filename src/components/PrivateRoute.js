import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from '../context';

const PrivateRoute = ({ component: Component, path }) => {
    const { state } = useContext(Context);
    console.log(state);
    const { auth } = state;
    return !auth.isLoggedIn ? (
            <Redirect to="/login" />
        ) : (
            <Route path={path} render={props => (
                <Component {...props} />
            )} />
        )
};

export default PrivateRoute;
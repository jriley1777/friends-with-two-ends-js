import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from '../context';
import { ROUTES } from '../constants/index';

const PrivateRoute = ({ component: Component, path }) => {
    const { state } = useContext(Context);
    const { auth } = state;
    return !auth.isLoggedIn ? (
            <Redirect to={ ROUTES.INDEX } />
        ) : (
            <Route path={path} render={props => (
                <Component {...props} />
            )} />
        )
};

export default PrivateRoute;
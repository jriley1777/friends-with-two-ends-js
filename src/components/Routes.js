import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Login from '../components/Login/Login';
import Game from '../pages/Game';

import { ROUTES } from '../constants/index';

const Routes = () => {
    return (
        <>
            <Route path={ROUTES.LOGIN} component={Login}/>
            <PrivateRoute exact path={ROUTES.INDEX} component={Game}/>
        </>
    )
};

export default Routes;
import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Start from '../pages/Start';
import Game from '../pages/Game';
import Config from '../pages/Config';

import { ROUTES } from '../constants/index';

const Routes = () => {
    return (
        <>
            <Route exact path={ROUTES.INDEX} component={Start}/>
            <Route exact path={ROUTES.CONFIG} component={Config}/>
            <Route exact path={ROUTES.PLAY} component={Game} />
        </>
    )
};

export default Routes;
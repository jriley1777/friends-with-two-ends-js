import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import Start from '../pages/Start';
import Game from '../pages/Game';
import Config from '../pages/Config';

import { ROUTES } from '../constants/index';
import { CSSTransition } from 'react-transition-group';


const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    &.page-enter {
        opacity: 0;
        transform: scale(1.1);
    }
    &.page-enter-active {
        opacity: 1;
        transform: scale(1);
    }
    &.page-exit {
        opacity: 1;
        transform: scale(1);
    }
    &.page-exit-active {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 300ms, transform 300ms;
    }
`;

const Routes = () => {
    const routes = [
        { path: ROUTES.INDEX, name: 'start', Component: Start, exact: true },
        { path: ROUTES.CONFIG, name: 'config', Component: Config, exact: true },
        { path: ROUTES.PLAY, name: 'play', Component: Game, exact: true },
    ];
    return routes.map(({ path, Component }) => {
        return (
            <Route key={path} path={path} exact>
                {({ match }) => (
                    <CSSTransition
                        in={match != null}
                        timeout={300}
                        classNames='page'
                        unmountOnExit
                    >
                        <PageWrapper className='page'>
                            <Component />
                        </PageWrapper>
                    </CSSTransition>
                )}
            </Route>
        )
    })
};

export default Routes;
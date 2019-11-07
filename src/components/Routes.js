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
    height: auto;
    overflow: hidden;
    background: black;
`;

const ComponentWrapper = styled.div.attrs({
    className: 'page'
})`
    position: absolute;
    height: 94vh;
    top: 3vh;
    overflow: hidden;
    border-radius: 15%;
    z-index: -1;

    &.page-enter {
        opacity: 0;
    }
    &.page-enter-active {
        opacity: 1;
    }
    &.page-exit {
        opacity: 1;
    }
    &.page-exit-active {
        opacity: 0;
        transition: opacity 500ms;
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
                    <PageWrapper>
                        <CSSTransition
                        in={match != null}
                        timeout={500}
                        classNames='page'
                        unmountOnExit
                        >
                            <ComponentWrapper>
                                <Component />
                            </ComponentWrapper>
                        </CSSTransition>
                    </PageWrapper>
                )}
            </Route>
        )
    })
};

export default Routes;
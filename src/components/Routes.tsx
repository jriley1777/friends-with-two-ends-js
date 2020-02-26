import React from 'react';
import { Route } from "react-router-dom";
import styled from 'styled-components';

import Start from '../pages/Start';
import Game from '../pages/Game';
import Config from '../pages/Config';
import Introduction from '../pages/Introduction';
import DanceZone from '../pages/DanceZone';
import MissingPage from '../pages/MissingPage';

import { ROUTES } from '../constants/index';
import { CSSTransition } from 'react-transition-group';


const PageWrapper = styled.div.attrs({
    className: 'PageWrapper'
})`
    width: 100vw;
    height: auto;
    overflow: hidden;
`;

const AnimationWrapper = styled.div.attrs({
  className: "AnimationWrapper"
})`
  position: absolute;
  height: 94vh;
  top: 3vh;
  overflow: hidden;
  border-radius: 12%;
  z-index: -1;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: radial-gradient(rgba(255, 255, 255, 0.2) 70%, black 180%);
    // box-shadow: inset 0 0 30px 20px black;
  }

  &.page-enter {
    opacity: 0;
    transform: translate(0, 100%);
  }
  &.page-enter-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: opacity 1000ms;
  }
  &.page-exit {
    opacity: 1;
    transform: translate(0, 0);
  }
  &.page-exit-active {
    opacity: 0;
    transform: translate(0, -100%);
    transition: opacity 1000ms;
  }
`;


const Routes = () => {
    const routes = [
      { path: ROUTES.INDEX, name: "start", Component: Start, exact: true },
      { path: ROUTES.CONFIG, name: "config", Component: Config, exact: true },
      { path: ROUTES.PLAY, name: "play", Component: Game, exact: true },
      {
        path: ROUTES.INTRODUCTION,
        name: "introduction",
        Component: Introduction,
        exact: true
      },
      {
        path: ROUTES.DANCE_ZONE,
        name: "danceZone",
        Component: DanceZone,
        exact: true
      },
      {
        path: ROUTES.MISSING_PAGE,
        name: "missingPage",
        Component: MissingPage,
        exact: false
      }
    ];
    const renderRoutes = () => routes.map(({ path, name, exact, Component }) => {
        return (
            <Route key={name} path={path} exact={exact}>
                {({ match }) => (
                    <PageWrapper>
                        <CSSTransition
                        in={match != null}
                        timeout={1000}
                        classNames='page'
                        unmountOnExit
                        >
                            <AnimationWrapper>
                                <Component />
                            </AnimationWrapper>
                        </CSSTransition>
                    </PageWrapper>
                )}
            </Route>
        )
    })
    return (
        <>
        { renderRoutes() }
        </>
    )
};

export default Routes;
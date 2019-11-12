import React, { useContext } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Context from '../context';
import Processing from '../components/Processing/Processing';
import introduction from '../components/Processing/sketches/introduction';
import { ROUTES } from '../constants/index';

const StyledPage = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 94vh;
    &::before {
        content:"";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(255,255,255,0.2);
    }
`

const Game = props => {
    const { state } = useContext(Context);
    const { players } = state.app;

    const handleRouteChange = () => {
        props.history.push(ROUTES.PLAY)
    }
    return (
        <>
            <Processing
                sketch={introduction}
                p5Props={{
                    players,
                    sketchName: 'introduction',
                    changeRoute: handleRouteChange
                }}
            />
            <StyledPage />
        </>
    )
};

export default withRouter(Game);
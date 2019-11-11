import React, { useContext } from 'react';
import styled from 'styled-components';
import Context from '../context';

import Processing from '../components/Processing/Processing';
import game from '../components/Processing/sketches/game';

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
    return (
        <>
            <Processing
                sketch={game}
                p5Props={{ 
                    players,
                    sketchName: 'game',
                    gameOver: false,
                    shouldReset: false,
                    fetchMusic: state.app.fetchMusic
                }}
                />
            <StyledPage />    
        </>
    )
};

export default Game;
import React, { useContext } from 'react';
import styled from 'styled-components';
import Context from '../context';

import Processing from '../components/Processing/Processing';
import game from '../components/Processing/sketches/game';


const StyledHeader = styled.div`
    display: flex;
    position: absolute;
    bottom: 1.5rem;
    height: 60px;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-family: Caveat Brush;
    -webkit-text-stroke: 0.5px white;
    > * {
        width: 33%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const Game = props => {
    const { state } = useContext(Context);
    const { players } = state.app;
    return (
        <>
            <Processing
                sketch={game}
                p5Props={{ 
                    players,
                    sketchName: 'game'
                }}
                />
            <StyledHeader>
                <div>P1: WASD keys</div>
                <div>Keep the ball on your side</div>
                <div>P2: Arrow Keys</div>
            </StyledHeader>
        </>
    )
};

export default Game;
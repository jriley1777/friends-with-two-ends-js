import React, { useContext } from 'react';
import styled from 'styled-components';

import Processing from '../components/Processing/Processing';
import config from '../components/Processing/sketches/config';
import Title from '../components/Title/Title';
import PlayerSelect from '../components/PlayerSelect/PlayerSelect';
import Instructions from '../components/Instructions/Instructions';

import Context from '../context';

const StyledPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    width: 100%;
    height: 94vh;
    overflow: hidden;
    z-index: 2;
    > * {
        z-index: 2;
    }

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
`;

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

const Config = () => {
    const { state } = useContext(Context);
    const { players } = state.app; 
    return (
        <>
            <Processing 
                sketch={ config }
                p5Props={{
                    players,
                    sketchName: 'config'
                }}
                />
            <StyledPage>
                <Title />
                <Instructions />
                <PlayerSelect />
                <StyledHeader>
                    <div>P1: WASD keys</div>
                    <div>Keep the ball on your side</div>
                    <div>P2: Arrow Keys</div>
                </StyledHeader>
            </StyledPage>
        </>
    )
}

export default Config;
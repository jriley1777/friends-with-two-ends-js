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
    height: 100vh;
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
            </StyledPage>
        </>
    )
}

export default Config;
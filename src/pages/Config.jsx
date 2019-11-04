import React, { useContext } from 'react';
import styled from 'styled-components';

import Processing from '../components/Processing/Processing';
import config from '../components/Processing/sketches/config';
import Title from '../components/Title/Title';
import PlayerSelect from '../components/PlayerSelect/PlayerSelect';
import Instructions from '../components/Instructions/Instructions';

import Context from '../context';

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

const StyledPage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: auto;
    overflow: hidden;
    z-index: 3;
    > * {
        z-index: 1;
    }

    &::before {
        content:"";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(255,255,255,0.8);
    }
`;

const Config = () => {
    const { state } = useContext(Context);
    const { players } = state.app; 
    return (
        <PageWrapper>
            <Processing 
                sketch={ config }
                p5Props={{
                    players
                }}
                />
            <StyledPage>
                <Title />
                <Instructions />
                <PlayerSelect />
            </StyledPage>
        </PageWrapper>
    )
}

export default Config;
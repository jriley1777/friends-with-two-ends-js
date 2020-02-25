import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Processing from '../components/Processing/Processing';
import config from '../components/Processing/sketches/config';
import PlayerSelect from '../components/PlayerSelect/PlayerSelect';
import Instructions from '../components/Instructions/Instructions';
import * as Selectors from '../selectors/index';

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

const Config = (props: any) => {
    const { players } = props; 
    return (
        <>
            <Processing 
                sketch={ config }
                p5Props={{
                    players,
                    sketchName: 'config',
                }}
                />
            <StyledPage>
                <Instructions />
                <PlayerSelect />
            </StyledPage>
        </>
    )
}

const mapStateToProps = (state: any) => ({
    players: Selectors.getPlayers(state)
})

export default connect(mapStateToProps, null)(Config);
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Processing from '../components/Processing/Processing';
import game from '../components/Processing/sketches/game';
import * as Selectors from '../selectors/index';

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

const Game = (props: any) => {
    const { players } = props;
    return (
        <>
            <Processing
                sketch={game}
                p5Props={{ 
                    players,
                    sketchName: 'game',
                    gameOver: false,
                    shouldReset: false
                }}
                />
            <StyledPage />    
        </>
    )
};

const mapStateToProps = (state: any) => ({
    players: Selectors.getPlayers(state)
})

export default connect(mapStateToProps, null)(Game);
import React from 'react';
import { connect } from 'react-redux';

import Processing from '../components/Processing/Processing';
import config from '../components/Processing/sketches/config';
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import PlayerSelect from '../components/PlayerSelect/PlayerSelect';
import Instructions from '../components/Instructions/Instructions';
import * as Selectors from '../selectors/index';

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
            <ContentWrapper>
                <Instructions />
                <PlayerSelect />
            </ContentWrapper>
        </>
    )
}

const mapStateToProps = (state: any) => ({
    players: Selectors.getPlayers(state)
})

export default connect(mapStateToProps, null)(Config);
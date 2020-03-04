import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Processing from '../components/Processing/Processing';
import config from '../components/Processing/sketches/config';
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import PlayerSelect from '../components/PlayerSelect/PlayerSelect';
import Instructions from '../components/Instructions/Instructions';

import * as Types from '../types/index';
import * as Selectors from '../selectors/index';
import * as Constants from '../constants/index';
import * as AppActions from '../actions/application';

const Config = (props: any) => {
    const { players, changeCurrentAudioSrc } = props; 
    useEffect(() => {
      changeCurrentAudioSrc(Constants.music.config);
    }, [changeCurrentAudioSrc]);

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

const mapStateToProps = (state: Types.AppState) => ({
    players: Selectors.getPlayers(state)
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        changeCurrentAudioSrc: AppActions.changeCurrentAudioSrc
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
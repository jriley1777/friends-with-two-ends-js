import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import ContentWrapper from '../components/ContentWrapper/ContentWrapper';
import Processing from '../components/Processing/Processing';
import StartButtonLink from '../components/StartButtonLink/StartButtonLink';
import game from '../components/Processing/sketches/game';

import { ROUTES } from '../constants/index';
import * as Selectors from '../selectors/index';
import * as AppActions from '../actions/application';
import * as Constants from '../constants/index';
import * as Types from '../types/index';

const RowWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: auto;
  flex-direction: row;
  justify-content: center;
  top: 25%;

  > * {
    max-width: 30vw;
    margin: auto 10px;
  }
`;

const Game = (props: any) => {
    const { players, changeCurrentAudioSrc } = props;
    // useEffect(() => {
    //   changeCurrentAudioSrc(Constants.music.game);
    // }, [changeCurrentAudioSrc]);
    const [gameOver, setGameOver] = useState(false);
    const [shouldReset, setShouldReset] = useState(false);
    const requestReset = (e: any) => {
      e.preventDefault();
      setShouldReset(true);
    }
    const renderGameOverOptions = () => {
      if(gameOver){
        return (
          <RowWrapper>
            <StartButtonLink to={ROUTES.CONFIG} onClick={requestReset}>
              Play Again
            </StartButtonLink>
            <StartButtonLink to={ROUTES.CONFIG}>
              Return to Config
            </StartButtonLink>
          </RowWrapper>
        );
      }
    }
    return (
      <>
        <Processing
          sketch={game}
          p5Props={{
            players,
            sketchName: "game",
            gameOver,
            setGameOver,
            shouldReset,
            setShouldReset
          }}
        />
        <ContentWrapper>{renderGameOverOptions()}</ContentWrapper>
      </>
    );
};

const mapStateToProps = (state: Types.AppState) => ({
    players: Selectors.getPlayers(state),
    isAudioPlaying: Selectors.getIsAudioPlaying(state),
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    changeCurrentAudioSrc: AppActions.changeCurrentAudioSrc
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
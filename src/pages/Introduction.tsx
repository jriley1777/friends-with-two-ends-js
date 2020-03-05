import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Processing from '../components/Processing/Processing';
import introduction from '../components/Processing/sketches/introduction';
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import { ROUTES } from '../constants/index';
import * as Selectors from '../selectors/index';
import * as AppActions from '../actions/application';
import * as Constants from '../constants/index';

const Introduction = (props: any) => {
  const { history, players, changeCurrentAudioSrc } = props;

  useEffect(() => {
    changeCurrentAudioSrc(Constants.music.intro);
  }, [changeCurrentAudioSrc]);

  const handleRouteChange = () => {
    history.push(ROUTES.PLAY);
  };
  return (
    <>
      <Processing
        sketch={introduction}
        p5Props={{
          players,
          sketchName: "introduction",
          changeRoute: handleRouteChange
        }}
      />
      <ContentWrapper />
    </>
  );
};

const mapStateToProps = (state: any) => ({
    players: Selectors.getPlayers(state)
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    changeCurrentAudioSrc: AppActions.changeCurrentAudioSrc
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Introduction));
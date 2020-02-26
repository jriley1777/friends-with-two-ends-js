import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Processing from '../components/Processing/Processing';
import introduction from '../components/Processing/sketches/introduction';
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import { ROUTES } from '../constants/index';
import * as Selectors from '../selectors/index';

const Game = (props: any) => {
    const { history, players } = props;

    const handleRouteChange = () => {
        history.push(ROUTES.PLAY)
    }
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
})

export default connect(mapStateToProps, null)(withRouter(Game));
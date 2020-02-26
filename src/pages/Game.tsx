import React from 'react';
import { connect } from 'react-redux';

import ContentWrapper from '../components/ContentWrapper/ContentWrapper';
import Processing from '../components/Processing/Processing';
import game from '../components/Processing/sketches/game';
import * as Selectors from '../selectors/index';

const Game = (props: any) => {
    const { players } = props;
    return (
      <>
        <Processing
          sketch={game}
          p5Props={{
            players,
            sketchName: "game",
            gameOver: false,
            shouldReset: false
          }}
        />
        <ContentWrapper />
      </>
    );
};

const mapStateToProps = (state: any) => ({
    players: Selectors.getPlayers(state)
})

export default connect(mapStateToProps, null)(Game);
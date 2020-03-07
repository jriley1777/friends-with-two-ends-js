import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AppActions from '../actions/application';
import * as Constants from '../constants/index';

import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import TitleCard from '../components/TitleCard/TitleCard';
import Subtitle from '../components/Subtitle/Subtitle';
import Title from '../components/Title/Title';
import Processing from '../components/Processing/Processing';
import start from '../components/Processing/sketches/start';
import { ROUTES } from '../constants';
import StartButtonLink from '../components/StartButtonLink/StartButtonLink';


const RowWrapper = styled.div`
    display: flex;
    position: relative;
    width: 100vw;
    height: auto;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    > * {
        max-width: 30vw;
        margin: auto 10px;
    }
`;

const StartPage = (props: any) => {
  const { changeCurrentAudioSrc } = props;
  useEffect(() => {
    changeCurrentAudioSrc(Constants.music.start);
  }, [changeCurrentAudioSrc]);
  return (
    <>
      <Processing
        sketch={start}
        p5Props={{
          sketchName: "start",
        }}
      />
      <ContentWrapper>
        <TitleCard>
          <Title />
          <Subtitle>A competitive possession game amongst friends.</Subtitle>
        </TitleCard>
        <RowWrapper>
          <StartButtonLink to={ROUTES.CONFIG}>Play</StartButtonLink>
        </RowWrapper>
      </ContentWrapper>
    </>
  );
};
const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
      {
        changeCurrentAudioSrc: AppActions.changeCurrentAudioSrc
      },
      dispatch
    );
}

export default connect(
  null,
  mapDispatchToProps
)(StartPage);
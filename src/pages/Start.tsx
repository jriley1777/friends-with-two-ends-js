import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import firebase from "../utils/firebase";
import * as AppActions from '../actions/application';
import * as Selectors from '../selectors/index';

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

const Button = styled.button`
  background: rgba(255, 255, 255, 0.85);
  border-radius: 50%;
  position: absolute;
  top: 3%;
  right: 3%;
  width: 4rem;
  height: 4rem;
  box-shadow: 1px 1px 5px black;
  z-index: 2000;

  &:hover {
    background: lightgreen;
    cursor: pointer;
  }

  > span {
    font-size: 3rem;
  }
`;

const StartPage = (props: any) => {
  const { isLoggedIn, login, history } = props;
    const loginWithGoogle = (e: any) => {
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result: any) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            login({
                token,
                user,
                username: user.displayName
            })
            history.push(ROUTES.CONFIG)
        }).catch(function (error) {
            console.error(error)

        });
    }
    const renderButtons = () => {
        return isLoggedIn ? (
            <StartButtonLink to={ROUTES.CONFIG}>Play</StartButtonLink>
        ) : (
            <>
                <StartButtonLink to={ROUTES.CONFIG} onClick={ loginWithGoogle } > Login with Google</StartButtonLink >
                <StartButtonLink to={ROUTES.CONFIG}>Play as guest</StartButtonLink>
            </>
        )
    }
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
          <RowWrapper>{renderButtons()}</RowWrapper>
        </ContentWrapper>
        <Button onClick={() => props.history.push(ROUTES.DANCE_ZONE)}>
          <span aria-label="dancer" role="img">💃</span>
        </Button>
      </>
    );
};

const mapStateToProps = (state: any) => ({
  isLoggedIn: Selectors.getIsLoggedIn(state)
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
      login: AppActions.login
    }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StartPage));
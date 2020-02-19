import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase/app';
import { withRouter } from 'react-router-dom';

import * as AppActions from '../actions/application';
import Title from '../components/Title/Title';
import Processing from '../components/Processing/Processing';
import danceZone from '../components/Processing/sketches/dance-zone';
import Context from '../context';
import { ROUTES } from '../constants';
import StartButtonLink from '../components/StartButtonLink/StartButtonLink';
import { FaCamera } from 'react-icons/fa';
import CaptureModal from '../components/CaptureModal/CaptureModal';

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

const StyledPage = styled.div`
    display: flex;
    position: absolute;
    height: 100vh;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 6rem;
    font-family: Caveat Brush;
    overflow: hidden;

    > * {
        z-index: 3;
    }

    > canvas > * {
        border-radius: 50%;
    }

    &::before {
        content:"";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 94vh;
        background: rgba(255,255,255,0.25);
    }
`;

const StyledSubtitle = styled.div`
    display: flex;
    height: 2rem;
    font-size: 2rem;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: black;
    margin-top: 5vh;
`;

const TitleCard = styled.div`
    padding: 30px;
    background: rgba(255,255,255,0.85);
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 15vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

  > svg {
    width: 2rem;
    height: auto;
  }
`;

const DanceZone = props => {
    const { state, dispatch } = useContext(Context);
    const [showCapture, setShowCapture] = useState(false);
    const loginWithGoogle = (e) => {
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            dispatch(AppActions.login({
                token,
                user,
                username: user.displayName
            }))
            props.history.push(ROUTES.CONFIG)
        }).catch(function (error) {
            console.error(error)

        });
    }
    const renderButtons = () => {
        return state.auth.isLoggedIn ? (
            <StartButtonLink to={ROUTES.CONFIG}>Play</StartButtonLink>
        ) : (
                <>
                    <StartButtonLink to={ROUTES.CONFIG} onClick={loginWithGoogle} > Login with Google</StartButtonLink >
                    <StartButtonLink to={ROUTES.CONFIG}>Play as guest</StartButtonLink>
                </>
            )
    }
    const handleModalToggle = () => {
        return setShowCapture(!showCapture);
    }
    return (
      <>
        <Processing
          sketch={danceZone}
          p5Props={{
            sketchName: "danceZone",
            fetchMusic: state.app.fetchMusic,
            userImage: state.app.userImage
          }}
        />
        <StyledPage>
          <TitleCard>
            <Title />
            <StyledSubtitle>The Dance Zone.</StyledSubtitle>
          </TitleCard>
          <RowWrapper>{renderButtons()}</RowWrapper>
          <Button onClick={() => setShowCapture(true)}>
            <FaCamera />
          </Button>
          <CaptureModal showModal={showCapture} handleModalToggle={handleModalToggle} />
        </StyledPage>
      </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeCurrentPage: AppActions.changeCurrentPage
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(withRouter(DanceZone));
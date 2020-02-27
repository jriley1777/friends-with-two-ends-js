import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from '../utils/firebase';
import { withRouter } from 'react-router-dom';

import * as AppActions from '../actions/application';
import * as Selectors from '../selectors/index';

import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import TitleCard from '../components/TitleCard/TitleCard';
import Subtitle from '../components/Subtitle/Subtitle';
import Title from '../components/Title/Title';
import Processing from '../components/Processing/Processing';
import danceZone from '../components/Processing/sketches/dance-zone';
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

interface DZProps {
  login: any,
  isLoggedIn: boolean,
  userImage: string,
  sessionId: string,
  setUserImage: any,
}

const DanceZone = (props: any) => {
    const { login, isLoggedIn, userImage, sessionId, setUserImage } = props;
    const [showCapture, setShowCapture] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const storageRef = firebase.storage().ref();

    const uploadImage = async (data: any) => {
      setIsUploading(true);
      let pathToUpload = `/danceZone/${sessionId}.png`;
      let ref = storageRef.child(pathToUpload);
      await ref.put(data, { contentType: "image/png" }).then(snapshot => {
        snapshot.ref
          .getDownloadURL()
          .then(url => {
            setUserImage(url);
            setShowCapture(false);
            setIsUploading(false);
          })
          .catch(err => {
            console.error(err);
            setIsUploading(false);
          });
      });
    }

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
            props.history.push(ROUTES.CONFIG)
        }).catch(function (error: any) {
            console.error(error)

        });
    }
    const renderButtons = () => {
        return isLoggedIn ? (
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
            userImage
          }}
        />
        <ContentWrapper>
          <TitleCard>
            <Title />
            <Subtitle>The Dance Zone.</Subtitle>
          </TitleCard>
          <RowWrapper>{renderButtons()}</RowWrapper>
          <Button onClick={() => setShowCapture(true)}>
            <FaCamera />
          </Button>
          <CaptureModal
            isUploading={isUploading}
            uploadImage={uploadImage}
            showModal={showCapture}
            handleModalToggle={handleModalToggle}
          />
        </ContentWrapper>
      </>
    );
};

const mapStateToProps = (state: any) => ({
  userImage: Selectors.getUserImage(state),
  isLoggedIn: Selectors.getIsLoggedIn(state),
  sessionId: Selectors.getSessionId(state),
})

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
      {
        login: AppActions.login,
        setUserImage: AppActions.setUserImage
      },
      dispatch
    );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DanceZone));
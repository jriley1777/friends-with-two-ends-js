import React, { useContext } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase/app';
import { withRouter } from 'react-router-dom';

import * as AppActions from '../actions/application';
import Title from '../components/Title/Title';
import Processing from '../components/Processing/Processing';
import start from '../components/Processing/sketches/start';
import Context from '../context';
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
    background: rgba(255,255,255,0.5);
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 15vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StartPage = props => {
    const { state, dispatch } = useContext(Context);
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
            console.log(props.history);
            props.history.push(ROUTES.CONFIG)
        }).catch(function (error) {
            // // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // // ...
        });
    }
    return (
        <>
            <Processing
                sketch={start}
                p5Props={{
                    sketchName: 'start',
                    fetchMusic: state.app.fetchMusic
                }} />
            <StyledPage>
                <TitleCard>
                    <Title />
                    <StyledSubtitle>A competitive possession game amongst friends.</StyledSubtitle>
                </TitleCard>
                <RowWrapper>
                    <StartButtonLink to={ROUTES.CONFIG} onClick={loginWithGoogle }>Login with Google</StartButtonLink>
                    <StartButtonLink to={ROUTES.CONFIG}>Play as guest</StartButtonLink>
                </RowWrapper>
            </StyledPage>
        </>
    )
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeCurrentPage: AppActions.changeCurrentPage
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(withRouter(StartPage));
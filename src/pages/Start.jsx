import React, { useContext } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase/app';

import * as AppActions from '../actions/application';
import Processing from '../components/Processing/Processing';
import start from '../components/Processing/sketches/start';
import Context from '../context';



const StyledPage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    font-size: 6rem;
    font-family: Caveat Brush;
    overflow: hidden;
    z-index: 1;

    &::before {
        content:"";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background: rgba(255,255,255,0.8);
    }
`;

const StyledTitleWrapper = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    top: 20vh;
`;

const StyledTitle = styled.div`
    height: 7rem;
    position: relative;
`;

const StyledTitleReflection = styled.div`
    height: 2rem;
    line-height: 2rem;
    color: lightgreen;
    position: relative;
    width: 100%;
    left: 100px;
    transform: rotateX(180deg);
`;

const StyledSubtitle = styled.div`
    display: flex;
    height: 2rem;
    font-size: 2rem;
    width: 100%;
    flex-direction: row;
    position: absolute;
    bottom: 40vh;
    align-items: center;
    justify-content: center;
    color: black;
`;

const StyledStartButton = styled.div`
    width: 55vw;
    height: 5rem;
    font-size: 4rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 20vh;
    border-radius: 10px;
    border: 1px solid black;
    
    &:hover {
        background: lightgreen;
    }
`;

const StickyFooter = styled.div`
    position: absolute;
    bottom: 0;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 1.5rem;
`;

const StartPage = props => {
    const { dispatch } = useContext(Context);
    const loginWithGoogle = () => {
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
        <div className='App'>
            <Processing
                sketch={start} />
            <StyledPage>
                <StyledTitleWrapper>
                    <StyledTitle>Friends
                        <StyledTitleReflection>ends</StyledTitleReflection>
                    </StyledTitle>
                    <StyledTitle>&nbsp;with two ends.</StyledTitle>
                </StyledTitleWrapper>
                <StyledSubtitle>A competitive posession game amongst friends.</StyledSubtitle>
                <StyledStartButton
                    onClick={ loginWithGoogle }>Login with Google</StyledStartButton>
            </StyledPage>
            <StickyFooter>
                made by Joe Riley.
            </StickyFooter>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeCurrentPage: AppActions.changeCurrentPage
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(StartPage);
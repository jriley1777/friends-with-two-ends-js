import React, {
  useState,
  useEffect
} from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import './index.css';
import Routes from './components/Routes';
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import rootReducer from './reducers/index';
import firebase from './utils/firebase';
import * as AppActions from './actions/application';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Title from './components/Title/Title';

const StyledLoadingText = styled.h1`
  font-size: 5rem;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  margin-top: 10rem;
  letter-spacing: 0.15em;

  animation: 3.5s shrink 0s linear;
  @keyframes shrink {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledLoading = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  color: white;
  align-items: center;
  justify-content: center;
  font-family: Caveat Brush;
`;

const Root = (props: any) => {
    const [isFetching, setIsFetching] = useState(true);
    const isDev = process.env.NODE_ENV === 'development';
    const { login } = props;

    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user && user.displayName) {
          login({
              user,
              token: user.refreshToken,
              username: user.displayName
          });
        }
        setTimeout(() => setIsFetching(false), 2000);
      });
    }, [login]);

    return !isFetching || isDev ? (
      <>
        <Header />
        <Routes />
        <Footer />
      </>
    ) : (
      <StyledLoading>
        <Title />
        <StyledLoadingText>loading...</StyledLoadingText>
      </StyledLoading>
    );
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    login: AppActions.login
}, dispatch);

const RootWithAuth = connect(null, mapDispatchToProps)(withRouter(Root));

const RootWrapper = () => {
    const store = createStore(rootReducer);
    return (
      <Provider store={ store }>
        <Router>
            <RootWithAuth />
        </Router>
      </Provider>
    )

}

ReactDOM.render(
    <RootWrapper />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

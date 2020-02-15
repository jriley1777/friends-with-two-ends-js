import React, {useContext, useReducer, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import './index.css';
import Routes from './components/Routes';
import { ROUTES } from './constants/index';
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import Context from './context';
import firebase from './utils/firebase';
import * as AppActions from './actions/application';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Your web app's Firebase configuration
const store = createStore(rootReducer);

const StyledLoadingText = styled.h1`
  font-size: 5rem;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
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
  height: 100vh;
  width: 100%;
  color: white;
  align-items: center;
  justify-content: center;
  font-family: Caveat Brush;
`;

const Root = props => {
    const { history } = props;
    const { dispatch } = useContext(Context);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          dispatch(AppActions.login({
              user,
              token: user.refreshToken,
              username: user.displayName
          }));
        }
        setTimeout(() => setIsFetching(false), 2000);
      });
    }, []);

    return !isFetching ? (
      <>
        <Header />
        <Routes />
        <Footer />
      </>
    ) : (
      <StyledLoading>
        <StyledLoadingText>loading...</StyledLoadingText>
      </StyledLoading>
    );
}

const RootWithAuth = withRouter(Root);

const RootWrapper = () => {
    const initialState = useContext(Context);
    const [state, dispatch] = useReducer(rootReducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            <Provider store={store}>
                <Router>
                    <RootWithAuth />
                </Router>
            </Provider>
        </Context.Provider>
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

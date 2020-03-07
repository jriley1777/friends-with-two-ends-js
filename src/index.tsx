import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import './index.css';
import Routes from './components/Routes';
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import configureStore from './utils/redux';

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

const Root: React.SFC = () => {
    const [isFetching, setIsFetching] = useState(true);
    const isDev = process.env.NODE_ENV === 'development';

    useEffect(() => {
      setIsFetching(true);
      let timeout = setTimeout(() => {
        setIsFetching(false);
      }, 300);
      return clearTimeout(timeout);
    }, [])

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

const RootWithRouter = withRouter(Root);

const RootWrapper: React.SFC = () => {
    const store = configureStore();
    return (
      <Provider store={ store }>
        <Router>
          <RootWithRouter />
        </Router>
      </Provider>
    )

}

ReactDOM.render(
    <RootWrapper />,
    document.getElementById('root') as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

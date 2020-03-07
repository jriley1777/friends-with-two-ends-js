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
import TitleCard from './components/TitleCard/TitleCard';
import Title from './components/Title/Title';
import Subtitle from './components/Subtitle/Subtitle';

import * as Constants from './constants/index';

const StyledImg = styled.img`
  position: absolute;
  top: -10vh;
  left: 0;
  height: 110vh;
  width: 100vw;
  z-index: -1;
  // animation: slideOut 0.5s ease-out 0s 1;
  // @keyframes slideOut {
  //   from {
  //     height: 100vh;
  //   }
  //   to {
  //     transform: translateY(-100%);
  //   }
  // }
`;
const StyledTitleCard = styled(TitleCard)`
  position: absolute !important;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
`;

const StyledLoadingText = styled.h1`
  font-size: 2.5rem;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  position: absolute;
  color: white !important;
  left: 12%;
  top: 90%;
  transform: translate(-50%, -50%);

  animation: 0.5s fade 0s alternate infinite;
  @keyframes fade {
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
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  font-family: Caveat Brush;
`;

const Root: React.SFC = () => {
  const [isFetching, setIsFetching] = useState(true);
  const showLoading = () => {
    const envLoading = process.env.REACT_APP_SHOW_LOADING === 'true' ? true : false;
    const envProd = process.env.NODE_ENV === 'production'; 
    return envLoading || envProd;
  }

  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsFetching(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  const displayLoadingMessage = () => {
    return showLoading && isFetching ? (
      <StyledLoading>
        <StyledImg src={Constants.images.curtain} />
        <StyledTitleCard>
          <Title />
          <Subtitle>A competitive possession game amongst friends.</Subtitle>
        </StyledTitleCard>
        <StyledLoadingText>loading...</StyledLoadingText>
      </StyledLoading>
    ) : <Routes /> ;
  };

  return (
    <>
      <Header />
      { displayLoadingMessage() }
      <Footer />
    </>
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

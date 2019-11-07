import React, {useContext, useReducer} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './components/Routes';
import { BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import Context from './context';
import firebase from 'firebase/app';
import 'firebase/auth';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "friends-with-two-ends.firebaseapp.com",
    databaseURL: "https://friends-with-two-ends.firebaseio.com",
    projectId: "friends-with-two-ends",
    storageBucket: "",
    messagingSenderId: "918334714285",
    appId: "1:918334714285:web:2c64f2d896748cac1af124"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const store = createStore(rootReducer);

const Root = () => {
    const initialState = useContext(Context);
    const [state, dispatch] = useReducer(rootReducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            <Provider store={store}>
                <Router>
                    <Header />
                    <Routes />
                    <Footer />
                </Router>
            </Provider>
        </Context.Provider>
    )
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

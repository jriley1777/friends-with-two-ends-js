import {Store, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import * as Types from '../types/index';

import rootReducer from '../reducers/index';

const configureStore = (initialState?: Types.AppState): Store<Types.AppState> => {
    const store = createStore(
        rootReducer,
        initialState || {},
        composeWithDevTools()
    );

    return store;
}

export default configureStore;
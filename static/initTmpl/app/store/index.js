import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/index';
import {Router, browserHistory} from 'react-router';

const loggerMiddleware = createLogger();
const middlewareRoute = routerMiddleware(browserHistory);


export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
            middlewareRoute
        )
    );
}
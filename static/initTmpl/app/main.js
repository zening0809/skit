import I from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux'
import {Router, browserHistory} from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reducers from './reducers';
import configureStore from './store';

import './styles/global.less';

(() => {
    const routes = require('./route');


    // Add the reducer to your store on the `routing` key
    const store = configureStore();
    

     
    // Create an enhanced history that syncs navigation events with the store
    const history = syncHistoryWithStore(browserHistory, store)

    ReactDOM.render(
        <Provider store={store}>
            <Router
                history={history}
                routes={routes} />
        </Provider>,
        document.getElementById('app'));
})();


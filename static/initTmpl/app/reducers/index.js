/**
 * Root Reducer
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

//import your reducers below
import reducerRequest from '../reducers/reducer_request';
import reducerLogin from '../reducers/reducer_login';
import reducerSelectList from '../reducers/reducer_select_list';
import reducerCustomerList from '../reducers/reducer_customer_list';
import reducerContactList from '../reducers/reducer_contact_list';
import reducerCommList from '../reducers/reducer_comm_list';
import reducerModal from '../reducers/reducer_modal';

const rootReducer = combineReducers({
    routing: routerReducer,
    reducerRequest,
    reducerLogin,
    reducerSelectList,
    reducerCustomerList,
    reducerContactList,
    reducerCommList,
    reducerModal,
});

export default rootReducer;


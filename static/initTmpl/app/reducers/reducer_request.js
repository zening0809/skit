/**
 * Sub Reducers
 */

// import {} from '../actions/index';
import { REQUEST_ACTION } from '../api/common';

const reducerRequest = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_ACTION:
            return Object.assign({}, action.param);
        default:
            return state;
    }
};

export default reducerRequest;
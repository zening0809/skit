/**
 * Sub Reducers
 * modalStatus
 */

import { ACTION_MODAL_STATUS } from '../actions';

const reducerModalStatus = (state = {}, action) => {
    switch (action.type) {
        case ACTION_MODAL_STATUS:
            return Object.assign({}, action.param);
        default:
            return state;
    }
}

export default reducerModalStatus;
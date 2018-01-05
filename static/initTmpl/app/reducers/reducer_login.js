/**
 * Sub Reducers
 */

import { LOGIN_URL } from '../api/config';

const reducerLogin = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_URL:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

export default reducerLogin;
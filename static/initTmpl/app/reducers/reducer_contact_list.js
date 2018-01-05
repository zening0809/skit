/**
 * Sub Reducers
 * select列表数据
 */

import { CONTACT_LIST_URL } from '../api/config';

const reducerContactList = (state = {}, action) => {
    switch (action.type) {
        case CONTACT_LIST_URL:
            return Object.assign({}, action.data);
        default:
            return state;
    }
}

export default reducerContactList;
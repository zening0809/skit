/**
 * Sub Reducers
 * select列表数据
 */

import { SELECT_LIST_URL } from '../api/config';

const reducerSelectList = (state = {}, action) => {
    switch (action.type) {
        case SELECT_LIST_URL:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

export default reducerSelectList;